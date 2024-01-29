"use client";
import { FC, useEffect, useState } from "react";
import styles from "./goods.module.scss";
import { ICard } from "@/types/card.type";
import Link from "next/link";
import { imageLik } from "@/util/imageLinkHalper";
import { formatPrice } from "@/util/formatPrice";
import { lazyImage } from "@/util/lazyImage";
import { Breadcrumb, Select, Space } from "antd";
import { IoMdHome } from "react-icons/io";
import { changeBreadcrumbValue, goodsSelect } from "./goodsSelectValue";
import { useParams } from "next/navigation";

type TGoodsProps = {
  goods: ICard[];
};
const Goods: FC<TGoodsProps> = ({ goods: globalGoods }) => {
  const [goods, setGoods] = useState<ICard[]>([]);
  useEffect(() => setGoods(globalGoods), [globalGoods]);
  const { id } = useParams();
  useEffect(() => lazyImage(), [goods]);
  const handleChange = (value: string) => {
    if (value === "price-from-high-to-low") {
      setGoods([...globalGoods.sort((a, b) => a.price - b.price)].reverse());
    } else if (value === "price-from-low-to-high") {
      setGoods([...globalGoods.sort((a, b) => a.price - b.price)]);
    }
  };
  return (
    <section className={styles.invitation}>
      <div className={styles.invitation__container}>
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
              title: changeBreadcrumbValue(id),
            },
          ]}
        />
        <div className={styles.invitation__select}>
          <Select
            placeholder="Выберите сортировку"
            style={{ width: 250, marginBottom: "15px" }}
            onChange={handleChange}
            options={goodsSelect}
          />
        </div>

        <div className={styles.invitation__row}>
          {goods.map((card) => (
            <div key={card.id} className={styles.invitation__column}>
              <Link
                href={"/card/" + card.id}
                className={styles.invitation__item}
              >
                <div className={styles.invitation__img}>
                  <img
                    data-src={imageLik(card.imageLink[0])}
                    src="/icon/anatasamLoader.png"
                  />
                </div>
                <div className={styles.invitation__text}>{card.name}</div>
                <div className={styles.invitation__price}>
                  {formatPrice(card.price)}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goods;
