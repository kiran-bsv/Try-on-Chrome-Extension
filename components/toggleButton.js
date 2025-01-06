export function createToggleButton(toggleCallback) {
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

    toggleButton.addEventListener('click', toggleCallback);
    return toggleButton;
  }
  
  