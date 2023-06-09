import React, { useState } from "react";
import "../Styles/NewTrade.css";
import OpenTradeType from "./OpenTradeType";
import ClosedTradeType from "./ClosedTradeType";

const NewTrade = (props) => {
  const { onClose, security, openTrade } = props;
  const [selectedTradeType, setSelectedTradeType] = useState("");

  const handleTradeSubmit = () => {
    // Perform trade submission logic based on selectedTradeType

    // Close the NewTrade component
    onClose();
  };

  const handleTradeTypeChange = (event) => {
    setSelectedTradeType(event.target.value);
  };

  return (
    <div>
      <h4>New Trade - {security.symbol}</h4>
      <p>Id: {security.id}</p>
      {/* Render trade form */}
      <div className="trade-type-container">
        {security.isOpen && openTrade && (
          <OpenTradeType
            selectedTradeType={selectedTradeType}
            handleTradeTypeChange={handleTradeTypeChange}
            openTrade={openTrade}
          />
        )}

        {!security.isOpen && (
          <ClosedTradeType
            selectedTradeType={selectedTradeType}
            handleTradeTypeChange={handleTradeTypeChange}
          />
        )}
      </div>

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
