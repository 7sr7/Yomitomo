import { useState } from "react";
import { createRoot } from "react-dom/client";

const SideBarPopup = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        right: "5%",
        width: "300px",
        height: "400px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        padding: "20px",
        zIndex: 9999,
      }}
    >
      <h2>Yomitomo</h2>
      <p>This is your in-page popup!</p>
      <button onClick={() => setVisible(false)}>Close</button>
    </div>
  );
};

// Mount React Popup
const rootDiv = document.getElementById("yomitomo-root");
if (rootDiv) {
  const root = createRoot(rootDiv);
  root.render(<SideBarPopup />);
} else {
  console.error("Failed to find the root element for the sidebar popup.");
}
