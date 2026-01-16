import { Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardMedia,
  InputBase,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/commonComponents/customCards/ProductCard";
import CategoryCircleCard from "../../components/commonComponents/customCards/CategoryCircleCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store/store";
import {
  getAllProductList,
  getProductCategoryList,
} from "../../state/action/product";
import { Carousel } from "primereact/carousel";
import banner5 from "../../assets/image/banner/banner5.jpg";
import banner6 from "../../assets/image/banner/banner6.jpg";
import banner7 from "../../assets/image/banner/banner7.jpg";
import banner8 from "../../assets/image/banner/banner8.jpg";
import { handleAddCart, handleProductCardClick, handleSearch, toggleFavorite } from "../../components/commonFunctions/CommonFunctions";
import CustomButton from "../../components/commonComponents/button/CustomButton";
import { Product } from "../../state/store/features/productData";

const Home = () => {
  const [seeAll, setSeeAll] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const searchQuery = useSelector((state: RootState) => state.productData.searchQuery);
  const searchResults = useSelector((state: RootState) => state.productData.searchProductList || []);
  const productDetails: Product[] = useSelector(
    (state: RootState) => state.productData?.allProductList || []
  );
  const displayedProducts = viewMore ? productDetails : productDetails.slice(0, 10);
  const uniqueCategories = Array.from(
    new Map(
      productDetails.map((product) => [
        product.category,
        { category: product.category, thumbnail: product.thumbnail },
      ])
    ).values()
  );

  const displayedCategories = seeAll
    ? uniqueCategories
    : uniqueCategories.slice(0, 7);

  const favorites = useSelector(
    (state: RootState) => state.productData.isFavorited
  );

  const offerBanner = [{ image: banner5 }, { image: banner6 }, { image: banner7 }];

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 4, numScroll: 4 },
    { breakpoint: "768px", numVisible: 2, numScroll: 2 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const cartItems = useSelector((state: RootState) => state.productData.cartItems);

  useEffect(() => {
    dispatch(getAllProductList() as any);
    dispatch(getProductCategoryList() as any);
  }, [dispatch]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              backgroundImage: `url(${banner8})`,
              width: "100%",
              height: { xs: 250, md: 350 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Paper sx={{
              display: "flex",
              alignItems: "center",
              paddingX: 2,
              paddingY: 1,
              width: { xs: '90%', sm: 600 },
              borderRadius: 2
            }}
            >
              <Search />
              <InputBase placeholder="Search Products..." sx={{ flex: 1, marginLeft: 1 }} onChange={(e) => handleSearch(e.target.value, dispatch)} />
            </Paper>
          </Box>
        </Grid>
        {/* Categories Section */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2, fontWeight: 'bold' }}>Explore Categories</Typography>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              {displayedCategories.map((c) => (
                <Grid size={{ xs: 4, sm: 3, md: 1.7 }} key={c.category}>
                  <CategoryCircleCard
                    categoryName={c.category}
                    categoryImage={c.thumbnail}
                    onClick={() => navigate(`/layout/allproducts?category=${c.category}`)}
                  />
                </Grid>
              ))}
            </Grid>
            {uniqueCategories.length > 7 && (
              <Box sx={{ textAlign: "center", mt: 1 }}>
                <CustomButton
                  label={seeAll ? "See Less" : "See All"}
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  variant="text"
                  onClick={() => setSeeAll(!seeAll)}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h5" sx={{
              color: "#333",
              fontWeight: "bold",
              mb: 3,
              textAlign: 'left'
            }}>Today&apos;s Trending Deals</Typography>
            <Grid container spacing={3}>
              {(searchQuery ? searchResults : displayedProducts).map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <ProductCard
                    key={product?.id}
                    productName={product?.title}
                    productDescription={product?.description}
                    productImage={product?.images[0]}
                    productPrice={product?.price}
                    productRating={product?.rating}
                    showTrending={true}
                    isFavorited={favorites[product?.id] || false}
                    onClick={() => handleProductCardClick(product, dispatch, navigate)}
                    handleAddCart={() => dispatch(handleAddCart(product) as any)}
                    isInCart={cartItems.some((item) => item.id === product.id)}
                    originalPrice={product.price / (1 - (product.discountPercentage / 100))}
                    onFavoriteClick={() => toggleFavorite(dispatch, product.id, favorites[product.id])}
                    discount={product.discountPercentage}
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              {displayedProducts.length >= 5 && (
                <CustomButton
                  label={viewMore ? "View Less" : "View More"}
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  variant="text"
                  onClick={() => setViewMore(!viewMore)}
                />
              )}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
              <Grid size={{ xs: 12, md: 10 }}>
                <Carousel
                  value={offerBanner}
                  numVisible={1}
                  numScroll={1}
                  autoplayInterval={3000}
                  showNavigators={false}
                  itemTemplate={(banner) => (
                    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={banner.image}
                        alt={`banner`}
                        sx={{ height: { xs: 200, sm: 300, md: 400 }, objectFit: 'cover' }}
                      />
                    </Card>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h5" sx={{
              color: "#333",
              fontWeight: "bold",
              mb: 3,
              textAlign: 'left'
            }}>Most Popular Products</Typography>
            <Carousel
              value={productDetails}
              numVisible={5}
              numScroll={4}
              responsiveOptions={responsiveOptions}
              itemTemplate={(product) => (
                <Box sx={{ p: 1 }}>
                  <ProductCard
                    productName={product?.title}
                    productDescription={product?.description}
                    productImage={product?.images[0]}
                    productPrice={product?.price}
                    productRating={product?.rating}
                    isFavorited={favorites[product?.id]}
                    onClick={() => handleProductCardClick(product, dispatch, navigate)}
                    handleAddCart={() => dispatch(handleAddCart(product) as any)}
                    isInCart={cartItems.some((item) => item.id === product.id)}
                    originalPrice={product.price / (1 - (product.discountPercentage / 100))}
                    discount={product.discountPercentage}
                    onFavoriteClick={() => toggleFavorite(dispatch, product.id, favorites[product.id])}
                  />
                </Box>
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
