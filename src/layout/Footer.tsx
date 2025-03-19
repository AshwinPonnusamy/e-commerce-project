import React from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location  = useLocation();
  return (
    <Box component="footer">
      {/* Yellow Section - Newsletter Subscription */}
      {location.pathname === "/layout/meetorevent" && (
      <Box
        sx={{
          backgroundColor: "#F7D046",
          py: 4,
          px: 3,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Text Content on the Left */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Subscribe to our Newsletter
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1, maxWidth: "500px", fontSize: "14px" }}
          >
            Receive our weekly newsletter & updates with new events from your
            favourite organizers & venues.
          </Typography>
        </Box>

        {/* Input & Button on the Right */}
        
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Enter your e-mail address"
            size="small"
            sx={{
              width: "350px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px 0 0 25px",
                backgroundColor: "#fff",
                border: "none",
                outline: "none",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:focus-within .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1A1A2E",
              color: "#fff",
              textTransform: "none",
              borderRadius: "0 25px 25px 0",
              px: 3,
              height: "40px",
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
          )}

      {/* Dark Blue Section - Footer Links in One Row */}
      <Box
        sx={{
          backgroundColor: "#1A1A2E",
          color: "#fff",
          py: 5,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 5,
        }}
      >
        {/* Company Info */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Company Info
          </Typography>
          <Box sx={{ mt: 1 }}>
            {[
              "About Us",
              "Contact Us",
              "Careers",
              "FAQs",
              "Terms of Service",
              "Privacy Policy",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                color="inherit"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  fontSize: "12px",
                  padding: "5px",
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Help Section */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Help
          </Typography>
          <Box sx={{ mt: 1 }}>
            {[
              "Account Support",
              "Listing Products",
              "Product Ticketing",
              "Ticket Purchase Terms & Conditions",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                color="inherit"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  fontSize: "12px",
                  padding: "5px",
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Categories */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Categories
          </Typography>
          <Box sx={{ mt: 1 }}>
            {[
              "Concerts & Gigs",
              "Festivals & Lifestyle",
              "Business & Networking",
              "Food & Drinks",
              "Performing Arts",
              "Sports & Outdoors",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                color="inherit"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  fontSize: "12px",
                  padding: "5px",
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Follow Us & App Download */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Follow Us
          </Typography>
          <Box sx={{ mt: 1 }}>
            {["Facebook", "Instagram", "Twitter", "YouTube"].map(
              (item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    fontSize: "12px",
                    padding: "5px",
                  }}
                >
                  {item}
                </Link>
              )
            )}
          </Box>

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
            Download The App
          </Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Google Play"
              width="120px"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              width="120px"
            />
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom Text */}
      <Box
        sx={{
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="body2">
          © 2025 App Name. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
