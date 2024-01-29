import { ICard, IReportCardCount } from "@/types/card.type";
import { IInvitationInfo } from "@/types/invitationInfo.type";
import { IOrder } from "@/types/order.type";

export const countReportPrice = (arg: IOrder[]): number => {
  const invitationInfo: IInvitationInfo[] = [];
  let price = 0;
  for (let index = 0; index < arg.length; index++) {
    invitationInfo.push(...arg[index].invitationInfo);
  }
  for (let index = 0; index < invitationInfo.length; index++) {
    price += invitationInfo[index].quantity * invitationInfo[index].cardPrice;
  }
  return price;
};

export const countCastPrice = (arg: IReportCardCount[]): number => {
  let price = 0;
  for (let index = 0; index < arg.length; index++) {
    let a = arg[index].price - arg[index].castPrice;
    price += a * arg[index].orderQuantity;
  }
  return price;
};
export const countReportMade = (arg: IOrder[]): number => {
  const count = arg.filter((item) => item.status === "TOOK");
  return count.length;
};
export const countReportInProgress = (arg: IOrder[]): number => {
  const count = arg.filter((item) => item.status === "IN_PROGRESS");
  return count.length;
};
