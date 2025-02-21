chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHANGE_COLOR' && message.tabId) {
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      args: [message.color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      }
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle_floating_popup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["contentScript.js"],
      });
    });
  }
});

