import { Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/commonComponents/customCards/ProductCard";
import CategoryCircleCard from "../../components/commonComponents/customCards/CategoryCircleCard";
import { Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store/store";
import { getAllProductList, getProductCategoryList, getProductCById } from "../../state/action/product";
import { Carousel } from "primereact/carousel";
import banner5 from "../../assets/image/banner/banner5.jpg"
import banner6 from "../../assets/image/banner/banner6.jpg"
import banner7 from "../../assets/image/banner/banner7.jpg"
import banner8 from "../../assets/image/banner/banner8.jpg"
const Home = () => {
  const [seeAll, setSeeAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const productDetails = useSelector((state: RootState) => state.productData?.allProductList) || [];
  // const productCategoryList = useSelector((state: RootState) => state.productData?.productCategoryList) || [];
  const uniqueCategories = Array.from(
    new Map(
      productDetails.map((product: any) => [product.category, { category: product.category, thumbnail: product.thumbnail }])
    ).values()
  );
  const displayedCategories = seeAll ? uniqueCategories : uniqueCategories.slice(0, 7);
  console.log(displayedCategories);
  const favorites = useSelector((state: RootState) => state.productData.isFavorited);
  const offerBanner = [
    { image: banner5 },
    { image: banner6 },
    { image: banner7 },
  ]
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 4, numScroll: 4 },
    { breakpoint: "768px", numVisible: 2, numScroll: 2 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];
  const handleProductCardClick = (item: any) => {
    console.log(item);
    dispatch(getProductCById(item));
    navigate("/layout/productdetail");
  };
  useEffect(() => {
    dispatch(getAllProductList());
    dispatch(getProductCategoryList());
  }, [])
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundImage: `url(${banner8})`,
              width: "100%",
              height: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper sx={{
              display: "flex",
              alignItems: "center",
              paddingX: 2,
              paddingY: 1,
              width: 600,
            }}
            >
              <Search />
              <InputBase placeholder="Search Products, Categories..." sx={{ flex: 1, marginLeft: 1 }} />
            </Paper>
          </Box>
        </Grid>
        {/* Categories Section */}
        <Grid item xs={12}>
          <Grid container spacing={2} columns={14} sx={{ display: 'flex', justifyContent: 'center' }}>
            {displayedCategories.map((c: any) => (
              <Grid item xs={6} sm={4} md={2}>
                <CategoryCircleCard
                  categoryName={c.category}
                  categoryImage={c.thumbnail}
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
            <Grid item xs={12}>
              <Carousel
                value={productDetails}
                numVisible={4}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                itemTemplate={(product) => (
                  <ProductCard
                    productName={product?.title}
                    productDescription={product?.description}
                    productImage={product?.images[0]}
                    productPrice={product?.price}
                    productRating={product?.rating}
                    showTrending={true}
                    isFavorited={favorites[product.id] || false}
                    onClick={() => handleProductCardClick(product)}
                    originalPrice={product.price / (1 - (product.discountPercentage / 100))}
                    discount={product.discountPercentage} />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} marginTop={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={10}>
              <Carousel
                value={offerBanner}
                numVisible={1}
                numScroll={1}
                autoplayInterval={3000}
                itemTemplate={(banner) => (
                  <Card>
                    <CardMedia
                      component="img"
                      image={banner.image}
                      alt={`banner`}
                    />
                  </Card>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} marginTop={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{
                color: "#333",
                fontWeight: "bold",
                mx: 4,
                textAlign: 'left'
              }}>Most Popular Products</Typography>
            </Grid>
            <Grid item xs={12}>
              <Carousel
                value={productDetails}
                numVisible={4}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                itemTemplate={(product) => (
                  <ProductCard
                    productName={product?.title}
                    productDescription={product?.description}
                    productImage={product?.images[0]}
                    productPrice={product?.price}
                    productRating={product?.rating}
                    // showTrending={true}
                    // handleFavoriteChange={() => handleFavoriteChange()}
                    isFavorited={product?.favorite}
                    onClick={() => handleProductCardClick(product)}
                    originalPrice={product.price / (1 - (product.discountPercentage / 100))}
                    discount={product.discountPercentage} />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
