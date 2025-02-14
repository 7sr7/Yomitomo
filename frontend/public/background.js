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
