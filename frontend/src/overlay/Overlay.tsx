import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Overlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Listen for messages to toggle overlay state
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "toggleOverlay2") {
        setIsVisible((prev) => !prev); // ✅ Toggle visibility
        console.log("here.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Close function
  const closeOverlay = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}  // Start off-screen
          animate={{ x: "0%", opacity: 1 }}   // Slide in from right
          exit={{ x: "100%", opacity: 0 }}    // Slide out to the right on exit
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: "20%",
            right: "5%",
            width: "300px",
            height: "400px",
            backgroundColor: "blue",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            padding: "20px",
            zIndex: 9999,
          }}
          className="flex flex-col justify-center items-center text-white text-center"
        >
          <h2 className="text-black">Yomitomo</h2>
          <p>This is your in-page popup!</p>
          <button onClick={closeOverlay}>Close</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
