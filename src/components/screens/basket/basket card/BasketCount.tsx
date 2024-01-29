"use client";
import { FC, useEffect, useState } from "react";
import styles from "@/components/ui/count/count.module.scss";
import { FiMinus, FiPlus } from "react-icons/fi";
import cn from "clsx";
import { ICard } from "@/types/card.type";
import { minusCount, plusCount } from "../../card/countFunction";
import {
  editLocalBasket,
  getAllLocal,
  getLocalQuantity,
} from "@/config/localStorage.helper";
import { useActions } from "@/hooks/useActions";

type TCardProps = {
  card: ICard;
};
const BasketCount: FC<TCardProps> = ({ card }) => {
  const [count, setCount] = useState<string>(
    String(getLocalQuantity(card.id)?.orderQuantity)
  );
  const { countBasket } = useActions();
  const [focus, setFocus] = useState<boolean>(true);
  useEffect(() => onBlur(), []);
  const onBlur = () => {
    setFocus(!focus);
    if (card.minOrderQuantity > +count) setCount(String(card.minOrderQuantity));
    if (card.quantity < +count) setCount(String(card.quantity));
  };
  useEffect(() => {
    editLocalBasket(card.id, +count, card.price);
    let checkLocal = getAllLocal();
    countBasket(checkLocal ? checkLocal : []);
  }, [count]);
  return (
    <div
      className={cn(
        styles.card__quantity_input,
        { [styles.active]: focus },
        {
          [styles.error]:
            +count < card.minOrderQuantity || +count > card.quantity,
        }
      )}
    >
      <button
        onClick={() => minusCount(count, setCount, card.minOrderQuantity)}
        type="button"
      >
        <FiMinus />
      </button>{" "}
      <input
        onChange={(e) => setCount(e.target.value)}
        value={count}
        type="number"
        min={card.minOrderQuantity}
        max={card.quantity}
        inputMode="numeric"
        onFocus={() => setFocus(!focus)}
        onBlur={onBlur}
      />{" "}
      <button
        onClick={() => plusCount(count, setCount, card.quantity)}
        type="button"
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default BasketCount;
