import React from "react";
import "../Styles/TradeInfo.css";

const CurrentTradeInfo = ({ price, recognizedProfit, numShares, openTrade }) => {

  return (
    <div className="container">
      <div className="shares-input">
        {(<p>Value: ${Number((numShares * price).toFixed(2))}</p>)}
      </div>
      {openTrade !== null && recognizedProfit !== 0 && openTrade.type === 'Short' && (
        <p>${Number((price + (recognizedProfit / numShares)).toFixed(2))}</p>
      )}
      <h3>${price}</h3>
      {openTrade !== null && recognizedProfit !== 0 && openTrade.type === 'Buy' && (
        <p>${Number((price - (recognizedProfit / numShares)).toFixed(2))}</p>
      )}
    </div>
  );
  
  
};

export default CurrentTradeInfo;
