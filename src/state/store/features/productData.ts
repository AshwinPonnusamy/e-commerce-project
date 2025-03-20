import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface productData {
    allProductList: any
    productCategoryList: any
}

const initialState: productData = {
    allProductList: [],
    productCategoryList: [],
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
  },
})


export const { setAllProduuctList, setProductCategoryList } = productSlice.actions

export default productSlice.reducer