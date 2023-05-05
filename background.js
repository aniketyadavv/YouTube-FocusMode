// Set default options when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.sync.set({ focusDuration: 30 });
    } else if (details.reason === 'update') {
        chrome.storage.sync.get(['focusDuration'], (result) => {
            if (typeof result.focusDuration === 'undefined') {
                chrome.storage.sync.set({ focusDuration: 30 });
            }
        });
    }
});

// Listen for messages from the content script to start and end the focus mode
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'startFocusMode') {
        // Set a timer for the duration of the focus mode
        chrome.storage.sync.get(['focusDuration'], (result) => {
            const focusDuration = result.focusDuration * 60 * 1000;
            setTimeout(() => {
                sendNotification();
                sendResponse();
            }, focusDuration);
        });
        return true;
    }
});

// Display a notification to the user when the focus mode ends
function sendNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon128.png',
        title: 'YouTube Focus Mode',
        message: 'Focus mode has ended!'
    });
}
