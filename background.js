chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "activateSelector") {
      // Send a message to the active tab's content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "activateSelector" });
          sendResponse({ status: "Message sent to content script" });
        } else {
          sendResponse({ status: "No active tab found" });
        }
      });
      return true; // Keeps the message channel open for async responses
    }
  });
  