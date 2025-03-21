import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface productData {
  allProductList: any;
  productCategoryList: any;
  currentProduct: any;
  isFavorited: { [key: string]: boolean };
  open: boolean;
}

const initialState: productData = {
  allProductList: [],
  productCategoryList: [],
  currentProduct: [],
  isFavorited: {},
  open: false,
}

export const productSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    setAllProduuctList: (state, action: PayloadAction<any>) => {
      state.allProductList = action.payload
    },
    setProductCategoryList: (state, action: PayloadAction<any>) => {
      state.productCategoryList = action.payload
    },
    setCurrentProduct: (state, action: PayloadAction<any>) => {
      state.currentProduct = action.payload
    },
    setIsFavorited: (state, action: PayloadAction<{ productId: string; isFavorited: boolean }>) => {
      const { productId, isFavorited } = action.payload;
      state.isFavorited[productId] = isFavorited;
    },
    setOpen: (state, action: PayloadAction<any>) => {
      state.open = action.payload
    },
  },
})


export const { setAllProduuctList, setProductCategoryList, setCurrentProduct, setIsFavorited, setOpen } = productSlice.actions

export default productSlice.reducer