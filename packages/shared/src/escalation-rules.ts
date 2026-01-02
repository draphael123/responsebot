/**
 * Hard gate escalation rules - these trigger "cease communication" guidance
 */

export interface EscalationPattern {
  keywords: string[];
  type: "legal" | "critical_symptoms" | "threats";
  reason: string;
  guidance: string;
  internalInstructions: string[];
}

export const ESCALATION_PATTERNS: EscalationPattern[] = [
  {
    keywords: [
      "lawsuit",
      "sue",
      "suing",
      "legal action",
      "attorney",
      "lawyer",
      "malpractice",
      "negligence",
      "legal counsel",
      "file a lawsuit",
      "taking legal action",
    ],
    type: "legal",
    reason: "Legal action mentioned",
    guidance: "Escalation required: cease communication. Do not draft a response.",
    internalInstructions: [
      "Immediately create a critical escalation ticket",
      "Forward to legal/compliance team",
      "Do not respond to patient message",
      "Document all previous communications",
      "Flag for HIPAA-secure document handling",
    ],
  },
  {
    keywords: [
      "bbb",
      "better business bureau",
      "file a complaint",
      "report to",
      "regulatory complaint",
      "state board",
      "medical board",
    ],
    type: "legal",
    reason: "Regulatory complaint threat",
    guidance: "Escalation required: cease communication. Do not draft a response.",
    internalInstructions: [
      "Create critical escalation ticket",
      "Forward to compliance team",
      "Review all related patient communications",
      "Prepare documentation for potential complaint",
    ],
  },
  {
    keywords: [
      "critical",
      "emergency",
      "severe",
      "can't breathe",
      "chest pain",
      "heart attack",
      "stroke",
      "unconscious",
      "life threatening",
      "immediate danger",
      "911",
      "emergency room",
      "er visit",
    ],
    type: "critical_symptoms",
    reason: "Critical symptoms or emergency situation",
    guidance: "Critical escalation workflow required. Do not provide casual response.",
    internalInstructions: [
      "Immediately escalate to clinical team",
      "Patient may need emergency care - do not delay",
      "Document symptoms and timeline",
      "Follow critical escalation workflow",
      "Ensure patient receives appropriate medical attention",
    ],
  },
  {
    keywords: [
      "threat",
      "harm",
      "hurt",
      "violence",
      "dangerous",
      "unsafe",
      "endanger",
    ],
    type: "threats",
    reason: "Threats or safety concerns mentioned",
    guidance: "Escalation required: safety concern detected.",
    internalInstructions: [
      "Escalate to security/safety team",
      "Document threat details",
      "Follow safety protocols",
      "Do not engage in argumentative response",
    ],
  },
];

/**
 * Check if a message triggers escalation rules
 */
export function checkEscalation(message: string): {
  escalated: boolean;
  pattern?: EscalationPattern;
} {
  const lowerMessage = message.toLowerCase();

  for (const pattern of ESCALATION_PATTERNS) {
    const hasKeyword = pattern.keywords.some((keyword) =>
      lowerMessage.includes(keyword.toLowerCase())
    );

    if (hasKeyword) {
      return {
        escalated: true,
        pattern,
      };
    }
  }

  return { escalated: false };
}

