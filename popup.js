document.getElementById("activateBtn").addEventListener("click", () => {
	// Send a message to the background script to activate the selector
	chrome.runtime.sendMessage({ action: "activateSelector" }, (response) => {
	  if (chrome.runtime.lastError) {
		console.error("Error:", chrome.runtime.lastError.message);
	  } else {
		console.log(response?.status);
	  }
	});
  });
  