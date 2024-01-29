import { Dispatch, SetStateAction } from "react";

export const minusCount = (
  count: string,
  setCount: Dispatch<SetStateAction<string>>,
  minOrder: number
) => {
  if (minOrder < +count) setCount(String(+count - 1));
};
export const plusCount = (
  count: string,
  setCount: Dispatch<SetStateAction<string>>,
  isQuantity: number
) => {
  if (isQuantity > +count) setCount(String(+count + 1));
};
