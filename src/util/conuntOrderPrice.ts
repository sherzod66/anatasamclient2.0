import { ICard } from "@/types/card.type";

export const countOrderPrice = (arg: ICard[]): number => {
  let price = 0;
  for (let index = 0; index < arg.length; index++) {
    price += arg[index].price * arg[index].quantity;
  }
  return price;
};
