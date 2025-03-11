const Overlay: React.FC = () => {
  
  const closeOverlay = () => {
    // Hide the overlay container by setting display to "none"
    const container = document.getElementById("overlay-container");
    if (container) container.style.display = "none";
  };

  return (
    <div style={{
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
      className="overlay-container"
    >
      <h2>Yomitomo</h2>
      <p>This is your in-page popup!</p>
      <button onClick={closeOverlay}>Close</button>
    </div>
  );
};

export default Overlay;