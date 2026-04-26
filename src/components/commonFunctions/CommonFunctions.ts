import { NavigateFunction } from "react-router-dom";
import { addProductToCart, changeCartQuantity, getProductById, removeProductFromCart } from "../../state/action/product";
import { AppDispatch, RootState } from "../../state/store/store";
import { CartItem, Product } from "../../state/store/features/productData";

export const handleAddCart = (product: Product) => (dispatch: AppDispatch, getState: () => RootState) => {
  const cartItems = getState().productData.cartItems;
  const isInCart = cartItems.some((item: CartItem) => item.id === product.id);

  if (isInCart) {
    dispatch(removeProductFromCart(product.id));
  } else {
    dispatch(addProductToCart(product));
  }
};

export const handleBuyNow = (product: Product, dispatch: AppDispatch, getState: () => RootState, navigate: NavigateFunction) => {
  const cartItems = getState().productData.cartItems;
  const isInCart = cartItems.some((item: CartItem) => item.id === product.id);

  if (!isInCart) {
    dispatch(addProductToCart(product));
  }
  navigate("/layout/shoppingcart");
};

export const handleProductCardClick = (item: Product, dispatch: AppDispatch, navigate: NavigateFunction) => {
  console.log("Selected Product:", item);
  dispatch(getProductById(item as { id: string | number }));
  navigate(`/layout/productdetail/${item.id}`);
};

// quantity control

export const handleIncrease = (id: number | string, dispatch: AppDispatch, cartItems: CartItem[]) => {
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    dispatch(changeCartQuantity(id, item.quantity + 1));
  }
};

export const handleDecrease = (id: number | string, dispatch: AppDispatch, cartItems: CartItem[]) => {
  const item = cartItems.find((item) => item.id === id);
  if (item && item.quantity > 1) {
    dispatch(changeCartQuantity(id, item.quantity - 1));
  }
};

export const handleRemove = (id: number | string, dispatch: AppDispatch) => {
  dispatch(removeProductFromCart(id));
};