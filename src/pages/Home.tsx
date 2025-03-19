import { ArrowRight, Search, ControlPointOutlined } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import prod1 from "../assets/image/thumbs/prod-1.png";
import prod2 from "../assets/image/thumbs/prod-2.png";
import prod3 from "../assets/image/thumbs/prod-3.png";
import prod4 from "../assets/image/thumbs/prod-4.png";
import prod5 from "../assets/image/thumbs/prod-5.png";
import prod6 from "../assets/image/thumbs/prod-6.png";
import prod7 from "../assets/image/thumbs/prod-7.png";
import prod8 from "../assets/image/thumbs/prod-8.png";
import prod from "../assets/image/prod-4.png";
import ProductCard from "../components/commonComponents/customCards/ProductCard";
import CategoryCircleCard from "../components/commonComponents/customCards/CategoryCircleCard";
import { Button } from "@mui/joy";


const MeetOrProduct = () => {
  const [seeAll, setSeeAll] = useState(false);
  const Category = [
    { categoryName: "Electronics", categoryImage: prod1 },
    { categoryName: "TVs & Appliances", categoryImage: prod2 },
    { categoryName: "Home & Furniture", categoryImage: prod3 },
    { categoryName: "Men", categoryImage: prod4 },
    { categoryName: "Women", categoryImage: prod5 },
    { categoryName: "Sports", categoryImage: prod6 },
    { categoryName: "Health & Nutrition", categoryImage: prod7 },
    { categoryName: "Books", categoryImage: prod8 },
  ];

  const displayedCategories = seeAll ? Category : Category.slice(0, 7);


  const productDetails = [
    {
      id:1,
      name: "Product 1",
      discription: "Product title that can go up to two lines",
      venue: "Venue",
      time: "00:00 AM - 00:00 PM",
      price: "INR 499",
      rating: 3.5,
      favorite: false,
    },
    {
      id:2,
      name: "Product 2",
      discription: "Product title that can go up to two lines",
      venue: "Venue",
      time: "00:00 AM - 00:00 PM",
      price: "INR 499",
      rating: 3.5,
      favorite: false,
    },
    {
      id:3,
      name: "Product 3",
      discription: "Product title that can go up to two lines",
      venue: "Venue",
      time: "00:00 AM - 00:00 PM",
      price: "INR 499",
      rating: 3.5,
      favorite: false,
    },
    {
      id:4,
      name: "Product 4",
      discription: "Product title that can go up to two lines",
      venue: "Venue",
      time: "00:00 AM - 00:00 PM",
      price: "INR 499",
      rating: 3.5,
      favorite: false,
    },
    {
      id:5,
      name: "Product 5",
      discription: "Product title that can go up to two lines",
      venue: "Venue",
      time: "00:00 AM - 00:00 PM",
      price: "INR 499",
      rating: 3.5,
      favorite: false,
    },
    {
      id:6,
      name: "Product 6",
      discription: "Product title that can go up to two lines",
      venue: "Venue",
      time: "00:00 AM - 00:00 PM",
      price: "INR 499",
      rating: 3.5,
      favorite: false,
    },
  ];

 
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const handleFavoriteChange = () => {
    setIsFavorited( !isFavorited );
  };
  


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "#6C757D",
              color: "#fff",
              textAlign: "center",
              paddingY: 6,
              width: "100%",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "10px",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "rgb(255, 166, 0)", paddingX: 14 }}
              >
                Some promotional message.
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginY={6}
            >
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingX: 2,
                  paddingY: 1,
                  width: 600,
                }}
              >
                <Search />
                <InputBase
                  placeholder="Search Products, Categories, Location..."
                  sx={{ flex: 1, marginLeft: 1 }}
                />
                <Select defaultValue="Mumbai" variant="standard">
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Bangalore">Bangalore</MenuItem>
                </Select>
              </Paper>
            </Box>
          </Box>
        </Grid>



        {/* Categories Section */}
        <Grid item xs={12}>
          <Grid container spacing={2} columns={14}>
            {displayedCategories.map((cat: any, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <CategoryCircleCard
                  categoryName={cat.categoryName}
                  categoryImage={cat.categoryImage}
                />
              </Grid>
            ))}

            {/* See All Button */}
            <Grid item xs={14} style={{ textAlign: "center", }}>
              <Button
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                variant="plain"
                onClick={() => setSeeAll(!seeAll)}
              >
                {seeAll ? "See Less" : "See All"}
              </Button>
            </Grid>
          </Grid>
        </Grid>




        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{
                color: "#333",
                fontWeight: "bold",
                mx: 4,
                textAlign: 'left'
              }}>Today&apos;s Trending Deals</Typography>
            </Grid>
            {productDetails.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard
                  productName={product?.name} 
                  productDescription={product.discription} 
                  productImage={prod} 
                  productPrice={product.price} 
                  productRating={product.rating} 
                  showTrending={true}
                  handleFavoriteChange={() => handleFavoriteChange()}
                  isFavorited={product.favorite}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Box textAlign="center" margin={3}>
              <Button
                sx={{
                  color: "#000",
                  backgroundColor: "rgb(157, 210, 253)",
                  border: "1px solid",
                  width: "100%",
                }}
              >
                Label
              </Button>
            </Box>
          </Grid>
        </Grid>






        <Container sx={{ marginTop: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "20px",
              justifyContent: "center",
              backgroundColor: "#D3D3D3",
              padding: 3,
              minHeight: "30vh",
            }}
          >
            <Box sx={{ textAlign: "left", maxWidth: "800px" }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                fontSize={20}
                color="rgb(42, 5, 49)"
              >
                Products specially curated for you!
              </Typography>
              <Typography variant="h6" fontSize={14} marginY={2}>
                Get event suggestions tailored to your interest! Don't let your
                favorite events slip away.
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: "rgb(42, 5, 49)",
                  color: "rgb(226, 190, 27)",
                  textTransform: "initial",
                }}
                onClick={() => navigate("/layout/intrest")}
              >
                Get Started <ArrowRight />
              </Button>
            </Box>
          </Box>
        </Container>

        <Container sx={{ textAlign: "left", marginTop: 6 }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Discover Best of Online Products
            </Typography>
          </Box>
          <Grid container spacing={3} marginTop={2}>
            {productDetails.map((product) => (
              <Grid item xs={12} sm={6} md={4}>
                <ProductCard
                  productName={product?.name} productDescription={product.discription} productImage={prod} productPrice={product.price} productRating={product.rating}
                />
              </Grid>
            ))}
          </Grid>
          <Box textAlign="center" margin={3}>
            <Button
              sx={{
                color: "#000",
                backgroundColor: "rgb(157, 210, 253)",
                border: "1px solid",
                width: "40%",
              }}
            >
              Label
            </Button>
          </Box>
        </Container>

        <Container sx={{ marginTop: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 4,
              justifyContent: "center",
              backgroundColor: "#D3D3D3",
              padding: 3,
              minHeight: "30vh",
            }}
          >
            <Box sx={{ textAlign: "left", maxWidth: "800px" }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                fontSize={20}
                color="rgb(42, 5, 49)"
                marginY={2}
              >
                Create an Product with (Our Site Name)
              </Typography>
              <Typography variant="h6" fontSize={14}>
                Got a show, event, activity or a great experience? Partner with
                us & get listed on (Our Site Name)
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: "rgb(245, 205, 27)",
                  color: "rgb(42, 5, 49)",
                  textTransform: "initial",
                }}
              >
                <ControlPointOutlined fontSize="small" /> Create Product
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default MeetOrProduct;
