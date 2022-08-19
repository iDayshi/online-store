/* eslint-disable array-callback-return */
import { IActionsFilter, IFilter, IInitialStatePhones, IOptions, IPhone, IStoreState } from "../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import phonesService from "../service/phone.service";

const initialState: IInitialStatePhones = {
  entities: null,
  initialStatePhones: null,
  filterConfig: {
    brand: [],
    typeDisplay: [],
    type: [],
  },
  isLoading: true,
  error: null,
  isFiltered: false,
};

const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    phonesRequested: (state) => {
      state.isLoading = true;
    },
    phonesReceved: (state, actions) => {
      state.entities = actions.payload;
      state.initialStatePhones = actions.payload;
      state.isLoading = false;
    },
    phonesRequestFieled: (state, actions) => {
      state.error = actions.payload;
      state.isLoading = false;
    },
    phonesFilteredAdd: (state, actions: PayloadAction<IOptions>) => {
      state.isFiltered = true;
      if (actions.payload.checked) {
        state.filterConfig[actions.payload.name as keyof IFilter].push(actions.payload.value);
      } else {
        state.filterConfig[actions.payload.name as keyof IFilter] = state.filterConfig[
          actions.payload.name as keyof IFilter
        ].filter((p: string) => p !== actions.payload.value);
      }
    },
    phonesFilteredBrand: (state) => {
      const nameFilter = Object.keys(state.filterConfig);

      const countParamFilters = nameFilter.reduce((acc, curr) => {
        return acc + state.filterConfig[curr as keyof IFilter].length;
      }, 0);

      let arr: Array<IPhone> = [];
      const arrState: Array<IPhone> = [];

      if (countParamFilters) {
        for (let n = 0; n < nameFilter.length; n++) {
          const element = nameFilter[n];
          if (element.length) {
            for (let i = 0; i < state.filterConfig[element as keyof IFilter].length; i++) {
              const filterName = state.filterConfig[element as keyof IFilter][i];
              if (n > 0 && arr.length) {
                arr.forEach((p) => {
                  if (filterName === p[element as keyof IFilter]) {
                    arrState.push(p);
                  }
                });
              } else {
                initialState.entities.forEach((p) => {
                  if (filterName === p[element as keyof IFilter]) {
                    arr.push(p);
                  }
                });
              }
            }
          }
          if (arrState.length) {
            arr = [...arrState];
            arrState.length = 0;
          }
        }
        state.entities = arr;
      } else {
        state.entities = initialState.entities;
      }
    },
    phonesSorted: (state, actions: IActionsFilter) => {
      if (actions.payload.name === "name") {
        actions.payload.value === "low"
          ? state.entities.sort((a, b) => (a.name[0].toLowerCase() > b.name[0].toLowerCase() ? 1 : -1))
          : state.entities.sort((a, b) => (a.name[0].toLowerCase() < b.name[0].toLowerCase() ? 1 : -1));
      } else if (actions.payload.value === "low") {
        const key = actions.payload.name;
        state.entities.sort((a, b) => a[key] - b[key]);
      } else {
        const key = actions.payload.name;
        state.entities.sort((a, b) => b[key] - a[key]);
      }
    },
    phonesSearchName: (state, actions) => {
      console.log(!actions.payload);
      if (!actions.payload) {
        console.log("тут1", actions.payload);
        state.entities = state.initialStatePhones;
      } else {
        console.log("тут2", actions.payload);
        state.entities = state.initialStatePhones.filter((phone) =>
          (phone.brand.toLowerCase() + phone.name.toLowerCase()).match(`${actions.payload.toLowerCase()}`)
        );
      }
    },
    filterPhonesReset: (state) => {
      state.entities = initialState.entities;
      state.filterConfig = {
        brand: [],
        typeDisplay: [],
        type: [],
      };
    },
  },
});

const { reducer: phonesReducer, actions } = phonesSlice;
const {
  phonesFilteredBrand,
  phonesFilteredAdd,
  phonesSorted,
  phonesSearchName,
  filterPhonesReset,
  phonesRequested,
  phonesReceved,
  phonesRequestFieled,
} = actions;

export const loadingPhonesList = () => async (dispatch) => {
  dispatch(phonesRequested());
  try {
    const { content } = await phonesService.get();
    dispatch(phonesReceved(content));
  } catch (error) {
    dispatch(phonesRequestFieled(error.message));
  }
};

export const filterPhones = (payload: IOptions) => (dispatch: (arg0: { payload: IOptions; type: string }) => void) => {
  dispatch(phonesFilteredAdd(payload));
  dispatch(phonesFilteredBrand());
};

export const sortedPhones = (payload: IOptions) => (dispatch: (arg0: { payload: IOptions; type: string }) => void) => {
  dispatch(phonesSorted(payload));
};

export const findPhones = (payload: IOptions) => (dispatch: (arg0: { payload: IOptions; type: string }) => void) => {
  dispatch(phonesSearchName(payload));
};
export const phonesFilterReset = () => (dispatch: (arg0: { payload: IOptions; type: string }) => void) => {
  dispatch(filterPhonesReset());
};

export const getPhones = () => (state: IStoreState) => state.phones.entities;
export const getPhonesById = (id: string) => (state: IStoreState) => state.phones.entities.find((p) => p._id === id);
export const getPhonesLoadingStatus = () => (state: IStoreState) => state.phones.isLoading;

export default phonesReducer;
