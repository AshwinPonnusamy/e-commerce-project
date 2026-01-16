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
        <Grid container spacing={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          {/* Company Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }} >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Company Info
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["About Us", "Contact Us", "Careers", "FAQs", "Terms of Service", "Privacy Policy"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "14px", padding: "4px 0" }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Help Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Help
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["Account Support", "Listing Products", "Product Ticketing", "Ticket Purchase Terms & Conditions"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "14px", padding: "4px 0" }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Categories */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ mt: 1 }}>
              {["Concerts & Gigs", "Festivals & Lifestyle", "Business & Networking", "Food & Drinks", "Performing Arts", "Sports & Outdoors"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "14px", padding: "4px 0" }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Follow Us & App Download */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ mt: 1, mb: 3 }}>
              {["Facebook", "Instagram", "Twitter", "YouTube"].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  color="inherit"
                  sx={{ display: "block", textDecoration: "none", fontSize: "14px", padding: "4px 0" }}
                >
                  {item}
                </Link>
              ))}
            </Box>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Download The App
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: "wrap" }}>
              <Link href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ width: "135px", height: "auto" }}
                />
              </Link>
              <Link href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  style={{ width: "135px", height: "auto" }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Bottom Text */}
      <Box sx={{ textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.1)", py: 3, backgroundColor: "#1A1A2E", color: "rgba(255, 255, 255, 0.7)" }}>
        <Typography variant="body2">© {getCurrentYear()} BUYNWELL. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
