import React from "react";
import DisplayWatchlist from "../Components/DisplayWatchlist";
import '../Styles/HomePage.css';
import OrderHistory from "../Components/OrderHistory";

const HomePage = () => {
    return(
        <div className="homepage-container">
            <DisplayWatchlist />
            <OrderHistory />
        </div>
    );
}

export default HomePage;