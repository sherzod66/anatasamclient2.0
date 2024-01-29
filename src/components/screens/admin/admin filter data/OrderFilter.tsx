import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import styles from "./filter.module.scss";
import { Select } from "antd";
import { IOrder } from "@/types/order.type";
import { orderSelectOption } from "./orderSelectOption";
type TInvitationProps = {
  globalDate: IOrder[] | undefined;
  setData: Dispatch<SetStateAction<IOrder[] | undefined>>;
};
const OrderFilter: FC<TInvitationProps> = ({ globalDate, setData }) => {
  const filterData = (e: ChangeEvent<HTMLInputElement>) => {
    const copyData: IOrder[] = globalDate ? [...globalDate] : [];
    setData([
      ...copyData.filter((order) =>
        order.invitationInfo[0].luckyOnes
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ),
    ]);
  };
  const filterPaymentId = (e: ChangeEvent<HTMLInputElement>) => {
    const copyData: IOrder[] = globalDate ? [...globalDate] : [];
    setData([
      ...copyData.filter((order) => order.payment_id.includes(e.target.value)),
    ]);
  };
  const handleChangeOrder = (value: string) => {
    if (value === "ALL") {
      setData(globalDate);
    } else {
      const copyData: IOrder[] = globalDate ? [...globalDate] : [];
      setData([...copyData.filter((status) => status.status === value)]);
    }
  };
  return (
    <div className={styles.row}>
      <div>
        <input onChange={filterData} placeholder="Hero name" type="text" />
      </div>
      <div>
        <Select
          style={{ width: "100%", height: "36px" }}
          onChange={handleChangeOrder}
          placeholder="Filter by order status"
          defaultValue={"ALL"}
          options={orderSelectOption}
        />
      </div>
      <div>
        <input
          onChange={filterPaymentId}
          placeholder="Payment id"
          type="text"
        />
      </div>
    </div>
  );
};

export default OrderFilter;
