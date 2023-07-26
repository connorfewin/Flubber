import React, { useEffect, useState } from "react";
import DisplayWatchlist from "../Containers/DisplayWatchlist";
import "../Styles/HomePage.css";
import OrderHistory from "../Containers/OrderHistory";
import Portfolio from "../Containers/Portfolio";
import NewPortfolio from "../Components/NewPortfolio";
import { fetchPortfolioAPI } from "../api";

const HomePage = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const portfolioResponse = await fetchPortfolioAPI();
      console.log("Portfolio: ", portfolioResponse);
      setPortfolio(portfolioResponse);
    };

    fetchPortfolio();
  }, []);
  return (
    <div className="homepage-container">
      {portfolio ? (
        <>
          <div className="portfolio-container">
            <Portfolio portfolio={portfolio} />
          </div>
          <div className="displayWatchlsit-container">
            <DisplayWatchlist portfolio={portfolio} />
          </div>
          <div className="orderHistory-container">
            <OrderHistory />
          </div>
        </>
      ) : (
        <NewPortfolio />
      )}
    </div>
  );
};

export default HomePage;
