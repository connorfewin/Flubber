import React, { useState, useEffect } from "react";
import { fetchAllSecurityTradesAPI, fetchSharesByTradeIdAPI, updateSecurityIsOpenAPI } from "../api";
import NewTrade from "./NewTrade";

const Security = (props) => {
  const { security } = props;
  const [trades, setTrades] = useState([]);
  const [openTrade, setOpenTrade] = useState(null);
  const [numShares, setNumShares] = useState(null);
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
    }
  }, [trades, security.symbol]);

  useEffect(() => {
    const fetchNumShares = async () => {
      const shares = await fetchSharesByTradeIdAPI(openTrade.id)
      const openShares = shares.filter(item => item.isOpen);
      setNumShares(openShares.length);
    };

    if (openTrade !== null){
      updateSecurityIsOpen(true);
      fetchNumShares();
    } else {
      updateSecurityIsOpen(false);
      setNumShares(null);
    }
    

 
  }, [openTrade]);

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
        {numShares != null && <p>Shares: {numShares}</p>}
        {showNewTrade ? (
          <NewTrade
            onClose={() => setShowNewTrade(false)}
            security={security}
            openTrade={openTrade}
            setOpenTrade={setOpenTrade}
          />
        ) : (
          <button onClick={handleNewTradeClick}>New Trade</button>
        )}
      </div>
    </div>
  );
};

export default Security;
