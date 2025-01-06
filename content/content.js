import { createToggleButton } from '../components/toggleButton.js';
import { createSidebar } from '../components/sidebar.js';
import { handleImageClick } from '../utils/domUtils.js';

let isActive = false;
let sidebar = null;

function createUI() {
  const toggleButton = createToggleButton(toggleSidebar);
  sidebar = createSidebar(requestActivateSelector);
  document.body.appendChild(toggleButton);
  document.body.appendChild(sidebar);
}

function toggleSidebar() {
  if (sidebar.style.right === '0px') {
    sidebar.style.right = '-300px';
  } else {
    sidebar.style.right = '0px';
  }
}

function requestActivateSelector() {
  chrome.runtime.sendMessage({ action: "activateSelector" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
    } else {
      console.log(response?.status);
    }
  });
}

function activateImageSelector() {
  if (isActive) return;
  isActive = true;
  document.addEventListener('click', handleImageClick, true);
  sidebar.style.right = '-300px'; // Close sidebar after activation
}

// Initialize the UI when the content script loads
createUI();

// Listen for activation message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "activateSelector") {
    console.log("Image selector activated.");
    activateImageSelector();
    sendResponse({ status: "Selector activated" });
  }
});

