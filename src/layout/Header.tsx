import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Avatar, Menu, MenuItem, Tooltip, Badge, useMediaQuery, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [isLoggedIn] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);
  const favoriteProducts = useSelector((state: RootState) =>
    state.productData.allProductList.filter((product: any) => state.productData.isFavorited[product.id])
);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const settings = ["Profile", "Logout"];
  const isMobile = useMediaQuery("(max-width:768px)");

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
  const handleFavoritesOpen = () => {
    navigate("/layout/favoritepage");
  };

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 , p:2}}>
      <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
        <Toolbar variant="dense">
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: isMobile ? "center" : "left" }}>
            BUYNWELL
          </Typography>
          {!isMobile ? (
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "start" }}>
              <Tabs value={value} onChange={handleChange} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: "rgb(226, 190, 27)", color: "#fff" } }}>
                <Tab label="Home" sx={{ fontSize: "12px", color: value === 0 ? "rgb(226, 190, 27)" : "#fff" }} onClick={() => navigate("/")} />
                <Tab label="Products" sx={{ fontSize: "12px", color: value === 1 ? "rgb(226, 190, 27)" : "#fff" }} onClick={() => navigate("/layout/allproducts")} />
              </Tabs>
            </Box>
          ) : null}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar sx={{ height: "30px", width: "30px" }} alt="User Avatar" />
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
                <Button sx={{ color: "inherit", fontSize: "12px" }} onClick={() => navigate("/login")}>Login</Button>
                <Button color="inherit" variant="outlined" sx={{ backgroundColor: "rgb(226, 190, 27)", color: "rgb(30, 11, 51)", border: "none", fontSize: "12px", padding: "0 10px" }} onClick={() => navigate("/signup")}>Sign Up</Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            {setting}
          </MenuItem>
        ))}
      </Menu>
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { backgroundColor: "#333", color:'#fff' } }}>
        <List>
          {["Home", "Products", "About", "Contact"].map((text, index) => (
            <ListItem  key={text} onClick={() => { navigate(["/", "/layout/allproducts", "/about", "/contact"][index]); setMobileOpen(false); }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
