import React from "react";
import "../Styles/BankTransfer.css";

const NewBankTransfer = () => {

    const handleSubmit = () => {
        console.log("Submit");
    }

  return (
    <div className="newBankTransfer-container">
      <h1>Bank Transfer</h1>
      <div className="bankTransferButtons-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewBankTransfer;
