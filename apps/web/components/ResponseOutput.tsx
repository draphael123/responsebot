import { GenerationResponse } from "@fountain/shared";

interface ResponseOutputProps {
  response: GenerationResponse;
}

export default function ResponseOutput({ response }: ResponseOutputProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(response.final_response);
    // You could add a toast notification here
  };

  if (response.status === "escalation" || response.status === "critical_escalation") {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-900 mb-2">
              Escalation Required
            </h3>
            <p className="text-red-800 font-medium mb-4">
              {response.escalation_reason || "Critical escalation detected"}
            </p>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-red-900 font-semibold mb-2">Guidance:</p>
              <p className="text-red-800 mb-4">{response.final_response}</p>
              <div className="border-t border-red-200 pt-4 mt-4">
                <p className="text-red-900 font-semibold mb-2">Internal Instructions:</p>
                <ul className="list-disc list-inside space-y-1 text-red-800">
                  {response.internal_notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Generated Response</h2>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">
            {response.final_response}
          </p>
        </div>
        {response.category && (
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">Category:</span>{" "}
            <span className="capitalize">{response.category.replace("_", " ")}</span>
            {response.workflow_citation && (
              <>
                {" • "}
                <span className="font-medium">Workflow:</span>{" "}
                {response.workflow_citation}
              </>
            )}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Internal Notes
        </h3>
        <ul className="space-y-2">
          {response.internal_notes.map((note, idx) => (
            <li key={idx} className="text-blue-800 flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
        {response.suggested_macros && response.suggested_macros.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="font-semibold text-blue-900 mb-2">Suggested Macros:</p>
            <ul className="space-y-1">
              {response.suggested_macros.map((macro, idx) => (
                <li key={idx} className="text-blue-800 text-sm">
                  {macro}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

