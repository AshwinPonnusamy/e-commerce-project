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

export interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

export interface ShippingAddress {
  name: string;
  number: string;
  pincode: string;
  city: string;
  address: string;
  state: string;
  landmark?: string;
}

export interface Order {
  id: string;
  date: string;
  amount: string;
  status: "Ordered" | "In Transit" | "Delivered" | "Cancelled" | "Processing";
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  handlingFee: number;
  totalAmount: number;
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
  orders: Order[];
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
  orders: [
    {
      id: "ORD-9921",
      date: "Oct 24, 2023",
      amount: "₹4,299",
      status: "In Transit",
      items: [
        { id: "p1", name: "Premium Wireless Headphones", price: 3499, qty: 1, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
        { id: "p2", name: "Smart Watch Band", price: 800, qty: 1, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100" }
      ],
      shippingAddress: {
        name: "Alex Rivers",
        number: "+91 9876543210",
        pincode: "560001",
        city: "Bangalore",
        address: "24th Street, Premium Residency, Block C, Apt 402",
        state: "Karnataka",
        landmark: "Near Central Park"
      },
      paymentMethod: "Card Payment",
      paymentStatus: "Success",
      subtotal: 4299,
      discount: 0,
      deliveryCharges: 0,
      handlingFee: 0,
      totalAmount: 4299
    },
    {
      id: "ORD-9845",
      date: "Oct 18, 2023",
      amount: "₹1,850",
      status: "Delivered",
      items: [
        { id: "p3", name: "Luxury Scented Candle", price: 1850, qty: 1, img: "https://images.unsplash.com/photo-1603006375271-7f3b9042c943?w=100" }
      ],
      shippingAddress: {
        name: "Alex Rivers",
        number: "+91 9876543210",
        pincode: "560001",
        city: "Bangalore",
        address: "24th Street, Premium Residency, Block C, Apt 402",
        state: "Karnataka",
        landmark: "Near Central Park"
      },
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Success",
      subtotal: 1850,
      discount: 0,
      deliveryCharges: 0,
      handlingFee: 0,
      totalAmount: 1850
    }
  ]
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
    createOrder: (state, action: PayloadAction<Order>) => {
      if (!state.orders) {
        state.orders = [];
      }
      state.orders.unshift(action.payload);
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
  setSearchProductList,
  createOrder
} = productSlice.actions;
export default productSlice.reducer;
