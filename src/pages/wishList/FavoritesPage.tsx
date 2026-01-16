import { Typography, Box, Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/commonComponents/customCards/ProductCard';
import { AppDispatch, RootState } from '../../state/store/store';
import { handleAddCart, handleProductCardClick, toggleFavorite } from '../../components/commonFunctions/CommonFunctions';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Lottie from 'lottie-react';
import EmptyFavorites from '../../assets/animation/EmptyCartAnimation.json'; // Reusing empty cart if specific one not available
import { Product } from '../../state/store/features/productData';

const FavoritesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const favoriteProducts = useSelector((state: RootState) =>
        state.productData.allProductList.filter(
            (product: Product) => state.productData.isFavorited[product.id]
        )
    );
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 1.5 }}>
                <FavoriteBorderIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h4" fontWeight="bold">
                    My Wishlist
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
                    ({favoriteProducts.length} items)
                </Typography>
            </Box>

            {favoriteProducts.length > 0 ? (
                <Grid container spacing={3}>
                    {favoriteProducts.map((item: Product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                            <ProductCard
                                productName={item?.title}
                                productDescription={item?.description}
                                productImage={item?.images[0]}
                                productPrice={item?.price}
                                productRating={item?.rating}
                                isFavorited={true}
                                onFavoriteClick={() => toggleFavorite(dispatch, item.id, true)}
                                originalPrice={item.price / (1 - (item.discountPercentage / 100))}
                                discount={item.discountPercentage}
                                onClick={() => handleProductCardClick(item, dispatch, navigate)}
                                handleAddCart={() => dispatch(handleAddCart(item) as any)}
                                isInCart={cartItems.some((cart) => cart.id === item.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 10,
                        backgroundColor: '#fff',
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <Lottie
                        animationData={EmptyFavorites}
                        loop
                        style={{ width: 250, height: 250 }}
                    />
                    <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                        Your wishlist is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                        Add items you love to your wishlist to review them later.
                    </Typography>
                    <Typography
                        variant="button"
                        sx={{
                            cursor: 'pointer',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => navigate('/layout/allproducts')}
                    >
                        Continue Shopping
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default FavoritesPage;
