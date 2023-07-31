import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { fetchOrCreateSecurityBySymbolAPI, updateWatchlistSecuriesAPI } from "../api";

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

const AddToWatchlist = ({ portfolio, watchlist, setReloadSecurites }) => {
  const [openModal, setOpenModal] = useState(false);
  const [symbol, setSymbol] = useState("");

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = async () => {
    try {
        const securityResponse = await fetchOrCreateSecurityBySymbolAPI(portfolio.id, symbol);
        let newSecurities = [...watchlist?.securityIds, securityResponse.id];
        await updateWatchlistSecuriesAPI(watchlist.id, newSecurities);
        setReloadSecurites(true);
        handleClose();
      } catch (error) {
        console.log("Error in AddToWatchlist:", error);
      }
  };
  const handleClick = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div className="addToWatchList-contianer">
      <button className="addToWatchList-Button" onClick={handleClick}>
        +
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <div className="modal-container">
            <Box sx={style}>
              <h1>New Security</h1>
              <div className="input-container">
                <label htmlFor="symbol">Symbol:</label>
                <input
                  id="symbol"
                  name="symbol"
                  value={symbol}
                  onChange={handleSymbolChange}
                />
              </div>
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddToWatchlist;
