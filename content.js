let isActive = false;
let sidebar = null;

function createUI() {
  // Create the toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'image-selector-toggle';
  toggleButton.textContent = 'Image Selector';

  // Position the button vertically centered and attached to the right end
  toggleButton.style.position = 'fixed';
  toggleButton.style.top = '45%'; // Center vertically
  toggleButton.style.right = '0'; // Attach to the right end
  toggleButton.style.transform = 'translateY(-50%)'; // Correct vertical centering
  toggleButton.style.zIndex = '10000';

  // Style the button to make the text vertical
  toggleButton.style.writingMode = 'vertical-rl'; // Rotate text vertically
  toggleButton.style.backgroundColor = '#007BFF'; // Add a background color
  toggleButton.style.color = '#FFF'; // Text color
  toggleButton.style.padding = '10px 5px'; // Padding for better appearance
  toggleButton.style.border = 'none'; // Remove border
  toggleButton.style.cursor = 'pointer'; // Pointer cursor for better UX
  toggleButton.style.borderRadius = '5px 0 0 5px'; // Rounded corners on the left side

  document.body.appendChild(toggleButton);

  // Assign the global sidebar variable
  sidebar = document.createElement('div');
  sidebar.id = 'image-selector-sidebar';
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = '-300px'; // Start hidden
  // sidebar.style.width = '300px';
  sidebar.style.height = '100%';
  sidebar.style.backgroundColor = '#f0f0f0';
  sidebar.style.boxShadow = '-2px 0 5px rgba(0,0,0,0.2)';
  sidebar.style.transition = 'right 0.3s'; // Smooth transition
  sidebar.style.zIndex = '10001';
  sidebar.innerHTML = `
    <p id = "close-sidebar"style="cursor: pointer; padding: 10px; text-align: right;" >X</p>
    <h2 style="padding: 20px;">Image Selector</h2>
    <button id="activate-selector" style="margin: 20px; padding: 10px; cursor: pointer;">Select Image</button>
  `;

  document.body.appendChild(sidebar);

  // Add event listeners for toggle and activation
  toggleButton.addEventListener('click', toggleSidebar);

  document.getElementById('close-sidebar').addEventListener('click', toggleSidebar);

  // Add event listeners for toggle and activation
  // toggleButton.addEventListener('click',()=>{toggleSidebar(), console.log("toggleSidebar")} );

  sidebar.addEventListener('click', (event) => {
    if (event.target.id === 'activate-selector') {
      requestActivateSelector();
    }
  });
}

function toggleSidebar() {
  console.log("toggle")
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

function handleImageClick(event) {
  event.preventDefault();
  event.stopPropagation();

  const clickedElement = event.target;
  let imageUrl = null;

  if (clickedElement.tagName === 'IMG' && clickedElement.src) {
    imageUrl = clickedElement.src;
  } else {
    // Check for background image
    const computedStyle = window.getComputedStyle(clickedElement);
    const backgroundImage = computedStyle.getPropertyValue('background-image');
    
    if (backgroundImage !== 'none') {
      // Extract URL from the background-image property
      const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        imageUrl = urlMatch[1];
      }
    }
  }

  if (imageUrl) {
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert(`Image URL copied: ${imageUrl}`);
    });

    document.removeEventListener('click', handleImageClick, true);
    isActive = false;
  } else {
    alert('Please click on a visible image or an element with a background image.');
  }
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
