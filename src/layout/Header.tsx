import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, Avatar, Menu, MenuItem, Tooltip, Badge, useMediaQuery, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Dashboard, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { signOut } from "firebase/auth";
import { auth } from "../fireBase/fireBase-config";
import Profile from "./ProfilePage";
import CustomButton from "../components/commonComponents/button/CustomButton";

import { Product } from "../state/store/features/productData";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = React.useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.authData.isLoggedIn);
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);
  const favoriteProducts = useSelector((state: RootState) =>
    state.productData.allProductList.filter((product: Product) => state.productData.isFavorited[product.id])
  );
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const settings = ["Profile", "Logout"];
  const isMobile = useMediaQuery("(max-width:768px)");
  const profileData = useSelector((state: RootState) => state.userData);
  console.log(profileData, "profileData");

  React.useEffect(() => {
    if (location.pathname === "/layout/home" || location.pathname === "/") {
      setValue(0);
    } else if (location.pathname === "/layout/allproducts") {
      setValue(1);
    } else {
      setValue(-1); // No tab selected for other pages
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCartOpen = () => {
    navigate("/layout/shoppingcart");
  };
  const handleFavoritesOpen = () => {
    navigate("/layout/favoritepage");
  };

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
        <Toolbar variant="dense">
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: isMobile ? 0 : 4,
              flexGrow: isMobile ? 1 : 0,
              textAlign: isMobile ? "center" : "left",
              cursor: "pointer",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
            onClick={() => navigate("/layout/home")}
          >
            BUYNWELL
          </Typography>
          {!isMobile ? (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                sx={{ minHeight: "auto" }}
                TabIndicatorProps={{ style: { backgroundColor: "rgb(226, 190, 27)", color: "#fff" } }}
              >
                <Tab label="Home" sx={{ fontSize: "12px", minHeight: "48px", color: value === 0 ? "rgb(226, 190, 27)" : "#fff" }} onClick={() => navigate("/")} />
                <Tab label="Products" sx={{ fontSize: "12px", minHeight: "48px", color: value === 1 ? "rgb(226, 190, 27)" : "#fff" }} onClick={() => navigate("/layout/allproducts")} />
              </Tabs>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }} />
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {profileData?.role === "admin" && (
              <>
                <CustomButton
                  label="Add Product"
                  variant="text"
                  color="inherit"
                  sx={{ fontSize: "12px" }}
                  onClick={() => navigate("/layout/addproduct")}
                />
                <Tooltip title="Dashboard">
                  <IconButton
                    color="inherit"
                    sx={{ fontSize: "12px" }}
                    onClick={() => navigate("/layout/dashboard")}
                  >
                    <Dashboard />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <IconButton sx={{ color: "#fff" }} onClick={handleCartOpen}>
              <Badge badgeContent={totalCartItems} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: "#fff" }} onClick={handleFavoritesOpen}>
              <Badge badgeContent={favoriteProducts.length} color="primary">
                <FavoriteBorder />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={() => setProfileDrawerOpen(true)} sx={{ p: 1 }}>
                  <Avatar sx={{ height: "30px", width: "30px" }} alt="User Avatar" src={profileData?.profileUrl || ""} />
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
                <CustomButton label="Login" variant="text" sx={{ color: "inherit", fontSize: "12px" }} onClick={() => navigate("/login")} />
                <CustomButton label="Sign Up" color="#fff" variant="outlined" sx={{ backgroundColor: "rgb(226, 190, 27)", color: "rgb(30, 11, 51)", border: "none", fontSize: "12px", p: 0.5 }} onClick={() => navigate("/register")} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={profileDrawerOpen}
        onClose={() => setProfileDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 350,
            backgroundColor: '#fff',
            color: '#333',
          },
        }}
      >
        <Profile
          handleLogout={handleLogout}
          userData={profileData}
        />
      </Drawer>

      <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => {
              if (setting === "Logout") {
                handleLogout();
              } else if (setting === "Profile") {
                navigate("/profile");
              }
              handleCloseUserMenu();
            }}
          >
            {setting}
          </MenuItem>
        ))}
      </Menu>
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { backgroundColor: "#333", color: '#fff', width: 240 } }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>BUYNWELL</Typography>
        </Box>
        <List>
          {[
            { text: "Home", path: "/layout/home" },
            { text: "Products", path: "/layout/allproducts" },
            { text: "Cart", path: "/layout/shoppingcart" },
            { text: "Wishlist", path: "/layout/favoritepage" },
          ].map((item) => (
            <ListItem key={item.text} onClick={() => { navigate(item.path); setMobileOpen(false); }}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {profileData?.role === "admin" && (
            <>
              <ListItem onClick={() => { navigate("/layout/addproduct"); setMobileOpen(false); }}>
                <ListItemText primary="Add Product" />
              </ListItem>
              <ListItem onClick={() => { navigate("/layout/dashboard"); setMobileOpen(false); }}>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
