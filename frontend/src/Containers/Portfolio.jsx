import React from "react";
import PortfolioValue from "../Components/PortfolioValue";
import PortfolioValueChart from "../Components/PortfolioValueChart";

const Portfolio = ({ portfolio }) => {
  return (
    <div>
      {portfolio ? (
        <>
          <PortfolioValue portfolio={portfolio} />
        </>
      ) : (
        <h1>Connor's Portfolio</h1>
      )}
    </div>
  );
};

export default Portfolio;
