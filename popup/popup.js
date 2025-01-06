import { sendMessage } from '../utils/messageUtils.js';

document.getElementById("activateBtn").addEventListener("click", () => {
  sendMessage({ action: "activateSelector" })
    .then(response => console.log(response?.status))
    .catch(error => console.error("Error:", error));
});

