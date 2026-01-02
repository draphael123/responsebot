import { Tone, Program, ResponseCategory } from "@fountain/shared";

interface ContextInputsProps {
  tone: Tone;
  onToneChange: (tone: Tone) => void;
  program: Program | "";
  onProgramChange: (program: Program | "") => void;
  topic: ResponseCategory | "";
  onTopicChange: (topic: ResponseCategory | "") => void;
  state: string;
  onStateChange: (state: string) => void;
  currentStatus: string;
  onCurrentStatusChange: (status: string) => void;
}

export default function ContextInputs({
  tone,
  onToneChange,
  program,
  onProgramChange,
  topic,
  onTopicChange,
  state,
  onStateChange,
  currentStatus,
  onCurrentStatusChange,
}: ContextInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tone
        </label>
        <select
          value={tone}
          onChange={(e) => onToneChange(e.target.value as Tone)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="neutral">Neutral (Standard)</option>
          <option value="empathetic">Extra Empathetic</option>
          <option value="concise">Ultra Concise</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Program
        </label>
        <select
          value={program}
          onChange={(e) => onProgramChange(e.target.value as Program | "")}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Not specified</option>
          <option value="TRT">TRT</option>
          <option value="HRT">HRT</option>
          <option value="GLP">GLP</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topic
        </label>
        <select
          value={topic}
          onChange={(e) => onTopicChange(e.target.value as ResponseCategory | "")}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Auto-detect</option>
          <option value="billing">Billing</option>
          <option value="labs">Labs</option>
          <option value="refill">Refill</option>
          <option value="shipping">Shipping</option>
          <option value="cancellation">Cancellation</option>
          <option value="portal_access">Portal Access</option>
          <option value="hipaa_docs">HIPAA Docs</option>
          <option value="symptoms">Symptoms</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State
        </label>
        <input
          type="text"
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          placeholder="e.g., CA, NY"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Status (Optional)
        </label>
        <input
          type="text"
          value={currentStatus}
          onChange={(e) => onCurrentStatusChange(e.target.value)}
          placeholder="e.g., Order shipped, Payment failed"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

