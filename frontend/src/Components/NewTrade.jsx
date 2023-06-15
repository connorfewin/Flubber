import React, { useState } from "react";
import "../Styles/NewTrade.css";
import OpenTradeType from "./OpenTradeType";
import ClosedTradeType from "./ClosedTradeType";
import DateInput from "./DateInnput";
import { executeTrade } from "../api";

const NewTrade = (props) => {
  const { onClose, security, openTrade, setOpenTrade } = props;
  const [selectedTradeType, setSelectedTradeType] = useState("");
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const handleTradeSubmit = async () => {
    // Perform trade submission logic based on selectedTradeType, shares, and price
    try {
      const tradeResposne =  await executeTrade(security, openTrade, date, price, shares, selectedTradeType);
      setOpenTrade(tradeResposne);
    } catch (error) {
      console.log("Error in executeTrade:", error);
    }

    // Close the NewTrade component
    onClose();
  };

  const handleTradeTypeChange = (event) => {
    setSelectedTradeType(event.target.value);
  };

  const handleSharesChange = (event) => {
    setShares(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div>
      <h4>New Trade - {security.symbol}</h4>
      <p>Id: {security.id}</p>
      {/* Render trade form */}
      <div className="trade-type-container">
      <DateInput date={date} setDate={setDate} /> 
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

      <div className="input-container">
        <label htmlFor="shares">Shares:</label>
        <input
          type="number"
          id="shares"
          name="shares"
          value={shares}
          onChange={handleSharesChange}
        />
      </div>

      <div className="input-container">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>

      <div>
        <p>Total: ${Number((price * shares).toFixed(2))}</p>
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
