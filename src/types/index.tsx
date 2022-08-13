export type SortKeys = "price" | "date" | "name";

export interface IColors {
  name: string;
  value: string;
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

export interface IInfoPhones {
  info: string;
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
  accumulator: number;
  weight: number;
  rate: number;
  price: number;
  count: number;
  color: Array<IColors>;
  best: string;
  info: {};
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
  color: Array<string>;
  best: Array<string>;
}

export interface IInitialStatePhones {
  entities: Array<IPhone>;
  filterConfig: IFilter;
  isFiltered: boolean;
}

export interface IInitialStateCart {
  cartStore: Array<IPhone>;
}

export interface IStoreState {
  phones: IInitialStatePhones;
  cart: IInitialStateCart;
}
