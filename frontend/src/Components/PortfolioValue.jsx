import React, { useCallback, useState } from "react";
import '../Styles/PortfolioValue.css'
import { updatePortfolioCurrentValueAPI } from "../api";

const PortfolioValue = ({ portfolio }) => {
  const [edit, setEdit] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(portfolio.currentValue);

  const handleEditButtonClick = () => {
    setEdit(true);
  };

  const updatePortfolioCurrentValue = useCallback(
    async (portfolioValue) => {
      updatePortfolioCurrentValueAPI(portfolio.id, portfolioValue);
    },
    [portfolio.id]
  );

  const handleInputChange = (e) => {
    setPortfolioValue(e.target.value);
  };

  const handleSubmit = () => {
    updatePortfolioCurrentValue(portfolioValue);
    setPortfolioValue(portfolioValue);
    setEdit(false);
  };

  return (
    <div className="porfolioValue-container">
      {edit ? (
        <div  className="portfolioHeader">
          <input value={portfolioValue} onChange={handleInputChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="editPortfolio-container">
          <h1>${portfolioValue}</h1>
          <button onClick={handleEditButtonClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PortfolioValue;
