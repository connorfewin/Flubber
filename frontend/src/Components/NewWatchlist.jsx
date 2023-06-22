import React, { useState, useEffect } from "react";
import { fetchPortfolioAPI } from "../api";
import { createWatchlistAPI } from "../api"; // Import the createWatchlistAPI function
import '../Styles/NewWatchlist.css';

const NewWatchlist = () => {
  const [watchlistName, setWatchlistName] = useState("");
  const [securities, setSecurities] = useState([]);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const data = await fetchPortfolioAPI();
      setPortfolio(data);
    };

    fetchPortfolioData();
  }, []);

  const handleAddSecurity = () => {
    setSecurities([...securities, ""]);
  };

  const handleRemoveSecurity = (index) => {
    const updatedSecurities = [...securities];
    updatedSecurities.splice(index, 1);
    setSecurities(updatedSecurities);
  };

  const handleSecurityChange = (index, value) => {
    const updatedSecurities = [...securities];
    updatedSecurities[index] = value;
    setSecurities(updatedSecurities);
  };

  const handleWatchlistNameChange = (event) => {
    setWatchlistName(event.target.value);
  };

  const handleSubmit = () => {
    // Call the createWatchlistAPI function with the necessary arguments
    createWatchlistAPI(portfolio.id, watchlistName, securities);
    
    // Reset the form fields
    setWatchlistName("");
    setSecurities([]);
  };

  return (
    <div className="createWatchlist">
      <h2>Create Watchlist</h2>
      <input
        type="text"
        value={watchlistName}
        onChange={handleWatchlistNameChange}
        placeholder="Watchlist Name"
      />

      {securities.map((security, index) => (
        <div key={index}>
          <input
            type="text"
            value={security}
            onChange={(e) => handleSecurityChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveSecurity(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddSecurity}>Add Security</button>
      
      {/* Add the submit button and attach the handleSubmit function */}
      <button onClick={handleSubmit}>Submit Watchlist</button>
    </div>
  );
};

export default NewWatchlist;
