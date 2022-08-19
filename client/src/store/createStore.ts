import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import cartReducer from "./cart";
import phonesReducer from "./phones";
import ordersReducer from "./orders";

const storeReducer = combineReducers({
  users: userReducer,
  phones: phonesReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export function createStore() {
  return configureStore({
    reducer: storeReducer,
  });
}
