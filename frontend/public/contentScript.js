if (!window.hasOwnProperty("yomitomoListenerAdded")) {
  window.yomitomoListenerAdded = true;
  // Track if overlay is initialized and its state
  window.yomitomoOverlayInitialized = false;
  window.yomitomoOverlayVisible = false;

  // Listen for messages from the overlay component via window.postMessage
  window.addEventListener("message", function(event) {
    // Only accept messages from the same window
    if (event.source !== window) return;

    const data = event.data;

    // Handle API requests from the overlay
    if (typeof data === 'object' && data.source === 'yomitomo-overlay' && data.action === 'apiRequest') {
      // Forward the request to the background script
      chrome.runtime.sendMessage(
        { action: "apiRequest", data: data.data },
        (response) => {
          if (chrome.runtime.lastError) {
            // Send error response back to overlay
            window.postMessage({
              source: 'yomitomo-content',
              action: 'apiResponse',
              success: false,
              error: chrome.runtime.lastError.message
            }, "*");
          } else {
            // Send success response back to overlay
            window.postMessage({
              source: 'yomitomo-content',
              action: 'apiResponse',
              success: true,
              data: response.data
            }, "*");
          }
        }
      );
    }
    
    if (event.data === "closeOverlayFromInside" && window.yomitomoOverlayInitialized) {
      // Update the state tracking
      window.yomitomoOverlayVisible = false;
      // Send the toggle message back to the overlay to ensure animation
      window.postMessage("toggleOverlay2", "*");
      console.log("Overlay close request processed by content script");
    }
    
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((msg) => {
    console.log("Received message in content script:", msg);

    // Check if the message is to toggle the overlay
    if (msg.action === "toggleOverlay2") {
      if (window.yomitomoOverlayInitialized) {
        // Toggle state and send message to the overlay
        window.yomitomoOverlayVisible = !window.yomitomoOverlayVisible;
        window.postMessage("toggleOverlay2", "*");
        console.log("Toggled overlay state to:", window.yomitomoOverlayVisible);
      } else {
        // Initialize the overlay for the first time
        window.yomitomoOverlayInitialized = true;
        window.yomitomoOverlayVisible = true;
        
        // Create the script element to load the overlay
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("overlay.bundle.js");
        script.type = "module";
        document.body.appendChild(script);
        console.log("Initialized overlay");
      }
    }
  });

  console.log("Content script loaded and listener added.");
}

// Listen for text selection (highlighting)
document.addEventListener("mouseup", function () {
  let selectedText = window.getSelection().toString().trim();

  console.log( "Selected text:", selectedText); // Log the selected text for debugging

  if (selectedText.length > 0) {
    window.postMessage({ action: "highlightedText", highlightedText: selectedText }, "*");
    console.log("Stored Highlighted Text via postMessage:", selectedText);
  }
  
});
