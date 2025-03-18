import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

const Overlay: React.FC = () => {
  // const [isVisible, setIsVisible] = useState(true);

  const closeOverlay = () => {
    // setIsVisible(false); // Start exit animation
    setTimeout(() => {
      const popupRoot = document.getElementById("yomitomo-overlay");
      if (popupRoot) {
        popupRoot.style.display = "none";
      }
    }, 300); // Matches transition duration
  };

  return (
    
    <AnimatePresence>
      {(
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
            backgroundColor: "black",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            padding: "20px",
            zIndex: 9999,
          }}
          className="flex flex-col justify-center items-center text-white text-center"
        >
          <h2>Yomitomo</h2>
          <p>This is your in-page popup!</p>
          <button onClick={closeOverlay}>Close</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;