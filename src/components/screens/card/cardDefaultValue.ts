import { ICard } from "@/types/card.type";

export const cardDefaultValue: ICard = {
  castPrice: 0,
  createdAt: "",
  description: "",
  id: 0,
  imageLink: [],
  minOrderQuantity: 0,
  name: "",
  orders: 0,
  price: 0,
  quantity: 0,
  type: "",
  updatedAt: new Date(),
};
