import React, { useEffect, useState } from "react";
import DateInput from "./DateInput";
import "../Styles/BankTransfer.css";
import { createBankTransferAPI } from "../api";

const NewBankTransfer = ({ portfolio, close }) => {
  const [date, setDate] = useState("");
  const [toggleValue, setToggleValue] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Toggle Value: ", toggleValue);
  }, [toggleValue]);

  const handleSubmit = async () => {
    if (date !== "" && toggleValue !== "" && amount !== "") {
      try {
        await createBankTransferAPI(portfolio.id, date, toggleValue, amount);
        close();
      } catch (error) {
        console.log("Error in executeTrade:", error);
      }
    } else {
      setError("Error: Missing Input");
    }
  };

  const handleTypeChange = (event) => {
    setToggleValue(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="newBankTransfer-container">
      <h1>Bank Transfer</h1>
      {error !== "" && (
        <div className="bankTransfer-error">
          <p>{error}</p>
        </div>
      )}
      <DateInput date={date} setDate={setDate} />
      <div class="transferType-container">
        <input
          type="radio"
          id="deposit"
          name="bankTransferType"
          value="Deposit"
          checked={toggleValue === "Deposit"}
          onChange={handleTypeChange}
        />
        <label htmlFor="deposit">Deposit</label>
        <input
          type="radio"
          id="withdrawal"
          name="bankTransferType"
          value="Withdrawal"
          checked={toggleValue === "Withdrawal"}
          onChange={handleTypeChange}
        />
        <label htmlFor="withdrawal">Withdrawal</label>
      </div>
      <div className="input-container">
        <label htmlFor="price">Amount: $</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="bankTransferButtons-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewBankTransfer;
