import { NextRequest, NextResponse } from "next/server";
import {
  checkEscalation,
  classifyMessage,
  ResponseCategory,
} from "@fountain/shared";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check escalation
    const escalationCheck = checkEscalation(message);
    const category: ResponseCategory = classifyMessage(message, context);

    return NextResponse.json({
      escalated: escalationCheck.escalated,
      escalationType: escalationCheck.pattern?.type,
      category,
    });
  } catch (error) {
    console.error("Error classifying message:", error);
    return NextResponse.json(
      { error: "Failed to classify message" },
      { status: 500 }
    );
  }
}

