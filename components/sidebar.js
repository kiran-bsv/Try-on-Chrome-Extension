export function createSidebar(activateCallback) {
    const sidebar = document.createElement('div');
    sidebar.id = 'image-selector-sidebar';
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

  