if (!window.hasOwnProperty("yomitomoListenerAdded")) {
  window.yomitomoListenerAdded = true;

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("Received message in content script:", msg);

    if (msg.action === "toggleOverlay2") {
      let container = document.getElementById("yomitomo-overlay");

      if (container) {
        container.style.display = container.style.display === "none" ? "block" : "none";
        console.log("Toggled overlay:", container.style.display);
      } else {
        // console.log("Creating new overlay...");
        // container = document.createElement("div");
        // container.id = "yomitomo-overlay";
        // document.body.appendChild(container);

        setTimeout(() => {
          const script = document.createElement("script");
          script.src = chrome.runtime.getURL("overlay.bundle.js");
          script.type = "module";
          document.body.appendChild(script);
        }, 100); // Small delay to ensure element exists
      }
    }
  });

  console.log("Content script loaded and listener added.");
}

// Listen for text selection (highlighting)
document.addEventListener("mouseup", function () {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
      chrome.runtime.sendMessage({ action: "storeText", text: selectedText });
  }
});
