import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from 'redux-thunk';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./features/authData";
import userReducer from "./features/userData";
import productReducer from "./features/productData";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authData", "userData", "productData"],
};

const rootReducer = combineReducers({
  authData: authReducer,
  userData: userReducer,
  productData: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
