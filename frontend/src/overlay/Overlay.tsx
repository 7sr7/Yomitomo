import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import ChatSection from "./ChatSection.tsx";

const Overlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [highlightedText, setHighlightedText] = useState("");

  // Listen for messages to toggle overlay state
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "toggleOverlay2") {
        setIsVisible((prev) => !prev); // Toggle visibility
        console.log("Toggling overlay visibility via message");
      }

      // Handle receiving highlighted text
      if (event.data && typeof event.data === "object" && event.data.action === "highlightedText") {
        setHighlightedText(event.data.highlightedText);
        console.log("Received highlighted text:", event.data.highlightedText);
      }
    };

    window.addEventListener("message", handleMessage);

    // Try to get currently selected text when overlay opens
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setHighlightedText(selection.toString());
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Close function
  const closeOverlay = () => {
    // Send a message to content script to handle the toggle
    window.postMessage("closeOverlayFromInside", "*");
    console.log("Sending close message to content script");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "500px",
            height: "100vh",
            backgroundColor: "#ffffff",
            border: "none",
            borderLeft: "1px solid #e2e8f0",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
            padding: "20px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "70px",
              borderBottom: "1px solid #edf2f7",
              backgroundColor: "#f8fafc",
              borderTopLeftRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20px"
            }}
          >
            <h2
              style={{
                color: "#64748b", // text-slate-500 
                fontFamily: '"Zen Dots", sans-serif',
                fontSize: "28px",
                fontWeight: "bold",
                margin: 0,
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              Yomitomo
            </h2>
          </div>
          
          <motion.button
            onClick={closeOverlay}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#f1f5f9",
              transition: { duration: 0.2 }
            }}
            style={{
              position: "absolute",
              top: "18px",
              left: "20px",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              backgroundColor: "transparent",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              zIndex: 10
            }}
          >
            <IoClose />
          </motion.button>

          <ChatSection highlightedText={highlightedText} />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
