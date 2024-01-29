import { Dispatch, FC, SetStateAction } from "react";
import styles from "./catalog.module.scss";
import Link from "next/link";
import { MdEvent } from "react-icons/md";
import { GiHorseHead } from "react-icons/gi";
import { FaGift } from "react-icons/fa";
import { BsFillEnvelopeHeartFill } from "react-icons/bs";
import { BiArchive } from "react-icons/bi";
// type TCatalog = {
// 	setActive: Dispatch<SetStateAction<boolean>>
// }
const Catalog: FC = () => {
  return (
    <ul className={styles.catalog__list}>
      <li>
        <Link className={styles.catalog__link} href="/goods/all">
          <BiArchive /> Все товары
        </Link>
      </li>
      <li>
        <Link className={styles.catalog__link} href="/goods/wedding">
          <MdEvent /> Свадьба
        </Link>
      </li>
      <li>
        <Link className={styles.catalog__link} href="/goods/sunnat">
          <GiHorseHead />
          Суннат той
        </Link>
      </li>
      <li>
        <Link className={styles.catalog__link} href="/goods/wedding">
          <FaGift /> Поздравительное
        </Link>
      </li>
      <li>
        <Link className={styles.catalog__link} href="/goods/wedding">
          <BsFillEnvelopeHeartFill /> Юбилей
        </Link>
      </li>
    </ul>
  );
};

export default Catalog;
