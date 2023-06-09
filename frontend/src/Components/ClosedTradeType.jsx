import React from "react";

const ClosedTradeType = ({ selectedTradeType, handleTradeTypeChange }) => {
    return (
      <div>
        <input
          type="radio"
          id="buy"
          name="tradeType"
          value="Buy"
          checked={selectedTradeType === "Buy"}
          onChange={handleTradeTypeChange}
        />
        <label htmlFor="buy">Buy</label>
  
        <input
          type="radio"
          id="short"
          name="tradeType"
          value="Short"
          checked={selectedTradeType === "Short"}
          onChange={handleTradeTypeChange}
        />
        <label htmlFor="short">Short</label>
      </div>
    );
  };

  export default ClosedTradeType;