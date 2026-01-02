import { NextRequest, NextResponse } from "next/server";
import {
  GenerationRequest,
  GenerationResponse,
  checkEscalation,
  classifyMessage,
  WORKFLOW_MAPPINGS,
  STYLE_GUIDELINES,
} from "@fountain/shared";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();
    const { message, context, tone = "neutral" } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Step 1: Check for escalation (hard gate)
    const escalationCheck = checkEscalation(message);
    if (escalationCheck.escalated && escalationCheck.pattern) {
      const response: GenerationResponse = {
        status:
          escalationCheck.pattern.type === "legal"
            ? "escalation"
            : "critical_escalation",
        final_response: escalationCheck.pattern.guidance,
        internal_notes: escalationCheck.pattern.internalInstructions,
        confidence: 1.0,
        escalation_reason: escalationCheck.pattern.reason,
      };
      return NextResponse.json(response);
    }

    // Step 2: Classify message category
    const category = classifyMessage(message, context);

    // Step 3: Generate response using LLM
    const workflow = WORKFLOW_MAPPINGS[category] || WORKFLOW_MAPPINGS.other;

    const systemPrompt = `You are a patient communication assistant for Fountain, a healthcare company. Your role is to generate empathetic, solution-oriented responses to patient messages.

COMMUNICATION STYLE RULES:
DO:
${STYLE_GUIDELINES.do.map((rule) => `- ${rule}`).join("\n")}

DON'T:
${STYLE_GUIDELINES.dont.map((rule) => `- ${rule}`).join("\n")}

AVOID THESE PHRASES:
${STYLE_GUIDELINES.avoidPhrases.join(", ")}

PREFERRED PHRASES:
${STYLE_GUIDELINES.preferredPhrases.join(", ")}

TONE: ${tone === "empathetic" ? "Extra warm and understanding, more personal" : tone === "concise" ? "Direct and solution-focused, brief" : "Professional and empathetic, balanced"}

WORKFLOW CONTEXT:
Category: ${category}
Workflow: ${workflow.workflowName}
Typical Response: ${workflow.typicalResponse}

Generate a patient-facing response that:
1. Acknowledges the patient's concern
2. Provides clear, actionable solutions
3. Uses warm, human language
4. Is ${tone === "concise" ? "brief and direct" : tone === "empathetic" ? "extra warm and personal" : "balanced"}
5. Avoids all phrases in the "AVOID" list
6. Takes ownership and offers specific next steps

Keep the response professional but human, and focus on solving the patient's issue.`;

    const userPrompt = `Patient message:
${message}

${context?.program ? `Program: ${context.program}` : ""}
${context?.state ? `State: ${context.state}` : ""}
${context?.currentStatus ? `Current Status: ${context.currentStatus}` : ""}

Generate a response following the style guidelines above.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedResponse =
      completion.choices[0]?.message?.content?.trim() || "";

    // Generate internal notes
    const internalNotes = [
      `Workflow: ${workflow.workflowName}`,
      ...workflow.nextSteps,
    ];

    if (context?.currentStatus) {
      internalNotes.push(`Context: ${context.currentStatus}`);
    }

    const response: GenerationResponse = {
      status: "ok",
      category,
      final_response: generatedResponse,
      internal_notes: internalNotes,
      confidence: 0.85, // Could be enhanced with model confidence scores
      workflow_citation: workflow.workflowName,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate response",
      },
      { status: 500 }
    );
  }
}

