import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { fetchWatchlistsAPI, fetchManySecuritiesAPI } from "../api";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateSecurity } from "../graphql/subscriptions";
import "../Styles/Watchlist.css";
import Security from "../Components/Security";
import NewWatchlist from "../Components/NewWatchlist";
import NewBankTransfer from "../Components/NewBankTransfer";
import AddToWatchist from "../Components/AddToWatchlist";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(240, 240, 240, 0.9)",
  border: "#DADADA",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const DisplayWatchlist = ({ portfolio }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [securities, setSecurities] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [openNewWatchlistModal, setOpenNewWatchlistModal] = useState(false);
  const [openNewBankTransferModal, setNewBankTransferModal] = useState(false);

  // fetchWatchlists
  useEffect(() => {
    const fetchWatchlists = async () => {
      const watchlistResponse = await fetchWatchlistsAPI(portfolio?.id);
      setWatchlist(watchlistResponse);
      setSelectedWatchlist(
        watchlistResponse.length === 1 ? watchlistResponse[0] : null
      );
    };

    fetchWatchlists();
  }, [portfolio.id]);

  // fetchSecurities
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

  // onUpdateSecurity Subscription
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

  const handleNewWatchlist = () => setOpenNewWatchlistModal(true);
  const handleNewBankTransfer = () => setNewBankTransferModal(true);
  const handleNewWatchlistClose = () => setOpenNewWatchlistModal(false);
  const handleNewBankTransferClose = () => setNewBankTransferModal(false);

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
        <div className="controlPanel">
          <div className="newWatchlist-modal">
            <button
              className="new-watchlist-button"
              onClick={handleNewWatchlist}
            >
              + Watchlist
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openNewWatchlistModal}
              onClose={handleNewWatchlistClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openNewWatchlistModal}>
                <div className="modal-container">
                  <Box sx={style}>
                    <NewWatchlist />
                  </Box>
                </div>
              </Fade>
            </Modal>
          </div>
          <div className="newBankTransfer-modal">
            <button
              className="newBankTransfer-button"
              onClick={handleNewBankTransfer}
            >
              + Bank Transfer
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openNewBankTransferModal}
              onClose={handleNewBankTransferClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={openNewBankTransferModal}>
                <div className="modal-container">
                  <Box sx={style}>
                    <NewBankTransfer
                      portfolio={portfolio}
                      close={handleNewBankTransferClose}
                    />
                  </Box>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
      {securities.length > 0 && (
        <div className="securities-list">
          <div className="securities-row">
            {securities.map((security) => (
              <Security key={security.id} security={security} />
            ))}
            <AddToWatchist
              portfolio={portfolio}
              watchlist={selectedWatchlist}
              securities={securities}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayWatchlist;
