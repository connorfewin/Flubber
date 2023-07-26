import React, { useState } from "react";
import PortfolioValue from "../Components/PortfolioValue";

const Portfolio = ({portfolio}) => {
  
  return (
    <div className="Header">
      {portfolio ? (
        <PortfolioValue
          portfolio={portfolio}
        />
      ) : (
        <h1>Connor's Portfolio</h1>
      )}
    </div>
  );
};

export default Portfolio;
