export type THandleFilterInputChange = (
  name: string,
  value: string | number | null | boolean | string[]
) => void;

export interface ISelectOption {
  value: string;
  label: string;
}

export type TSelectValue = ISelectOption | ISelectOption[] | null | undefined;
