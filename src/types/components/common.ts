export interface IListServerResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  data: T;
}

export type THandleFilterInputChange = (
  name: string,
  value: string | number | null | boolean | string[]
) => void;

export interface ISelectOption {
  value: string;
  label: string;
}

export type TSelectValue = ISelectOption | ISelectOption[] | null | undefined;
