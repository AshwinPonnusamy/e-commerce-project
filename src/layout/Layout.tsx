import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import './Layout.css';
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid
          item
          xs={12} 
          md={12}
          sx={{
            height: "auto",
          }}
        >
          <Outlet />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
