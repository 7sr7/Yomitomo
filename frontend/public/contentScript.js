if (!window.hasOwnProperty("yomitomoListenerAdded")) {
  window.yomitomoListenerAdded = true;

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("Received message in content script:", msg);

    if (msg.action === "toggleOverlay2") {
      let container = document.getElementById("overlay-container");

      if (container) {
        container.style.display = container.style.display === "none" ? "block" : "none";
        console.log("Toggled overlay:", container.style.display);
      } else {
        console.log("Creating new overlay...");
        container = document.createElement("div");
        container.id = "overlay-container";

        container.innerHTML = `<div id="yomitomo-overlay"></div>`;
        document.body.appendChild(container);

        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("overlay.bundle.js");
        script.type = "module";
        container.appendChild(script);
      }
    }
  });

  console.log("Content script loaded and listener added.");
}
