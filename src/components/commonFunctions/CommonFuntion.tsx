import { NavigateFunction } from "react-router-dom";
import { addProductToCart, getProductById, removeProductFromCart } from "../../state/action/product";
import { AppDispatch } from "../../state/store/store";
import { setIsFavorited } from "../../state/store/features/productData";

export const handleAddCart = (product: any) => (dispatch: any, getState: any) => {
    const cartItems = getState().productData.cartItems;
    const isInCart = cartItems.some((item: any) => item.id === product.id);
  
    if (isInCart) {
      dispatch(removeProductFromCart(product.id));
    } else {
      dispatch(addProductToCart(product));
    }
  };
  
  export const handleProductCardClick = (item: any, dispatch: AppDispatch, navigate: NavigateFunction) => {
    console.log("Selected Product:", item);
    dispatch(getProductById(item));
    navigate("/layout/productdetail");
  };

  export const toggleFavorite = (dispatch: AppDispatch, productId: number, isFavorited: boolean) => {
    dispatch(setIsFavorited({ productId, isFavorited: !isFavorited }));
};