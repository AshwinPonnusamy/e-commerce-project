import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#1A1A2E",
          color: "#fff",
          py: 5,
          px: 3,
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3} >
            <Typography variant="h6" fontWeight="bold">
              Company Info
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["About Us", "Contact Us", "Careers", "FAQs", "Terms of Service", "Privacy Policy"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "12px", padding: "5px" }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Help Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">
              Help
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["Account Support", "Listing Products", "Product Ticketing", "Ticket Purchase Terms & Conditions"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "12px", padding: "5px" }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">
              Categories
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["Concerts & Gigs", "Festivals & Lifestyle", "Business & Networking", "Food & Drinks", "Performing Arts", "Sports & Outdoors"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "12px", padding: "5px" }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Follow Us & App Download */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["Facebook", "Instagram", "Twitter", "YouTube"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "12px", padding: "5px" }}
                >
                  {item}
                </Link>
              ))}
            </Box>

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
              Download The App
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 2, flexWrap: "wrap" }}>
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
          </Grid>
        </Grid>
      </Box>

      {/* Footer Bottom Text */}
      <Box sx={{ textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.2)", py: 0 }}>
        <Typography variant="body2">© {getCurrentYear()} BUYNWELL. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
