/**
 * Fountain communication style rules
 * These guide response generation to be empathetic, human, and solution-oriented
 */

export const STYLE_GUIDELINES = {
  do: [
    "Be empathetic and understanding",
    "Acknowledge the patient's concern or frustration",
    "Provide clear, actionable solutions",
    "Use warm, human language",
    "Take ownership when appropriate",
    "Offer specific next steps",
    "Be concise but thorough",
    "Show genuine care for patient wellbeing",
  ],
  dont: [
    "Use corporate jargon or overly formal language",
    "Make excuses or deflect blame",
    "Use phrases that inflame situations",
    "Be dismissive or minimize concerns",
    "Use passive voice excessively",
    "Make promises you can't keep",
    "Be defensive or argumentative",
    "Use medical jargon without explanation",
  ],
  avoidPhrases: [
    "I understand your frustration, but...",
    "That's not our policy",
    "You should have...",
    "Unfortunately, we cannot...",
    "That's not possible",
    "I'm sorry you feel that way",
    "Per our records",
    "As per company policy",
  ],
  preferredPhrases: [
    "I completely understand",
    "Let me help you with that",
    "I'm here to make this right",
    "I appreciate you bringing this to our attention",
    "Here's what we can do",
    "I want to ensure you get the care you need",
    "Let's resolve this together",
  ],
};

export const TONE_VARIANTS = {
  neutral: {
    description: "Professional and empathetic, balanced tone",
    length: "standard",
  },
  empathetic: {
    description: "Extra warmth and understanding, more personal",
    length: "longer",
  },
  concise: {
    description: "Direct and solution-focused, brief",
    length: "short",
  },
};

export interface WorkflowMapping {
  category: string;
  workflowName: string;
  typicalResponse: string;
  nextSteps: string[];
}

export const WORKFLOW_MAPPINGS: Record<string, WorkflowMapping> = {
  billing: {
    category: "billing",
    workflowName: "Billing Resolution",
    typicalResponse: "Address payment issues, explain charges, offer payment plans",
    nextSteps: [
      "Review account balance and payment history",
      "Check for payment plan eligibility",
      "Offer alternative payment options if needed",
    ],
  },
  labs: {
    category: "labs",
    workflowName: "Lab Scheduling & Results",
    typicalResponse: "Schedule labs, explain results, coordinate with provider",
    nextSteps: [
      "Check lab scheduling availability",
      "Review lab requirements for program",
      "Coordinate with clinical team if results needed",
    ],
  },
  refill: {
    category: "refill",
    workflowName: "Prescription Refill",
    typicalResponse: "Process refill requests, check eligibility, coordinate shipping",
    nextSteps: [
      "Verify prescription status and refill eligibility",
      "Check shipping address on file",
      "Confirm expected delivery timeline",
    ],
  },
  shipping: {
    category: "shipping",
    workflowName: "Shipping & Delivery",
    typicalResponse: "Track orders, resolve delivery issues, coordinate replacements",
    nextSteps: [
      "Check tracking information",
      "Verify shipping address",
      "Coordinate replacement if needed",
    ],
  },
  cancellation: {
    category: "cancellation",
    workflowName: "Cancellation Request",
    typicalResponse: "Process cancellations, explain policies, offer alternatives",
    nextSteps: [
      "Confirm cancellation request details",
      "Review cancellation policy",
      "Offer retention alternatives if appropriate",
    ],
  },
  portal_access: {
    category: "portal_access",
    workflowName: "Portal Access Support",
    typicalResponse: "Help with login, password reset, navigation",
    nextSteps: [
      "Verify account status",
      "Provide password reset if needed",
      "Guide through portal features",
    ],
  },
  hipaa_docs: {
    category: "hipaa_docs",
    workflowName: "HIPAA Document Request",
    typicalResponse: "Provide secure document access, explain HIPAA process",
    nextSteps: [
      "Verify patient identity",
      "Prepare HIPAA-secure document delivery",
      "Confirm delivery method",
    ],
  },
  symptoms: {
    category: "symptoms",
    workflowName: "Symptom Inquiry",
    typicalResponse: "Acknowledge concerns, recommend clinical follow-up",
    nextSteps: [
      "Assess if escalation to clinical team needed",
      "Document symptoms reported",
      "Coordinate with provider if urgent",
    ],
  },
};

