import { useState, useEffect } from "react";

const Overlay: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
        setVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
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
    }}>
      <h2>Yomitomo</h2>
      <p>This is your in-page popup!</p>
      <button onClick={() => setVisible(false)}>Close</button>
    </div>
  );
};

export default Overlay;