import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import NewSecurity from "./NewSecurity";

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

const AddToWatchist = ({ porfoltio, watchlist, securities }) => {

    const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log("Selected Watchlist: ", watchlist);
    console.log("Securities: ", securities);
    console.log();
  }, []);


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
              <NewSecurity
                close={handleClose}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddToWatchist;
