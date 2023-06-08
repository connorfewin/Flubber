import React, { useState } from "react";
import NewTrade from "./NewTrade";

const Security = (props) => {
  const { symbol, securityId, currentPrice } = props;
  const [showNewTrade, setShowNewTrade] = useState(false);

  const handleNewTradeClick = () => {
    setShowNewTrade(true);
  };

  return (
    <div>
      <p>Symbol: {symbol}</p>
      <p>Current Price: ${currentPrice}</p>
      {showNewTrade ? (
        <NewTrade onClose={() => setShowNewTrade(false)} securityId={securityId} symbol={symbol} />
      ) : (
        <button onClick={handleNewTradeClick}>New Trade</button>
      )}
    </div>
  );
};

export default Security;
