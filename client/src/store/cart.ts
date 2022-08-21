import { IInitialStateCart, IPhone, IStoreState } from "../types/index";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: IInitialStateCart = {
  cartStore: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    phonesAddCart: (state, action) => {
      const check = state.cartStore.find((p) => p._id === action.payload._id);
      if (check) {
        check.count < 2
          ? (check.count += 1)
          : toast.error("Максимум 2-ве единицы одного товара", { position: "top-center", autoClose: 2000 });
      } else {
        state.cartStore.push(action.payload);
      }
    },
    phonesIncreaseItemCart: (state, action) => {
      const item = state.cartStore.find((p) => p._id === action.payload);
      item.count < 2
        ? (item.count += 1)
        : toast.error("Максимум 2-ве единицы одного товара", { position: "top-center", autoClose: 2000 });
    },
    phonesDecreaseItemCart: (state, action) => {
      const item = state.cartStore.find((p) => p._id === action.payload);
      item.count -= 1;
      if (item.count === 0) {
        state.cartStore = state.cartStore.filter((p) => p._id !== action.payload);
      }
    },
    phonesRemoveCart: (state, action) => {
      state.cartStore = state.cartStore.filter((p) => p._id !== action.payload);
    },
    phonesClearCart: (state) => {
      state.cartStore = [];
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;
const { phonesAddCart, phonesRemoveCart, phonesIncreaseItemCart, phonesDecreaseItemCart, phonesClearCart } = actions;

export const cartAddPhone = (payload) => async (dispatch) => {
  dispatch(phonesAddCart(payload));
};

export const cartIncreaseCountItem = (payload) => async (dispatch) => {
  dispatch(phonesIncreaseItemCart(payload));
};

export const cartDecreaseCountItem = (payload) => async (dispatch) => {
  dispatch(phonesDecreaseItemCart(payload));
};

export const cartRemovePhone = (payload: string) => (dispatch: (arg0: { payload: IPhone; type: string }) => void) => {
  dispatch(phonesRemoveCart(payload));
};

export const cartClear = () => async (dispatch) => {
  dispatch(phonesClearCart());
};

export const getCartItems = () => (state: IStoreState) => state.cart.cartStore;

export default cartReducer;
