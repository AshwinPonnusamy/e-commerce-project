import { Grid } from '@mui/material';
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Header />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }} sx={{ height: "auto" }}>
          <Outlet />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
