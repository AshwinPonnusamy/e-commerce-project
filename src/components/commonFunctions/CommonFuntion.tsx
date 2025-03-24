import { addProductToCart, removeProductFromCart } from "../../state/action/product";

export const handleAddCart = (product: any) => (dispatch: any, getState: any) => {
    const cartItems = getState().productData.cartItems;
    const isInCart = cartItems.some((item: any) => item.id === product.id);
  
    if (isInCart) {
      dispatch(removeProductFromCart(product.id));
    } else {
      dispatch(addProductToCart(product));
    }
  };
  