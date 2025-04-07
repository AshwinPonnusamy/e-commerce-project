import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../store/features/productData'
import authReducer from '../store/features/authData'
import userReducer from '../store/features/userData'

export const store = configureStore({
  reducer: {
    authData: authReducer,
    userData: userReducer,
    productData: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch