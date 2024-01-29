import { FC } from "react";
import styles from "./basketEmpty.module.scss";
import { BsBasket } from "react-icons/bs";
import Link from "next/link";
const EmptyBasket: FC = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.empty__body}>
        <h1>Корзина</h1>
        <p className={styles.empty__icon}>
          <BsBasket />
        </p>
        <h3>Ваша корзина пуста</h3>
        <p className={styles.empty__choice}>
          Начните подбор на главной странице или найдите нужный товар через
          поиск
        </p>
        <button type="button">
          <Link href="/">На главную</Link>
        </button>
      </div>
    </div>
  );
};

export default EmptyBasket;
