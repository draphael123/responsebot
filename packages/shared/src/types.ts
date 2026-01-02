export type ResponseStatus = "ok" | "escalation" | "critical_escalation";

export type ResponseCategory =
  | "billing"
  | "labs"
  | "refill"
  | "shipping"
  | "cancellation"
  | "portal_access"
  | "hipaa_docs"
  | "symptoms"
  | "other";

export type Tone = "neutral" | "empathetic" | "concise";

export type Program = "TRT" | "HRT" | "GLP" | "other";

export interface ContextInput {
  program?: Program;
  topic?: ResponseCategory;
  state?: string;
  currentStatus?: string;
  orderShipped?: boolean;
  failedPayment?: boolean;
}

export interface GenerationRequest {
  message: string;
  context?: ContextInput;
  tone?: Tone;
}

export interface GenerationResponse {
  status: ResponseStatus;
  category?: ResponseCategory;
  final_response: string;
  internal_notes: string[];
  suggested_macros?: string[];
  confidence: number;
  escalation_reason?: string;
  workflow_citation?: string;
}

export interface EscalationResult {
  isEscalated: boolean;
  reason?: string;
  type?: "legal" | "critical_symptoms" | "threats";
  guidance: string;
  internal_instructions: string[];
}

