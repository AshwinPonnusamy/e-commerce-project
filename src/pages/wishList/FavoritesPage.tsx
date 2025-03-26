import { Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/commonComponents/customCards/ProductCard';
import { AppDispatch, RootState } from '../../state/store/store';
import { handleAddCart, handleProductCardClick, toggleFavorite } from '../../components/commonFunctions/CommonFuntion';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Get all products & favorite status
    // const products = useSelector((state: RootState) => state.productData.allProductList);
    const favoriteProducts = useSelector((state: RootState) =>
        state.productData.allProductList.filter(
            (product: any) => state.productData.isFavorited[product.id]
        )
    );
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);

    return (
        <>
            <Typography variant="h6" sx={{ textAlign: 'start', m: 3 }}>
                Favorited Products
            </Typography>
            <Grid container spacing={2} sx={{ p: 2 }} columns={15}>
                {favoriteProducts.length > 0 ? (
                    favoriteProducts.map((item: any) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={item.id}>
                            <ProductCard
                                productName={item?.title}
                                productDescription={item?.description}
                                productImage={item?.images[0]}
                                productPrice={item?.price}
                                productRating={item?.rating}
                                isFavorited={true}
                                onFavoriteClick={() => toggleFavorite(dispatch, Number(item.id), true)}
                                originalPrice={item.price / (1 - (item.discountPercentage / 100))}
                                discount={item.discountPercentage}
                                onClick={() => handleProductCardClick(item, dispatch, navigate)}
                                handleAddCart={() => dispatch(handleAddCart(item))}
                                isInCart={cartItems.some((cart) => cart.id === item.id)}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                        No favorites added yet.
                    </Typography>
                )}
            </Grid>
        </>
    );
};

export default FavoritesPage;
