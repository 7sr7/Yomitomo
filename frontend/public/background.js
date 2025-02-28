chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "open_overlay") {
    chrome.scripting.executeScript({
      target: { allFrames: true },
      files: ["contentScript.js"]
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle_floating_popup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_popup" });
    });
  }
});

