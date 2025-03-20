import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../store/features/productData'

export const store = configureStore({
  reducer: {
    productData: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch