import { IInitialStateCart, IPhone, IStoreState } from "./../types/index";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialStateCart = {
  cartStore: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    phonesAddCart: (state, action) => {
      if (state.cartStore.length < 20) {
        state.cartStore.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cartStore));
      }
    },
    phonesRemoveCart: (state, action) => {
      state.cartStore = state.cartStore.filter((p) => p._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartStore));
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;
const { phonesAddCart, phonesRemoveCart } = actions;

export const cartAddPhone = (payload: IPhone) => (dispatch: (arg0: { payload: IPhone; type: string }) => void) => {
  dispatch(phonesAddCart(payload));
};

export const cartRemovePhone = (payload: string) => (dispatch: (arg0: { payload: IPhone; type: string }) => void) => {
  dispatch(phonesRemoveCart(payload));
};

export const getCartItems = () => (state: IStoreState) => state.cart.cartStore;

export default cartReducer;
