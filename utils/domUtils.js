export function handleImageClick(event) {
    event.preventDefault();
    event.stopPropagation();
  
    const clickedElement = event.target;
    let imageUrl = getImageUrl(clickedElement);
  
    if (imageUrl) {
      copyToClipboard(imageUrl);
      alert(`Image URL copied: ${imageUrl}`);
      document.removeEventListener('click', handleImageClick, true);
    } else {
      alert('Please click on a visible image or an element with a background image.');
    }
  }
  
  function getImageUrl(element) {
    if (element.tagName === 'IMG' && element.src) {
      return element.src;
    }
  
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.getPropertyValue('background-image');
    
    if (backgroundImage !== 'none') {
      const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        return urlMatch[1];
      }
    }
  
    return null;
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  
  