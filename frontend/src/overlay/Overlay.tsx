import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaLock, FaLockOpen } from "react-icons/fa"; // Import lock icons
import ChatSection from "./ChatSection.tsx";

// Define Message interface
interface Message {
  text: string;
  sender: 'user' | 'bot'; 
  timestamp: Date;
}

// CSS Reset style to prevent inherited zoom/scaling issues
const cssReset = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    zoom: 1;
    -webkit-text-size-adjust: 100%;
  }
  
  body, html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

const Overlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [highlightedText, setHighlightedText] = useState("");
  const [isTextLocked, setIsTextLocked] = useState(false); // New state to track if text is locked
  const [messages, setMessages] = useState<Message[]>([]); // Lift messages state up

  // Listen for messages to toggle overlay state
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "toggleOverlay2") {
        setIsVisible((prev) => !prev); // Toggle visibility
        console.log("Toggling overlay visibility via message");
      }

      // Handle receiving highlighted text - only update if not locked
      if (event.data && typeof event.data === "object" && event.data.action === "highlightedText" && !isTextLocked) {
        setHighlightedText(event.data.highlightedText);
        console.log("Received highlighted text:", event.data.highlightedText);
      }
    };

    window.addEventListener("message", handleMessage);

    // Try to get currently selected text when overlay opens
    const selection = window.getSelection();
    if (selection && selection.toString() && !isTextLocked) {
      setHighlightedText(selection.toString());
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isTextLocked]); // Add isTextLocked as a dependency to re-establish the listener when it changes

  // Close function
  const closeOverlay = () => {
    // Send a message to content script to handle the toggle
    window.postMessage("closeOverlayFromInside", "*");
    console.log("Sending close message to content script");
  };

  // Toggle text lock
  const toggleTextLock = () => {
    setIsTextLocked(prev => !prev);
    console.log("Text lock toggled:", !isTextLocked);
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
            transform: "scale(1)",  // Force scale to 1
            transformOrigin: "right center",
            fontSize: "16px",       // Set base font size
          }}
        >
          {/* Add a style tag with CSS reset */}
          <style>{cssReset}</style>
          
          {/* Add viewport meta to control scaling */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          
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
          
          {/* Lock Text Checkbox */}
          <div 
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 10
            }}
          >
            <motion.button
              onClick={toggleTextLock}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: isTextLocked ? "#e9f5ff" : "transparent",
                border: `1px solid ${isTextLocked ? "#3b82f6" : "#cbd5e1"}`,
                borderRadius: "20px",
                padding: "4px 10px",
                fontSize: "14px",
                color: isTextLocked ? "#3b82f6" : "#64748b",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {isTextLocked ? <FaLock size={12} /> : <FaLockOpen size={12} />}
              <span>{isTextLocked ? "Text Locked" : "Lock Text"}</span>
            </motion.button>
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

          <ChatSection 
            highlightedText={highlightedText} 
            messages={messages} 
            setMessages={setMessages} 
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
