"use client";
import { FC, MouseEvent, useState } from "react";
import styles from "./profileDetail.module.scss";
import { IUser } from "@/types/user.type";
import { IOrder } from "@/types/order.type";
import { imageLik } from "@/util/imageLinkHalper";
import Link from "next/link";
import { GetData } from "@/util/Date.heper";
import { formatPrice } from "@/util/formatPrice";
import ModalProfile from "../modal/ModalProfile";

type TProfileOrder = {
  user: IUser;
  order: IOrder;
};
const ProfileOrder: FC<TProfileOrder> = ({ order, user }) => {
  const [modal, setModal] = useState<boolean>(false);
  const detail = () => {
    setModal(!modal);
  };
  const getModal = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest("#item")) {
      document.body.style.overflow = "auto";
      setModal(!modal);
    }
  };
  return (
    <>
      {modal && <ModalProfile order={order} setModal={setModal} />}
      <div className={styles.orders__item}>
        <div className={styles.orders__row}>
          {order.invitationInfo
            ? order.invitationInfo.map((el) => (
                <div key={el.cardId} className={styles.oredr__column}>
                  <Link
                    href={"/card/" + el.cardId}
                    className={styles.orders__img}
                  >
                    <img src={imageLik(el.cardImage[0])} alt="" />
                  </Link>
                </div>
              ))
            : ""}
        </div>
        <div className={styles.orders__body}>
          <div className={styles.orders__ordersD}>
            Время заказа {GetData(+order.createdAt)}
          </div>
          <div className={styles.orders__status}>{order.status}</div>
          <div className={styles.orders__number}>№: {order.payment_id}</div>
          <div className={styles.orders__price}>
            {formatPrice(order.orderPrice)} Сум
          </div>
          <button
            type="button"
            onClick={detail}
            className={styles.orders__detail}
          >
            Детали
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileOrder;
