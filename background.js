chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, currentTab => {
        if (currentTab.url && currentTab.url.includes("youtube.com/watch")) {
            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                files: ['content.js']
            });
            chrome.tabs.sendMessage(currentTab.id, { action: "checkVisibility" });
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
        chrome.tabs.sendMessage(tabId, { action: "checkVisibility" });
    }
});
