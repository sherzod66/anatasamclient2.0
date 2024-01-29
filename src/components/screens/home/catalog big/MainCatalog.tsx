import { FC } from "react";
import styles from "./mainCatalog.module.scss";
import Link from "next/link";
const MainCatalog: FC = () => {
  return (
    <section className={styles.offer}>
      <div className={styles.offer__container}>
        <h1>Наш каталог</h1>
        <div className={styles.offer__row}>
          <div className={styles.offer__column}>
            <Link href="/goods/wedding" className={styles.offer__item}>
              <img
                draggable={false}
                src="/catalog/wedding.webp"
                alt="wedding"
              />
              <div className={styles.offer__info}>
                <h2>Свадьба</h2>
                <button className={styles.offer__button} type="button">
                  Посмотреть
                </button>
              </div>
            </Link>
          </div>
          <div className={styles.offer__column}>
            <Link href="/goods/sunnat" className={styles.offer__item}>
              <img draggable={false} src="/catalog/sunnat.webp" alt="wedding" />
              <div className={styles.offer__info}>
                <h2>Свадьба</h2>
                <button className={styles.offer__button} type="button">
                  Посмотреть
                </button>
              </div>
            </Link>
          </div>
          <div className={styles.offer__column}>
            <Link href="/goods/congratulatory" className={styles.offer__item}>
              <img
                draggable={false}
                src="/catalog/wedding.webp"
                alt="wedding"
              />
              <div className={styles.offer__info}>
                <h2>Свадьба</h2>
                <button className={styles.offer__button} type="button">
                  Посмотреть
                </button>
              </div>
            </Link>
          </div>
          <div className={styles.offer__column}>
            <Link href="/goods/anniversary" className={styles.offer__item}>
              <img
                draggable={false}
                src="/catalog/wedding.webp"
                alt="wedding"
              />
              <div className={styles.offer__info}>
                <h2>Свадьба</h2>
                <button className={styles.offer__button} type="button">
                  Посмотреть
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCatalog;
