// Content script to interact with page and detect text inputs

let selectedText = "";

// Listen for text selection
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (selection && selection.toString().trim()) {
    selectedText = selection.toString().trim();
    
    // Store in extension storage
    chrome.storage.local.set({
      selectedText,
      timestamp: Date.now(),
    });
  }
});

// Listen for messages from side panel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    sendResponse({ text: selectedText });
  } else if (request.action === "insertText") {
    // Try to insert text into active input/textarea
    const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
    
    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA")
    ) {
      const start = activeElement.selectionStart || 0;
      const end = activeElement.selectionEnd || 0;
      const text = activeElement.value;
      
      activeElement.value =
        text.substring(0, start) + request.text + text.substring(end);
      
      // Set cursor position after inserted text
      activeElement.selectionStart = activeElement.selectionEnd =
        start + request.text.length;
      
      // Trigger input event for frameworks like React
      activeElement.dispatchEvent(new Event("input", { bubbles: true }));
      
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: "No active input field" });
    }
  }
  
  return true; // Keep message channel open for async response
});

