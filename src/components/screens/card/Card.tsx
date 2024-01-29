"use client";
import { ICard } from "@/types/card.type";
import { FC, useMemo, useState } from "react";
import styles from "./card.module.scss";
import CardCarousel from "@/components/ui/card carousel/CardCarousel";
import { formatPrice } from "@/util/formatPrice";
import CountQuantity from "@/components/ui/count/Count";
import { useToggleBasket } from "@/hooks/useToggleBasket";
import Auth from "../profile/authPage/Auth";
import {
  getAllLocal,
  pushLocalStorage,
  setOrderNowLocal,
} from "@/config/localStorage.helper";
import Loader from "@/components/ui/Loader/Loader";
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/navigation";
import { Breadcrumb, message } from "antd";
import { IoMdHome } from "react-icons/io";

type TCardProps = {
  card: ICard;
};
const CardDetail: FC<TCardProps> = ({ card }) => {
  const { auth, data, handlerToggle, isOpen, setIsOpen, isLoading } =
    useToggleBasket();
  const { countBasket } = useActions();
  const [count, setCount] = useState<string>(
    card ? `${card.minOrderQuantity}` : "0"
  );
  const [focus, setFocus] = useState<boolean>(false);
  const { push } = useRouter();
  const addBasket = (id: number, price: number) => {
    if (auth.auth) {
      if (card.quantity >= +count) {
        handlerToggle({ cardId: id, token: auth.token }).then(() => {
          pushLocalStorage(id, +count, price);
          let checkLocal = getAllLocal();
          countBasket(checkLocal ? checkLocal : []);
        });
      } else {
        message.info(`В наличии: ${card.quantity} шт`);
      }
    } else {
      setIsOpen(true);
    }
  };
  const buyNow = () => {
    if (auth.auth) {
      if (card.quantity >= +count) {
        setOrderNowLocal(card, +count);
        push("/order/now");
      } else {
        message.info(`В наличии: ${card.quantity} шт`);
      }
    } else setIsOpen(true);
  };
  const isBasket = useMemo(
    () => data?.find((item) => item.id === card?.id),
    [data]
  );
  return (
    <>
      {isOpen && !auth.auth && <Auth setIsOpen={setIsOpen} />}
      <section className={styles.card}>
        <div className={styles.card__container}>
          <Breadcrumb
            style={{ fontSize: "16px", marginBottom: "50px" }}
            items={[
              {
                href: "/",
                title: <IoMdHome />,
              },
              {
                href: "/goods/all",
                title: "Пригласительные",
              },
              {
                title: `${card.name}`,
              },
            ]}
          />
          <div className={styles.card__row}>
            <div className={styles.card__column}>
              <CardCarousel image={card.imageLink} dataName={card.name} />
            </div>
            <div className={styles.card__column}>
              <p className={styles.card__heading}>{card.name}</p>
              <p className={styles.card__orders}>Заказов {card.orders}</p>
              <div className={styles.card__quantity}>
                <p>Количество:</p>
                <div className={styles.card__quantity_info}>
                  <CountQuantity
                    card={card}
                    count={count}
                    focus={focus}
                    setCount={setCount}
                    setFocus={setFocus}
                  />
                  <p>В наличии: {card.quantity}</p>
                </div>
                <p className={styles.card__min_order}>
                  Минимальное количество заказа: {card.minOrderQuantity}
                </p>
              </div>
              <div className={styles.card__price}>
                <p>Цена:</p>
                <h3>{formatPrice(card.price * +count)} Сум</h3>
              </div>
              <div className={styles.card__buy_basket}>
                <button onClick={buyNow}>Заказать</button>
                <button onClick={() => addBasket(card.id, card.price)}>
                  {isBasket ? "Удалить с корзины" : "В корзину"}
                  {isLoading && <Loader />}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.card__description}>
            <h2>Описание</h2>
            <p>{card.description}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardDetail;
