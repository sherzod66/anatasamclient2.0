import { IconType } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { LuSearch, LuShoppingBag } from "react-icons/lu";

type TNavigation = {
  path: string;
  icon: IconType;
  name: string;
};

export const navigationList: TNavigation[] = [
  {
    path: "/search",
    icon: LuSearch,
    name: "Поиск",
  },
  {
    path: "/basket",
    icon: LuShoppingBag,
    name: "Корзина",
  },
  {
    path: "/profile",
    icon: FaRegUser,
    name: "Профиль",
  },
];
