// Side panel script

// Update this to your deployed API URL in production
const API_URL = "http://localhost:3000"; // Change to your Vercel URL when deploying

interface GenerationResponse {
  status: "ok" | "escalation" | "critical_escalation";
  category?: string;
  final_response: string;
  internal_notes: string[];
  escalation_reason?: string;
}

async function loadSelectedText() {
  const result = await chrome.storage.local.get(["selectedText"]);
  if (result.selectedText) {
    const textarea = document.getElementById("messageInput") as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = result.selectedText;
    }
  }
}

async function generateResponse() {
  const messageInput = document.getElementById("messageInput") as HTMLTextAreaElement;
  const toneSelect = document.getElementById("toneSelect") as HTMLSelectElement;
  const programSelect = document.getElementById("programSelect") as HTMLSelectElement;
  const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
  const output = document.getElementById("output") as HTMLDivElement;

  const message = messageInput.value.trim();
  if (!message) {
    output.innerHTML = '<div class="error">Please enter a patient message</div>';
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  output.innerHTML = '<div class="loading"><div class="spinner"></div>Generating response...</div>';

  try {
    const request = {
      message,
      tone: toneSelect.value,
      context: {
        program: programSelect.value || undefined,
      },
    };

    const response = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Failed to generate response");
    }

    const data: GenerationResponse = await response.json();
    displayResponse(data);
  } catch (error) {
    output.innerHTML = `<div class="error">Error: ${error instanceof Error ? error.message : "Unknown error"}</div>`;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Response";
  }
}

function displayResponse(data: GenerationResponse) {
  const output = document.getElementById("output") as HTMLDivElement;

  if (data.status === "escalation" || data.status === "critical_escalation") {
    output.innerHTML = `
      <div class="escalation-box">
        <h3>⚠️ Escalation Required</h3>
        <p><strong>${data.escalation_reason || "Critical escalation detected"}</strong></p>
        <p style="margin-top: 8px;">${data.final_response}</p>
        <div class="internal-notes" style="margin-top: 12px;">
          <h3>Internal Instructions:</h3>
          <ul>
            ${data.internal_notes.map((note) => `<li>${note}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  } else {
    output.innerHTML = `
      <div class="section">
        <h2>Generated Response</h2>
        <div class="response-box">${escapeHtml(data.final_response)}</div>
        <div class="actions">
          <button onclick="copyToClipboard()">Copy</button>
          <button onclick="insertIntoPage()">Insert into Page</button>
        </div>
      </div>
      <div class="internal-notes">
        <h3>Internal Notes</h3>
        <ul>
          ${data.internal_notes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    `;

    // Store response for copy/insert functions
    (window as any).lastResponse = data.final_response;
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

async function copyToClipboard() {
  const text = (window as any).lastResponse;
  if (text) {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }
}

async function insertIntoPage() {
  const text = (window as any).lastResponse;
  if (text) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, {
          action: "insertText",
          text,
        });
        alert("Text inserted into active field!");
      }
    } catch (error) {
      alert("Could not insert text. Make sure you have a text field focused.");
    }
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadSelectedText();

  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", generateResponse);
  }

  // Make functions available globally for onclick handlers
  (window as any).copyToClipboard = copyToClipboard;
  (window as any).insertIntoPage = insertIntoPage;
});

