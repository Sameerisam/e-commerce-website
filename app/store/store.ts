// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import addToCartSlice from "./slices/add_To_Cart/page";
import searchSlice from "./slices/searching/page";
import userSlice from "./slices/usersSlice/page"

// Combine all reducers
const rootReducer = combineReducers({
  addToCart: addToCartSlice,
  searching: searchSlice,
  user:userSlice
  
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["addToCart", "user"],
};

// Wrap combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Types (for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
