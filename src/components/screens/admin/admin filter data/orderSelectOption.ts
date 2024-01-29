import { SelectProps } from "antd";

export const orderSelectOption: SelectProps["options"] = [
  { label: "All", value: "ALL" },
  { label: "PENDING", value: "PENDING" },
  { label: "IN PROGRESS", value: "IN_PROGRESS" },
  { label: "CAN BE PICKED UP", value: "CAN_BE_PICKED_UP" },
  { label: "TOOK", value: "TOOK" },
];
