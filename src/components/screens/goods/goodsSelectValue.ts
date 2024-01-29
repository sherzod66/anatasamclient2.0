import { SelectProps } from "antd";

export const goodsSelect: SelectProps["options"] = [
  { value: "price-from-high-to-low", label: "Цена от высокой к низкой" },
  { value: "price-from-low-to-high", label: "Цена от низкой к высокой" },
];

export const changeBreadcrumbValue = (arg: string | string[]): string => {
  if (arg === "wedding") return "wedding";
  else if (arg === "sunnat") return "sunnat";
  else if (arg === "congratulatory") return "congratulatory";
  else if (arg === "anniversary") return "anniversary";
  else return "";
};
