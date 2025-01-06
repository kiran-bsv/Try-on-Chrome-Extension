chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "activateSelector") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "activateSelector" });
        sendResponse({ status: "Selector activated" });
      } else {
        sendResponse({ status: "No active tab found" });
      }
    });
    return true; // Keeps the message channel open for async responses
  }
});

