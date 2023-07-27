import React, { useEffect, useState } from "react";
import DisplayWatchlist from "../Containers/DisplayWatchlist";
import "../Styles/HomePage.css";
import OrderHistory from "../Containers/OrderHistory";
import Portfolio from "../Containers/Portfolio";
import NewPortfolio from "../Components/NewPortfolio";
import { fetchPortfolioAPI } from "../api";
import PortfolioValueChart from "../Components/PortfolioValueChart";

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
          <div className="orderHistPortfoliochart-contianer">
            <div className="orderHistory-container">
              <OrderHistory />
            </div>
            <div className="portfolioChart-container">
              <PortfolioValueChart portfolio={portfolio} />
            </div>
          </div>
        </>
      ) : (
        <NewPortfolio />
      )}
    </div>
  );
};

export default HomePage;
