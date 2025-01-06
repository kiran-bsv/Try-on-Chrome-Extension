let isActive = false;

function activateImageSelector() {
  if (isActive) return; // Prevent multiple activations
  isActive = true;

  document.addEventListener("click", handleImageClick, true); // Capture phase to override default actions
}

function handleImageClick(event) {
  event.preventDefault(); // Prevent link navigation or other default actions
  event.stopPropagation(); // Stop event bubbling
  event.stopImmediatePropagation(); // Stop all other listeners

  const clickedElement = event.target;

  // Check if the clicked element is an image
  if (clickedElement.tagName === "IMG" && clickedElement.src) {
    const imageUrl = clickedElement.src;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert(`Image URL copied: ${imageUrl}`);
    });

    // Store the URL in sessionStorage
    sessionStorage.setItem("selectedImageUrl", imageUrl);

    // Cleanup: Remove the event listener after one click
    document.removeEventListener("click", handleImageClick, true);
    isActive = false;
  } else {
    alert("Please click on a visible image.");
  }
}

// Listen for activation message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "activateSelector") {
    console.log("Image selector activated.");
    activateImageSelector();
    sendResponse({ status: "Selector activated" });
  }
});
