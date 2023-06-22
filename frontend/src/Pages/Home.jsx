import React from "react";
import DisplayWatchlist from "../Components/DisplayWatchlist";
import '../Styles/HomePage.css';
import OrderHistory from "../Components/OrderHistory";

const HomePage = () => {
    return(
        <div className="root-container">
            <DisplayWatchlist />
            <OrderHistory />
        </div>
    );
}

export default HomePage;