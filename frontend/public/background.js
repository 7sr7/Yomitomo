chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["overlay.bundle.js"],
  });
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleOverlay") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const tabId = tabs[0].id;

      // Send a message instead of reinjecting content script
      chrome.tabs.sendMessage(tabId, { action: "toggleOverlay2" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message: ", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent to content script");
        }
      });
    });
  }
});
