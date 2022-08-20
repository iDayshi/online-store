import { createAction, createSlice } from "@reduxjs/toolkit";
import orderService from "../service/order.service";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    ordersRequested: (state) => {
      state.isLoading = true;
    },
    ordersReceved: (state, actions) => {
      state.entities = actions.payload;
      state.isLoading = false;
    },
    ordersRequestFieled: (state, actions) => {
      state.error = actions.payload;
      state.isLoading = false;
    },
    ordersCreated: (state, actions) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(actions.payload);
    },
    orderRemove: (state, actions) => {
      state.entities = state.entities.filter((o) => o._id !== actions.payload);
    },
    orderUpdateSuccessed: (state, actions) => {
      state.entities[state.entities.findIndex((u) => u._id === actions.payload._id)] = actions.payload;
    },
  },
});

const { reducer: ordersReducer, actions } = ordersSlice;
const { ordersRequested, ordersReceved, ordersRequestFieled, ordersCreated, orderRemove, orderUpdateSuccessed } =
  actions;

const createOrdersRequested = createAction("orders/ordersCreateRequested");
const createOrdersFailed = createAction("orders/createOrdersFailed");
const removeOrderRequested = createAction("orders/removeOrderRequested");
const removeOrderFailed = createAction("orders/removeOrderFailed");
const updateOrderRequested = createAction("orders/orderUpdateRequested");
const updateOrderFailed = createAction("order/userUpdateFailed");

export const loadingOrdersListUser = (userId) => async (dispatch) => {
  dispatch(ordersRequested());
  try {
    const { content } = await orderService.getOrdersUser(userId);
    dispatch(ordersReceved(content));
  } catch (error) {
    dispatch(ordersRequestFieled(error.message));
  }
};

export const loadingAllOrdersList = () => async (dispatch) => {
  dispatch(ordersRequested());
  try {
    const { content } = await orderService.getAllOrders();
    dispatch(ordersReceved(content));
  } catch (error) {
    dispatch(ordersRequestFieled(error.message));
  }
};

export const createOrder = (payload) => async (dispatch) => {
  dispatch(createOrdersRequested());
  try {
    const { content } = await orderService.createOrder(payload);
    dispatch(ordersCreated(content));
  } catch (error) {
    dispatch(createOrdersFailed());
  }
};

export const updateOrder = (payload) => async (dispatch) => {
  dispatch(updateOrderRequested());
  try {
    const { content } = await orderService.updateOrder(payload);
    dispatch(orderUpdateSuccessed(content));
  } catch (error) {
    dispatch(updateOrderFailed());
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  dispatch(removeOrderRequested());
  try {
    const { content } = await orderService.removeOrder(id);
    if (!content) {
      dispatch(orderRemove(id));
    }
  } catch (error) {
    dispatch(removeOrderFailed());
  }
};

export const getOrders = () => (state) => state.orders.entities;
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;

export default ordersReducer;
