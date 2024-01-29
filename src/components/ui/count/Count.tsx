"use client";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./count.module.scss";
import cn from "clsx";
import { ICard } from "@/types/card.type";
import { minusCount, plusCount } from "@/components/screens/card/countFunction";
import { FiMinus, FiPlus } from "react-icons/fi";

type TCountProps = {
  count: string;
  card: ICard;
  setCount: Dispatch<SetStateAction<string>>;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
};

const CountQuantity: FC<TCountProps> = ({
  card,
  count,
  focus,
  setCount,
  setFocus,
}) => {
  const onBlur = () => {
    setFocus(!focus);
    if (card.minOrderQuantity > +count) setCount(String(card.minOrderQuantity));
    if (card.quantity < +count) setCount(String(card.quantity));
  };
  return (
    <div
      className={cn(
        styles.card__quantity_input,
        { [styles.active]: focus },
        {
          [styles.error]:
            +count < card.minOrderQuantity || +count > card.quantity,
        },
        styles.margin
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

export default CountQuantity;
