export type SortKeys = "price" | "date" | "name";

export interface IColors {
  name: string;
  color: string;
}

type Info = {
  infoId: string;
  value: string;
};

export interface IErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface ISortOptions {
  value?: string;
  name?: SortKeys;
  checked?: boolean;
}

export interface IOptions {
  value?: string;
  name?: string;
  checked?: boolean;
}

export interface ITarget {
  target: IOptions;
}

export interface IActionsFilter {
  type: string;
  payload: ISortOptions;
}

export interface IPhone {
  _id: string;
  brand: string;
  name: string;
  type: string;
  typeDisplay: string;
  date: number;
  rate: number;
  price: number;
  color: Array<IColors>;
  info: Info;
}

export interface IPhoneCart {
  _id: string;
  brand: string;
  name: string;
  type: string;
  price: number;
  count: number;
}

export interface IRadio {
  options: Array<IOptions> | Array<IColors>;
  name: string;
  onChange?: (a: IOptions) => void;
  value: string;
  label: string;
}

export interface IFilter {
  brand: Array<string>;
  typeDisplay: Array<string>;
  type: Array<string>;
}

export interface IInitialStatePhones {
  entities: Array<IPhone>;
  initialStatePhones: Array<IPhone>;
  filterConfig: IFilter;
  isFiltered: boolean;
  isLoading: boolean;
  error?: null;
}

export interface IInitialStateCart {
  cartStore: Array<IPhoneCart>;
}

export interface IStoreState {
  phones: IInitialStatePhones;
  cart: IInitialStateCart;
}
