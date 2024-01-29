"use client";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "./filter.module.scss";
import cn from "clsx";
import { GetDataString } from "@/util/Date.heper";
import { IOrder, IOrderResult } from "@/types/order.type";
import { ICard, IReportCardCount } from "@/types/card.type";
import {
  countCastPrice,
  countReportInProgress,
  countReportMade,
  countReportPrice,
} from "@/util/conunReportPrice";

type TReportProps = {
  globalOrder: IOrder[] | undefined;
  orders: IOrderResult;
  setOrders: Dispatch<SetStateAction<IOrderResult>>;
  cards: ICard[];
};
const ReportFilter: FC<TReportProps> = ({
  cards,
  globalOrder,
  orders,
  setOrders,
}) => {
  const [filterData, setFilterData] = useState<{
    first: number;
    second: number;
  }>({ first: Date.now() - 2592000000, second: Date.now() });
  useEffect(() => {
    let copyGlobalOrder: IOrder[] = globalOrder ? [...globalOrder] : [];
    let copyGlobalCards: ICard[] = cards ? [...cards] : [];
    const foundCardsId: { id: number; orderQuantity: number }[] = [];
    const coincidence = copyGlobalOrder.filter(
      (order) =>
        filterData.first < +order.createdAt &&
        filterData.second > +order.createdAt
    );
    coincidence.forEach((order) => {
      order.invitationInfo.forEach((elem) =>
        foundCardsId.push({ id: elem.cardId, orderQuantity: elem.quantity })
      );
    });
    const foundCard: IReportCardCount[] = [];
    for (let elem of foundCardsId) {
      let card = copyGlobalCards.find((card) => card.id === elem.id);
      if (card) foundCard.push({ ...card, orderQuantity: elem.orderQuantity });
    }
    setOrders((prev) => ({
      ...prev,
      orderQuantity: coincidence.length,
      totalAmount: countReportPrice(coincidence),
      netProfit: countCastPrice(foundCard),
      done: countReportMade(coincidence),
      inProgress: countReportInProgress(coincidence),
    }));
  }, [filterData]);
  return (
    <div className={cn(styles.row, styles.calendar)}>
      <div>
        <input
          onChange={(e) =>
            setFilterData((prev) => ({
              ...prev,
              first: Date.parse(e.target.value),
            }))
          }
          value={GetDataString(filterData.first)}
          type="date"
        />
      </div>
      <div>
        <input
          onChange={(e) =>
            setFilterData((prev) => ({
              ...prev,
              second: Date.parse(e.target.value),
            }))
          }
          value={GetDataString(filterData.second)}
          type="date"
        />
      </div>
    </div>
  );
};

export default ReportFilter;
