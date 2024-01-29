export interface IElectronic {
  id: number;
  createdAt: string;
  updatedAt: Date;
  name: string;
  viewing: number;
  path: string;
  price: number;
  shelfLife: string;
}

export interface IElectronicCreate
  extends Omit<IElectronic, "id" | "createdAt" | "updatedAt" | "viewing"> {}

export interface IElectronicCreateForm
  extends Omit<
    IElectronic,
    "id" | "createdAt" | "updatedAt" | "viewing" | "path"
  > {
  file: FileList;
}

export interface electronicDataType {
  key: React.Key;
  name: string;
  createdAt: string;
  viewing: string;
  price: number;
}

export interface IElectronicKey {
  key: number;
  id: number;
  createdAt: string;
  updatedAt: Date;
  name: string;
  viewing: number;
  path: string;
  price: number;
  shelfLife: string;
}
