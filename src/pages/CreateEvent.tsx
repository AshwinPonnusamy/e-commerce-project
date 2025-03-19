import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShareIcon from "@mui/icons-material/Share";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
const CreateProduct = () => {
  return (
    <>
      <Container>
        <Box sx={{ margin: "auto", padding: 3 }}>
          {/* Product Image */}
          <Box
            sx={{
              width: "100%",
              height: 200,
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Image Placeholder</Typography>
          </Box>

          {/* Product Title & Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Product Title
            </Typography>
            <Box>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            {/* Date and Time */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold">
                Date and Time
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <CalendarTodayIcon fontSize="small" />
                <Typography fontSize="14px">Day, Date</Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <AccessTimeIcon fontSize="small" />
                <Typography fontSize="14px">Time</Typography>
              </Box>
            </Box>

            {/* Buy Tickets Button */}
            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F7D046",
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Buy Tickets
              </Button>
            </Box>
          </Box>

          {/* Location */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Location
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LocationOnIcon fontSize="small" />
              <Typography fontSize="14px">Address</Typography>
            </Box>
          </Box>

          {/* Map Placeholder */}
          <Box
            sx={{
              width: "40%",
              height: 300,
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Typography variant="h6">Map Placeholder</Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Ticket information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <ConfirmationNumberIcon fontSize="small" />
              <Typography fontSize="14px">Ticket Type: Price/ticket</Typography>
            </Box>
          </Box>
          {/* Hosted by */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Hosted by
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt:2 }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 1,
                    backgroundColor: "#ccc",
                    width: "70px",
                    height: "70px",
                  }}
                ></Box>
              </Box>
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Typography fontSize="16px">Host Name</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Button sx={{ textTransform: "none", border:"1px solid #000", color:"#000" }}>
                      Contact
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <Button sx={{ textTransform: "none", border:"1px solid #000", color:"#fff", backgroundColor:"rgb(30, 11, 51)" }}>
                      Follow
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Product Description */}
            <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              Product Description
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LocationOnIcon fontSize="small" />
              <Typography fontSize="14px">abcdefghijklmnopqrstuvwxyz</Typography>
            </Box>
          </Box>



          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateProduct;
