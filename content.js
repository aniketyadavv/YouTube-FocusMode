// Remove distractions from the YouTube page
function removeDistractions() {
    document.querySelector('#related').remove();
    document.querySelector('#comments').remove();
    document.querySelectorAll('.ytp-ad-overlay-container').forEach((ad) => ad.remove());
}

// Display a message to the user
function showMessage() {
    const message = document.createElement('div');
    message.innerText = 'You are now in focus mode. Enjoy!';
    message.style.position = 'fixed';
    message.style.top = '0';
    message.style.left = '0';
    message.style.backgroundColor = 'green';
    message.style.color = 'white';
    message.style.padding = '10px';
    message.style.zIndex = '9999';
    document.body.appendChild(message);
}

// Send a message to the background script to start the focus mode
chrome.runtime.sendMessage({ type: 'startFocusMode' }, () => {
    removeDistractions();
    showMessage();
});
