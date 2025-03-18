import { createRoot } from "react-dom/client";
import Overlay from "./Overlay";

// Ensure the container exists in the DOM
let rootElement = document.getElementById("yomitomo-overlay");

if (!rootElement) {
  console.log("Creating new overlay... (mainOverlay.tsx)");
  rootElement = document.createElement("div");
  rootElement.id = "yomitomo-overlay";

  // make root transparent... (we want only one thing to show when we click the popup button)
  rootElement.style.background = "transparent";
  rootElement.style.margin = "0";
  rootElement.style.padding = "0";


  document.body.appendChild(rootElement);
}

// Now safely create the React root and render the component
const root = createRoot(rootElement);
root.render(<Overlay />);
