import React, { useState, useEffect } from "react";
import { fetchAllSecurityTradesAPI, updateSecurityIsOpenAPI } from "../api";
import NewTrade from "./NewTrade";

const Security = (props) => {
  const { security } = props;
  const [trades, setTrades] = useState([]);
  const [openTrade, setOpenTrade] = useState(null);
  const [showNewTrade, setShowNewTrade] = useState(false);

  const updateSecurityIsOpen = async (flag) => {
    updateSecurityIsOpenAPI(security.id, flag);
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const tradesResponse = await fetchAllSecurityTradesAPI(security.id);
      console.log(security.symbol);
      console.log(security.id);
      console.log("Trade Response: ", tradesResponse);
      setTrades(tradesResponse);
    };

    fetchTrades();
  }, [setTrades, security.id]);

  useEffect(() => {
    const openTrades = (trades ?? []).filter((trade) => trade.isOpen === true);
    if (openTrades.length > 1) {
      throw new Error(`${security.symbol} has more than one open trade`);
    }

    if (openTrades.length > 0) {
      setOpenTrade(openTrades[0]);
      updateSecurityIsOpen(true);
    } else {
      updateSecurityIsOpen(false);
    }
  }, [trades, security.symbol]);

  const handleNewTradeClick = () => {
    setShowNewTrade(true);
  };

  return (
    <div>
      <div
        key={security.id}
        className={`security-item-open ${
          !security.isOpen ? "security-item-closed" : ""
        }`}
      >
        <p>Symbol: {security.symbol}</p>
        <p>Current Price: ${security.currentPrice}</p>
        {showNewTrade ? (
          <NewTrade
            onClose={() => setShowNewTrade(false)}
            security={security}
            openTrade={openTrade}
          />
        ) : (
          <button onClick={handleNewTradeClick}>New Trade</button>
        )}
      </div>
    </div>
  );
};

export default Security;
