import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartStore";
import phonesReducer from "./phonesStore";

const storeReducer = combineReducers({
  phones: phonesReducer,
  cart: cartReducer,
});

export function createStore() {
  return configureStore({
    reducer: storeReducer,
  });
}
