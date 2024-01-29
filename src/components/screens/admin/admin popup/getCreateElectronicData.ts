import {
  IElectronicCreate,
  IElectronicCreateForm,
} from "@/types/electronic.type";

export const getCreateElectronicData = (
  arg: IElectronicCreateForm,
  path: string
): IElectronicCreate => {
  const response: IElectronicCreate = {
    name: arg.name,
    path,
    price: Number(arg.price),
    shelfLife: String(Date.parse(arg.shelfLife)),
  };
  return response;
};
