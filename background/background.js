import { sendMessageToActiveTab } from '../utils/messageUtils.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "activateSelector") {
    sendMessageToActiveTab({ action: "activateSelector" })
      .then(() => sendResponse({ status: "Selector activated" }))
      .catch(() => sendResponse({ status: "No active tab found" }));
    return true; // Keeps the message channel open for async responses
  }
});

