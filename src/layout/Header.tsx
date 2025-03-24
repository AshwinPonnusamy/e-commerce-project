import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Avatar, Menu, MenuItem, Tooltip, Badge } from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [isLoggedIn] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const settings = ["Profile", "Logout"];

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCartOpen = () => {
    navigate("/layout/shoppingcart");
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#333" }}>
        <Toolbar variant="dense">
          {/* Left side - Menu Icon */}
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" component="div">
          BUYNWELL
          </Typography>

          {/* Centered Tabs */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: { backgroundColor: "rgb(226, 190, 27)", color: "#fff" },
              }}
            >
              <Tab
                label="Home"
                sx={{ fontSize: "12px", color: value === 0 ? "rgb(226, 190, 27)" : "#fff" }}
                onClick={() => navigate("/")}
              />
              <Tab
                label="Products"
                sx={{ fontSize: "12px", color: value === 1 ? "rgb(226, 190, 27)" : "#fff" }}
                onClick={() => navigate("/events")}
              />
              <Tab
                label="About"
                sx={{ fontSize: "12px", color: value === 2 ? "rgb(226, 190, 27)" : "#fff" }}
                onClick={() => navigate("/about")}
              />
              <Tab
                label="Contact"
                sx={{ fontSize: "12px", color: value === 3 ? "rgb(226, 190, 27)" : "#fff" }}
                onClick={() => navigate("/contact")}
              />
            </Tabs>
          </Box>

          {/* Right side - Login / Profile Options */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0, display:"flex", flexDirection:"row" }}>
              {/* <Button sx={{ color: "#fff", textTransform: "none", "&:hover":{
                backgroundColor: "transparent",
                "& .MuiButtonBase-root":{
                  p:0,
                }
              } }}
              onClick={() => navigate("/layout/createevent")}>
                Create Product
              </Button> */}

              <IconButton disableFocusRipple disableTouchRipple disableRipple sx={{ color: "#fff", display:"flex", flexDirection:"column" }} onClick={handleCartOpen}>
              <Badge badgeContent={totalCartItems} color="primary">
                <ShoppingCart />
                </Badge>
                <span style={{ fontSize: "12px", marginLeft: "6px" }}>
                  Cart
                </span>
              </IconButton>

              <IconButton disableFocusRipple disableTouchRipple disableRipple sx={{ color: "#fff", display:"flex", flexDirection:"column" }}>
                <Badge badgeContent={4} color="primary">
                <FavoriteBorder />
                </Badge>
                <span style={{ fontSize: "12px", marginLeft: "6px" }}>
                  Wishlist
                </span>
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar
                    sx={{ height: "30px", width: "30px" }}
                    alt="User Avatar"
                    // src="../../public/vite.svg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
              <Button sx={{ color: "inherit", fontSize: "12px" }} onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                sx={{
                  backgroundColor: "rgb(226, 190, 27)",
                  color: "rgb(30, 11, 51)",
                  border: "none",
                  fontSize: "12px",
                  padding: "0 10px",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
