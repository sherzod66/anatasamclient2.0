"use client";
import { FC, useState } from "react";
import styles from "./navigation.module.scss";
import Link from "next/link";
import { navigationList } from "./navigationList";
import { usePathname } from "next/navigation";
import cn from "clsx";
import Catalog from "./catalog list/Catalog";
import { useAuth } from "@/hooks/useAuth";
import { useGetBasketQuery } from "@/lib/api/basket.api";
const Navigation: FC = () => {
  const pathName = usePathname();
  const { token } = useAuth();
  const [active, setActive] = useState<boolean>(false);
  const { data } = useGetBasketQuery(token);
  return (
    <>
      {active && <Catalog />}
      <nav className={styles.navigation}>
        <button
          onClick={() => setActive(!active)}
          type="button"
          className={styles.navigation__button}
        >
          <div
            className={cn(styles.navigation_hamburger, {
              [styles.active]: active,
            })}
          >
            <span></span>
          </div>
          <p>Каталог</p>
        </button>
        {navigationList.map((list) => (
          <button
            key={list.path}
            type="button"
            className={styles.navigation__button}
          >
            <Link
              className={cn(styles.navigation__link, {
                [styles.active]: pathName.includes(list.path),
              })}
              href={list.path}
            >
              {<list.icon />} <p>{list.name}</p>
            </Link>
            {list.path === "/basket" && (
              <span className={styles.counter}>
                {data ? data?.length : "0"}
              </span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
