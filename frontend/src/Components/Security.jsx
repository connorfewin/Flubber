import React, { useState, useEffect } from "react";
import { fetchAllSecurityTradesAPI, updateSecurityIsOpenAPI } from "../api";
import NewTrade from "./NewTrade";

const Security = (props) => {
  const { security } = props;
  const [trades, setTrades] = useState([]);
  const [positionIsOpen, setPositionIsOpen] = useState();
  const [showNewTrade, setShowNewTrade] = useState(false);

  useEffect(() => {
    const fetchTrades = async () => {
      const tradesResponse = await fetchAllSecurityTradesAPI(security.id);
      setTrades(tradesResponse);
    };

    fetchTrades();
  }, [setTrades, security.id]);

  useEffect(() => {
    const openTrades = (trades ?? []).filter((trade) => trade.isOpen === true);
    if (openTrades.length > 1) {
      throw new Error(`${security.symbol} has more than one open trade`);
    }
    setPositionIsOpen(openTrades.length > 0);
  }, [trades, security.symbol]);

  useEffect(() => {
    const updateSecurityIsOpen = async () => {
      updateSecurityIsOpenAPI(security.id, positionIsOpen);
    };

    if (positionIsOpen !== security.isOpen) {
      updateSecurityIsOpen();
    }
  }, [positionIsOpen]);

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
          />
        ) : (
          <button onClick={handleNewTradeClick}>New Trade</button>
        )}
      </div>
    </div>
  );
};

export default Security;
