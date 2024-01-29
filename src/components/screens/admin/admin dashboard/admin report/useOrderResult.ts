import { useGetOrdersQuery } from "@/lib/api/orders.api";
import { IOrder, IOrderResult } from "@/types/order.type";
import { useEffect, useMemo, useState } from "react";

export const useOrderResult = () => {
  const {
    data: globalOrder,
    isLoading: orderLoading,
    isError,
  } = useGetOrdersQuery(null);
  const [orders, setOrders] = useState<IOrderResult>({
    orderQuantity: 0,
    netProfit: 0,
    totalAmount: 0,
    done: 0,
    inProgress: 0,
  });

  return useMemo(
    () => ({ globalOrder, orders, setOrders, orderLoading }),
    [globalOrder, orders, orderLoading]
  );
};
