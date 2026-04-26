import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  returnPolicy?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductData {
  searchProductList: Product[];
  allProductList: Product[];
  productCategoryList: string[];
  currentProduct: Product | null;
  isFavorited: { [key: string]: boolean };
  open: boolean;
  cartItems: CartItem[];
  searchQuery: string;
}
const initialState: ProductData = {
  searchProductList: [],
  allProductList: [],
  productCategoryList: [],
  currentProduct: null,
  isFavorited: {},
  open: false,
  cartItems: [],
  searchQuery: "",
};

export const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    setSearchProductList: (state, action: PayloadAction<{ list: Product[]; query: string }>) => {
      state.searchProductList = Array.isArray(action.payload.list) ? action.payload.list : [];
      state.searchQuery = action.payload.list.length > 0 ? action.payload.query : "";
    },
    setAllProductList: (state, action: PayloadAction<Product[]>) => {
      state.allProductList = action.payload;
    },
    setProductCategoryList: (state, action: PayloadAction<string[]>) => {
      state.productCategoryList = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    setIsFavorited: (state, action: PayloadAction<{ productId: number | string; isFavorited: boolean }>) => {
      state.isFavorited[action.payload.productId] = action.payload.isFavorited;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: number | string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
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
  clearCart,
  setSearchProductList
} = productSlice.actions;
export default productSlice.reducer;
