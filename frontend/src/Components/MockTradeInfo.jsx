import React, { useState } from "react";
import "../Styles/TradeInfo.css";

const MockTradeInfo = ({ price, recognizedProfit }) => {
  const [numShares, setNumShares] = useState(0);

  const handleNumSharesChange = (event) => {
    setNumShares(parseInt(event.target.value));
  };

  return (
    <div className="container">
      <div className="shares-input">
        <p>Shares: </p>
        <input
          type="number"
          value={numShares}
          onChange={handleNumSharesChange}
        />
        {!isNaN(numShares) && (<p>Value: ${Number((numShares * price).toFixed(2))}</p>)}
      </div>
      {!isNaN(numShares) && recognizedProfit !== 0 && numShares !== 0 && (
        <p>${Number((price + (recognizedProfit / numShares)).toFixed(2))}</p>
      )}
      <h3>${price}</h3>
      {!isNaN(numShares) && recognizedProfit !== 0 && numShares !== 0 && (
        <p>${Number((price - (recognizedProfit / numShares)).toFixed(2))}</p>
      )}
    </div>
  );
  
  
};

export default MockTradeInfo;
