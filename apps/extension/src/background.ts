// Background service worker for Chrome extension

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item
  chrome.contextMenus.create({
    id: "generateFountainResponse",
    title: "Generate Fountain Response",
    contexts: ["selection"],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateFountainResponse" && info.selectionText) {
    // Open side panel with selected text
    chrome.sidePanel.open({ windowId: tab?.windowId });
    
    // Store selected text for side panel to retrieve
    chrome.storage.local.set({
      selectedText: info.selectionText,
      timestamp: Date.now(),
    });
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

