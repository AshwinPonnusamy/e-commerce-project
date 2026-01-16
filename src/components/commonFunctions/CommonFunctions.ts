import { NavigateFunction } from "react-router-dom";
import { addProductToCart, changeCartQuantity, getProductById, getSearchProductList, removeProductFromCart } from "../../state/action/product";
import { AppDispatch, RootState } from "../../state/store/store";
import { CartItem, Product, setIsFavorited, setSearchProductList } from "../../state/store/features/productData";

export const handleAddCart = (product: Product) => (dispatch: AppDispatch, getState: () => RootState) => {
  const cartItems = getState().productData.cartItems;
  const isInCart = cartItems.some((item: CartItem) => item.id === product.id);

  if (isInCart) {
    dispatch(removeProductFromCart(product.id));
  } else {
    dispatch(addProductToCart(product));
  }
};

export const handleProductCardClick = (item: Product, dispatch: AppDispatch, navigate: NavigateFunction) => {
  console.log("Selected Product:", item);
  dispatch(getProductById(item as { id: string | number }));
  navigate("/layout/productdetail");
};

export const toggleFavorite = (dispatch: AppDispatch, productId: number | string, isFavorited: boolean) => {
  dispatch(setIsFavorited({ productId, isFavorited: !isFavorited }));
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

//search
export const handleSearch = (query: string, dispatch: AppDispatch) => {
  if (!query.trim()) {
    dispatch(setSearchProductList({ list: [], query: "" }));
    return;
  }
  dispatch(getSearchProductList(query) as any);
};