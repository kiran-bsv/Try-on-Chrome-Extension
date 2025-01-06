export function createSidebar(activateCallback) {
    const sidebar = document.createElement('div');
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
        <p id="close-sidebar" style="cursor: pointer; padding: 10px; text-align: right;">X</p>
        <h2 style="padding: 20px;">Image Selector</h2>
        <button id="activate-selector" style="margin: 20px; padding: 10px; cursor: pointer;">Select Image</button>
    `;

    sidebar.querySelector('#close-sidebar').addEventListener('click', () => {
        sidebar.style.right = '-300px';
    });

    sidebar.querySelector('#activate-selector').addEventListener('click', activateCallback);

    return sidebar;
}

  