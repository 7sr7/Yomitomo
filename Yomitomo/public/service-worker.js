chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => {
        // This function will be executed in the context of the page
        // that the user clicked the browser action.
        alert('Hello, world!');
      }
    }); 
  });