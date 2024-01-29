import { ILocalBasket } from "@/types/localStorage.type";

export const countBasketPrice = (arg: ILocalBasket[]): number => {
  let price = 0;
  for (let index = 0; index < arg.length; index++) {
    price += arg[index].cardPrice * arg[index].orderQuantity;
  }
  return price;
};
