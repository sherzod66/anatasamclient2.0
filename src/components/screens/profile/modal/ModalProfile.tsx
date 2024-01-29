import { Dispatch, FC, SetStateAction } from "react";
import styles from "./modal.module.css";
import { GetData } from "@/util/Date.heper";
import { IOrder } from "@/types/order.type";
import { formatPrice } from "@/util/formatPrice";
import { imageLik } from "@/util/imageLinkHalper";
type TModalProfile = {
  order: IOrder;
  setModal: Dispatch<SetStateAction<boolean>>;
};
const ModalProfile: FC<TModalProfile> = ({ order, setModal }) => {
  return (
    <div
      onClick={(e) =>
        !(e.target as HTMLElement).closest("#item") && setModal(false)
      }
      className={styles.modal}
    >
      <div id="item" className={styles.modalDetail__container}>
        <div className={styles.modalDetail__info}>
          <div className={styles.modalDetailI__column}>
            <div className={styles.modalDetail__itemInfoDate}>
              Вермя заказа: {GetData(+order.createdAt)}
            </div>
            <div className={styles.modalDetail__prepayment}>
              Оплачено: {formatPrice(order.paid)} Сум
            </div>
            <div className={styles.modalDetail__neeed}>
              Нужно доплатить: {formatPrice(order.orderPrice - order.paid)} Сум
            </div>
            <div className={styles.modalDetail__price}>
              Общаяя сумма заказа {formatPrice(order.orderPrice)} Сум
            </div>
          </div>
        </div>
        <div className={styles.modalDetail__row}>
          {order.invitationInfo
            ? order.invitationInfo.map((item) => (
                <div key={item.cardId} className={styles.modalDetail__column}>
                  <div className={styles.modalDetail__item}>
                    <div className={styles.modalDetail__img}>
                      <img src={imageLik(item.cardImage[0])} alt="Not found" />
                    </div>
                    <div className={styles.modalDetail__body}>
                      <div id="nameP" className={styles.modalDetail__rowNameP}>
                        {item.luckyOnes}
                      </div>
                      <div className={styles.modalDetail__rowQunaty}>
                        Ресторан: {item.restaurant}
                      </div>
                      <div className={styles.modalDetail__rowQunaty}>
                        С уважением: {item.family}
                      </div>
                      <div className={styles.modalDetail__rowQunaty}>
                        Количество: {item.quantity}
                      </div>
                      <div className={styles.modalDetail__rowQunaty}>
                        {item.date} в {item.time}
                      </div>
                      <div className={styles.modalDetail__itemInfoColumn}>
                        <div className={styles.comment__user}>
                          Коментарий: <p>{item.comment}</p>
                        </div>
                      </div>
                      <div className={styles.modalDetail__rowPrice}>
                        Цена: {formatPrice(item.cardPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
