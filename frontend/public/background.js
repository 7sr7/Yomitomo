// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["overlay.bundle.js"],
//   });
// });

// Listen for keyboard command to toggle overlay
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle_overlay") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const tabId = tabs[0].id;
      
      // Send message to content script to toggle overlay
      chrome.tabs.sendMessage(tabId, { action: "toggleOverlay2" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message: ", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent to content script via keyboard shortcut");
        }
      });
    });
  }
});

// Send a message to the content script to toggle the overlay
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

  // Handle API requests
  if (message.action === "apiRequest") {
    fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message.data)
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({ success: true, data });
    })
    .catch(error => {
      console.error("API request error:", error);
      sendResponse({ success: false, error: error.message });
    });
    
    return true; // Indicates we will send a response asynchronously
  }

});
