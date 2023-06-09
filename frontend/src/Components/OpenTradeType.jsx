import React from "react";

const OpenTradeType = ({
  selectedTradeType,
  handleTradeTypeChange,
  openTrade,
}) => {
  return (
    <div>
      {openTrade.type === "Buy" && (
        <>
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
            id="sell"
            name="tradeType"
            value="Sell"
            checked={selectedTradeType === "Sell"}
            onChange={handleTradeTypeChange}
          />
          <label htmlFor="sell">Sell</label>
        </>
      )}

      {openTrade.type === "Short" && (
        <>
          <input
            type="radio"
            id="short"
            name="tradeType"
            value="Short"
            checked={selectedTradeType === "Short"}
            onChange={handleTradeTypeChange}
          />
          <label htmlFor="short">Short</label>
        </>
      )}

      {openTrade.type === "Short" && (
        <>
          <input
            type="radio"
            id="buy"
            name="tradeType"
            value="Buy"
            checked={selectedTradeType === "Buy"}
            onChange={handleTradeTypeChange}
          />
          <label htmlFor="buy">Buy</label>
        </>
      )}
    </div>
  );
};

export default OpenTradeType;
