import { IElectronic, IElectronicKey } from "@/types/electronic.type";
import { GetData } from "@/util/Date.heper";

export const refactorData = (
  globalDate: IElectronic[] | undefined
): IElectronicKey[] => {
  if (globalDate) {
    const refactorData: IElectronicKey[] = globalDate.map((elem) => ({
      ...elem,
      createdAt: GetData(+elem.createdAt),
      shelfLife: GetData(+elem.shelfLife),
      key: elem.id,
    }));
    return refactorData;
  }
  return [];
};
