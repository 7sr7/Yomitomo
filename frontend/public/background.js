chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleOverlay") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
          console.error("No active tab found.");
          return;
      }
  
      const tabId = tabs[0].id;
      
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["contentScript.js"] // or a function
      }, () => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
          }
      });
    });
  }
});


// const newLocal = chrome.commands.onCommand.addListener((command) => {
//   if (command === "toggle_floating_popup") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_popup" });
//     });
//   }
// });

