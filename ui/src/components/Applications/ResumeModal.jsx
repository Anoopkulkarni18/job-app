import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const contentStyle = {
    position: "relative",
    maxWidth: "80%",
    maxHeight: "80%",
    overflow: "auto",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
  };

  const closeStyle = {
    position: "absolute",
    top: "4px",
    right: "10px",
    fontSize: "40px",
    cursor: "pointer",
    color:"Black"
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    margin: "auto"
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <span style={closeStyle} onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" style={imageStyle} />
      </div>
    </div>
  );
};

export default ResumeModal;
