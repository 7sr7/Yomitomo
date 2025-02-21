// Prevent duplicate injection
if (!document.getElementById("yomitomo-root")) {
    const rootDiv = document.createElement("div");
    rootDiv.id = "yomitomo-root";
    document.body.appendChild(rootDiv);
  
    // Inject React app
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("reactApp.js");
    script.type = "module";
    document.body.appendChild(script);
  }
  