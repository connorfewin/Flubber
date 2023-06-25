import React, { useState, useEffect, useCallback } from "react";

import { API, graphqlOperation } from "aws-amplify";
import {
  fetchAllSecurityTradesAPI,
  fetchSharesByTradeIdAPI,
  updateSecurityIsOpenAPI,
  calculateRecognizedProfitAPI,
} from "../api";
import { onCreateOrder } from "../graphql/subscriptions";
import NewTrade from "./NewTrade";
import MockTradeInfo from "./MockTradeInfo";
import CurrentTradeInfo from "./CurrentTradeInfo";

const Security = (props) => {
  const { security } = props;
  const [trades, setTrades] = useState([]);
  const [openTrade, setOpenTrade] = useState(null);
  const [openTradeUpdate, setOpenTradeUpdate] = useState(false);
  const [numShares, setNumShares] = useState(null);
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [recognizedProfit, setRecognizedProfit] = useState(0);

  const updateSecurityIsOpen = useCallback(
    async (flag) => {
      updateSecurityIsOpenAPI(security.id, flag);
    },
    [security.id]
  );

  // fetchRecognizedProfit
  useEffect(() => {
    const fetchRecognizedProfit = async () => {
      const recognizedProfitResponse = await calculateRecognizedProfitAPI(
        security.id
      );
      setRecognizedProfit(recognizedProfitResponse);
    };
    fetchRecognizedProfit();
  }, [security.id]);
  // fetchTrades
  useEffect(() => {
    const fetchTrades = async () => {
      const tradesResponse = await fetchAllSecurityTradesAPI(security.id);
      console.log(security.symbol);
      console.log(security.id);
      console.log("Trade Response: ", tradesResponse);
      setTrades(tradesResponse);
    };

    fetchTrades();
  }, [setTrades, security.id, security.symbol]);

  // open trade
  useEffect(() => {
    const openTrades = (trades ?? []).filter((trade) => trade.isOpen === true);
    if (openTrades.length > 1) {
      throw new Error(`${security.symbol} has more than one open trade`);
    }

    if (openTrades.length > 0) {
      setOpenTrade(openTrades[0]);
    }
  }, [trades, security.symbol]);

  // fetchNumShares
  useEffect(() => {
    console.log("UPDATE NUM SHARES");
    const fetchNumShares = async () => {
      console.log("open trade: ", openTrade);
      const shares = await fetchSharesByTradeIdAPI(openTrade.id);
      const openShares = shares.filter((item) => item.isOpen);
      setNumShares(openShares.length);
    };

    if (openTrade && openTrade !== null) {
      updateSecurityIsOpen(true);
      fetchNumShares();
    } else {
      updateSecurityIsOpen(false);
      setNumShares(null);
    }
  }, [openTradeUpdate, openTrade, updateSecurityIsOpen]);

  // Function to update openTrade and trigger the effect
  const updateOpenTrade = (newOpenTrade) => {
    console.log("update Open Trade");
    setOpenTrade(newOpenTrade);
    setOpenTradeUpdate((prev) => !prev); // Toggle the value of openTradeUpdate
  };

  // onCreateOrder subscription
  useEffect(() => {
    const calculateRecognizedProfit = async (securityId) => {
      const recognizedProfitResponse = await calculateRecognizedProfitAPI(
        securityId
      );
      setRecognizedProfit(recognizedProfitResponse);
    };
    const subscription = API.graphql(graphqlOperation(onCreateOrder)).subscribe(
      {
        next: (eventData) => {
          const updatedOrder = eventData.value.data.onCreateOrder;
          if (updatedOrder.securityId === security.id) {
            calculateRecognizedProfit(updatedOrder.securityId);
          }
        },
        error: (error) => {
          console.error("Subscription error:", error);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [security.id]);

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
        <h2 style={{ textAlign: "center" }}>
          {security.symbol}
          {"   $"}
          {recognizedProfit}
        </h2>
        {security.isOpen ? (
          <CurrentTradeInfo
            price={security.currentPrice}
            recognizedProfit={recognizedProfit}
            numShares={numShares}
            openTrade={openTrade}
          />
        ) : (
          <MockTradeInfo
            price={security.currentPrice}
            recognizedProfit={recognizedProfit}
          />
        )}

        {numShares != null && <p>Shares: {numShares}</p>}
        {showNewTrade ? (
          <NewTrade
            onClose={() => setShowNewTrade(false)}
            security={security}
            openTrade={openTrade}
            updateOpenTrade={updateOpenTrade}
          />
        ) : (
          <button onClick={handleNewTradeClick}>New Trade</button>
        )}
      </div>
    </div>
  );
};

export default Security;
