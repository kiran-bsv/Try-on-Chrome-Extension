export function createToggleButton(toggleCallback) {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'image-selector-toggle';
    toggleButton.textContent = 'Image Selector';
    toggleButton.addEventListener('click', toggleCallback);
    return toggleButton;
  }
  
  