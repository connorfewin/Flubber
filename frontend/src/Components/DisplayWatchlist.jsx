import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPortfolio,
  fetchWatchlistsAPI,
  fetchManySecuritiesAPI,
} from "../api";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSecurity } from "../graphql/subscriptions";
import "../Styles/Watchlist.css";

const DisplayWatchlist = () => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [securities, setSecurities] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);

  useEffect(() => {
    const fetchWatchlists = async () => {
      const portfolioResponse = await fetchPortfolio();
      setPortfolio(portfolioResponse);
      const watchlistResponse = await fetchWatchlistsAPI(portfolio.id);
      setWatchlist(watchlistResponse);
      setSelectedWatchlist(
        watchlistResponse.length === 1 ? watchlistResponse[0] : null
      );
    };

    fetchWatchlists();
  }, [portfolio.id]);
  useEffect(() => {
    const fetchSecurities = async () => {
      if (selectedWatchlist && selectedWatchlist.securityIds.length > 0) {
        const securitiesResponse = await fetchManySecuritiesAPI(
          selectedWatchlist.securityIds
        );
        setSecurities(securitiesResponse);
      }
    };

    fetchSecurities();
  }, [selectedWatchlist]);

  // Subscription to listen for updated securities
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateSecurity)
    ).subscribe({
      next: (eventData) => {
        // Handle the updated security received through the subscription
        const updatedSecurity = eventData.value.data.onUpdateSecurity;
        setSecurities((prevSecurities) => {
          const updatedSecurities = prevSecurities.map((security) => {
            if (security.id === updatedSecurity.id) {
              return updatedSecurity;
            }
            return security;
          });
          return updatedSecurities;
        });
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
    });

    // Unsubscribe the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleWatchlistChange = (event) => {
    const selectedWatchlistId = event.target.value;
    const selectedWatchlist = watchlist.find(
      (item) => item.id === selectedWatchlistId
    );
    setSelectedWatchlist(selectedWatchlist);
  };

  const handleNewWatchlist = () => {
    navigate("/new-watchlist");
  };

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        {watchlist.length > 1 ? (
          <select className="watchlist-select" onChange={handleWatchlistChange}>
            <option value="">Select Watchlist</option>
            {watchlist.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : (
          <h2 className="watchlist-title">
            {watchlist.length === 1 && watchlist[0].name}
          </h2>
        )}
        <button className="new-watchlist-button" onClick={handleNewWatchlist}>
          New Watchlist
        </button>
      </div>
      {securities.length > 0 && (
        <div className="securities-list">
          <h3>Securities:</h3>
          <div className="securities-row">
            {securities.map((security) => (
              <div key={security.id} className="security-item">
                <p>Symbol: {security.symbol}</p>
                <p>Price: {security.currentPrice}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayWatchlist;
