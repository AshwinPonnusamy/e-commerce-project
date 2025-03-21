import React from "react";
import { Box, Modal, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";

interface ModelProps {
  open: boolean;
  onClose: any;
  handleClose: () => void;
  bodycontent: React.ReactNode;
  modelHeadName: string;
}

const Model: React.FC<ModelProps> = ({
  open,
  handleClose,
  modelHeadName,
  bodycontent,
}) => {

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    color: "#000",
    padding: " 20px",
    borderRadius: "6px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minWidth: "800px",
    maxHeight: "520px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#f0f0f0",
  };
  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography sx={{ color: "#000" }}>
                {modelHeadName}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleClose} >
                <CloseIcon
                  sx={{ fontSize: "0.9rem", color: "#000" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              borderBottom: "1px solid ",
              borderColor: (theme) => theme.palette.text.primary,
              margin: "6px 0px",
            }}
          />
          <Typography sx={{ textAlign: "left" }}>{bodycontent}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Model;
