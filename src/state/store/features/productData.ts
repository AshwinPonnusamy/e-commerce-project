import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartItem {
  discountPercentage: number;
  availabilityStatus: string;
  description: string;
  rating: number | null | undefined;
  title: string;
  stock: number;
  images: any;
  image: string | undefined;
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}
export interface ProductData {
  allProductList: any;
  productCategoryList: any;
  currentProduct: any;
  isFavorited: { [key: string]: boolean };
  open: boolean;
  cartItems: CartItem[];
}
const initialState: ProductData = {
  allProductList: [],
  productCategoryList: [],
  currentProduct: [],
  isFavorited: {},
  open: false,
  cartItems: [],
};
export const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setAllProductList: (state, action: PayloadAction<any>) => {
      state.allProductList = action.payload;
    },
    setProductCategoryList: (state, action: PayloadAction<any>) => {
      state.productCategoryList = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<any>) => {
      state.currentProduct = action.payload;
    },
    setIsFavorited: (state, action: PayloadAction<{ productId: string; isFavorited: boolean }>) => {
      const { productId, isFavorited } = action.payload;
      state.isFavorited[productId] = isFavorited;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
  },
});
export const {
  setAllProductList,
  setProductCategoryList,
  setCurrentProduct,
  setIsFavorited,
  setOpen,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} = productSlice.actions;
export default productSlice.reducer;
