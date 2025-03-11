chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "toggleOverlay") {
    let container = document.getElementById("overlay-container");
    if (container) {
      container.style.display =
        container.style.display === "none" ? "block" : "none";
    } else {
      container = document.createElement("div");
      container.id = "overlay-container";
      // Create the inner container for the React overlay
      container.innerHTML = `<div id="yomitomo-overlay"></div>`;
      document.body.appendChild(container);

      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("overlay.bundle.js");
      script.type = "module";
      container.appendChild(script);
    }
  }

  if (msg.action === "toggleLanguage"){
    

  }

});