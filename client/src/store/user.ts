import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import userServisece from "../service/user.service";
import { generationAuthError } from "../utils/generationAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      adminInfo: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      adminInfo: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    userReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    userAllReceved: (state, action) => {
      state.adminInfo = action.payload;
    },
    usersRequestFieled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestedSuccess: (state, actions) => {
      state.auth = actions.payload;
      state.isLoggedIn = true;
    },
    authRequestedFailed: (state, actions) => {
      state.error = actions.payload;
    },
    userCreated: (state, actions) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(actions.payload);
    },
    userLogOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  userReceved,
  userAllReceved,
  usersRequestFieled,
  authRequestedSuccess,
  authRequestedFailed,
  userLogOut,
} = actions;

const authRequested = createAction("users/authRequested");

export const login =
  ({ payload }: { payload: { email: string; password: string } }, redirect: { (): void }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestedSuccess({ userId: data.userId }));
      redirect();
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generationAuthError(message);
        dispatch(authRequestedFailed(errorMessage));
      } else {
        dispatch(authRequestedFailed(error.message));
      }
    }
  };

export const signUp = (payload: { email: string; password: string; name: string }) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestedSuccess({ userId: data.userId }));
  } catch (error) {
    dispatch(authRequestedFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLogOut());
};

export const loadingUser = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userServisece.getCurrentUser();
    if (content.isAdmin) {
      const { content } = await userServisece.get();
      dispatch(userAllReceved(content));
    }
    dispatch(userReceved(content));
  } catch (error) {
    dispatch(usersRequestFieled(error.message));
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUser = () => (state) => state.users.entities;
export const getAuthErrors = () => (state) => state.users.error;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
