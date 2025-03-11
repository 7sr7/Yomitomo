// Listen for messages from the popup (or background)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "toggleOverlay") {
    // Check if the overlay container already exists
    let container = document.getElementById("overlay-container");
    if (container) {
      // Toggle display
      container.style.display =
        container.style.display === "none" ? "block" : "none";
    } else {
      // Create the container for the overlay
      container = document.createElement("div");
      container.id = "overlay-container";
      document.body.appendChild(container);

      // Create a script element to load the overlay bundle
      const script = document.createElement("script");
      // chrome.runtime.getURL finds the file within your extension’s package
      script.src = chrome.runtime.getURL("overlay.bundle.js");
      script.type = "module";
      container.appendChild(script);
    }
  }

  if (msg.action === "toggleLanguage"){
    

  }

});
