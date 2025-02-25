const existingDiv = document.getElementById("yomitomo-overlay");
if (!existingDiv) {
  const yomitomoDiv = document.createElement("div");
  yomitomoDiv.id = "yomitomo-overlay";
  document.body.appendChild(yomitomoDiv);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("overlay.bundle.js");
  document.body.appendChild(script);
}