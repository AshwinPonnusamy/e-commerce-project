import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../store/features/productData'
import authReducer from '../store/features/authData'

export const store = configureStore({
  reducer: {
    authData: authReducer,
    productData: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch