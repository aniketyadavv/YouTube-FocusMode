document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the current focus duration and display it in the options form
    chrome.storage.sync.get(['focusDuration'], (result) => {
        document.getElementById('focusDuration').value = result.focusDuration;
    });

    // Save the updated focus duration to storage
    document.getElementById('saveButton').addEventListener('click', () => {
        const focusDuration = parseInt(document.getElementById('focusDuration').value);
        chrome.storage.sync.set({ focusDuration });
    });
});
