"use client";
import { FC, useState } from "react";
import styles from "./basketAuth.module.scss";
import Auth from "../../profile/authPage/Auth";
const BasketAuth: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isOpen && <Auth setIsOpen={setIsOpen} />}
      <div className={styles.basketAuth}>
        <div className={styles.basketAuth__body}>
          <h2>Чтобы добовлять товары в корзины для начала Авторизуйтесь</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.basketAuth__button}
            type="button"
          >
            Авторизация
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketAuth;
