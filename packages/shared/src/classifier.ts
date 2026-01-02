import { ResponseCategory } from "./types";

/**
 * Classify message into category based on keywords and context
 */
export function classifyMessage(
  message: string,
  context?: { program?: string; topic?: ResponseCategory }
): ResponseCategory {
  const lowerMessage = message.toLowerCase();

  // If context provides topic, use it
  if (context?.topic) {
    return context.topic;
  }

  // Keyword-based classification
  if (
    lowerMessage.includes("bill") ||
    lowerMessage.includes("charge") ||
    lowerMessage.includes("payment") ||
    lowerMessage.includes("refund") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("price")
  ) {
    return "billing";
  }

  if (
    lowerMessage.includes("lab") ||
    lowerMessage.includes("blood work") ||
    lowerMessage.includes("test result") ||
    lowerMessage.includes("screening")
  ) {
    return "labs";
  }

  if (
    lowerMessage.includes("refill") ||
    lowerMessage.includes("prescription") ||
    lowerMessage.includes("medication") ||
    lowerMessage.includes("reorder")
  ) {
    return "refill";
  }

  if (
    lowerMessage.includes("ship") ||
    lowerMessage.includes("delivery") ||
    lowerMessage.includes("tracking") ||
    lowerMessage.includes("package") ||
    lowerMessage.includes("mail")
  ) {
    return "shipping";
  }

  if (
    lowerMessage.includes("cancel") ||
    lowerMessage.includes("discontinue") ||
    lowerMessage.includes("stop") ||
    lowerMessage.includes("terminate")
  ) {
    return "cancellation";
  }

  if (
    lowerMessage.includes("portal") ||
    lowerMessage.includes("login") ||
    lowerMessage.includes("password") ||
    lowerMessage.includes("account access")
  ) {
    return "portal_access";
  }

  if (
    lowerMessage.includes("hipaa") ||
    lowerMessage.includes("medical record") ||
    lowerMessage.includes("document") ||
    lowerMessage.includes("chart")
  ) {
    return "hipaa_docs";
  }

  if (
    lowerMessage.includes("symptom") ||
    lowerMessage.includes("side effect") ||
    lowerMessage.includes("feeling") ||
    lowerMessage.includes("experience")
  ) {
    return "symptoms";
  }

  return "other";
}

