import React from "react";
import "../Styles/NewTrade.css";

const NewTrade = (props) => {
  const { onClose, security } = props;

  const handleTradeSubmit = () => {
    // Perform trade submission logic

    // Close the NewTrade component
    onClose();
  };

  return (
    <div>
      <h4>New Trade - {security.symbol}</h4>
      <p>Id: {security.id}</p>
      {/* Render trade form */}
      <div className="button-container">
        <button className="submit-button" onClick={handleTradeSubmit}>
          Submit Trade
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewTrade;

