"use client";

import { useState } from "react";
import { GenerationRequest, GenerationResponse, Tone, Program, ResponseCategory } from "@fountain/shared";
import MessageInput from "./MessageInput";
import ContextInputs from "./ContextInputs";
import ResponseOutput from "./ResponseOutput";
import LoadingSpinner from "./LoadingSpinner";

export default function ResponseGenerator() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<Tone>("neutral");
  const [program, setProgram] = useState<Program | "">("");
  const [topic, setTopic] = useState<ResponseCategory | "">("");
  const [state, setState] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [response, setResponse] = useState<GenerationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!message.trim()) {
      setError("Please enter a patient message");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const request: GenerationRequest = {
        message: message.trim(),
        tone,
        context: {
          program: program || undefined,
          topic: topic || undefined,
          state: state || undefined,
          currentStatus: currentStatus || undefined,
        },
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate response");
      }

      const data: GenerationResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Patient Message</h2>
        <MessageInput value={message} onChange={setMessage} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Context & Settings</h2>
        <ContextInputs
          tone={tone}
          onToneChange={setTone}
          program={program}
          onProgramChange={setProgram}
          topic={topic}
          onTopicChange={setTopic}
          state={state}
          onStateChange={setState}
          currentStatus={currentStatus}
          onCurrentStatusChange={setCurrentStatus}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={loading || !message.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Generating..." : "Generate Response"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-lg shadow-sm p-12">
          <LoadingSpinner />
        </div>
      )}

      {response && <ResponseOutput response={response} />}
    </div>
  );
}

