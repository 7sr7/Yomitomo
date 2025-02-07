async function sayHello() {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: () => {
        document.body.style.backgroundColor = 'red';
        alert('Hello, world!');
    }
  });
};

document.getElementById("myButton").addEventListener("click", sayHello);