import React from "react";
import DisplayWatchlist from "../Containers/DisplayWatchlist";
import "../Styles/HomePage.css";
import OrderHistory from "../Containers/OrderHistory";
import Portfolio from "../Containers/Portfolio";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="portfolio-container">
        <Portfolio />
      </div>
      <div className="displayWatchlsit-container">
        <DisplayWatchlist />
      </div>
      <div className="orderHistory-container">
        <OrderHistory />
      </div>
    </div>
  );
};

export default HomePage;
