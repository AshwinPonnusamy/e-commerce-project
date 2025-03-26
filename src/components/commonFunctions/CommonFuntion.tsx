import { NavigateFunction } from "react-router-dom";
import { addProductToCart, getProductCById, removeProductFromCart } from "../../state/action/product";
import { AppDispatch } from "../../state/store/store";

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
    dispatch(getProductCById(item));
    navigate("/layout/productdetail");
  };