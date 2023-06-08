import React from "react";
import DisplayWatchlist from "../Components/DisplayWatchlist";
import '../Styles/HomePage.css';

const HomePage = () => {
    return(
        <div className="root-container">
            <DisplayWatchlist />
        </div>
    );
}

export default HomePage;