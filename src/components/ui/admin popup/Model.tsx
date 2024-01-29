"use client";
import { FC, useState } from "react";
import styles from "./model.module.scss";
import { useParams, usePathname } from "next/navigation";
import { dashboardBarList } from "@/assets/dashboard/dashboardList";
import { IoCloseSharp } from "react-icons/io5";
const Model: FC = () => {
  const [isShow, setIsShow] = useState(false);
  const { id } = useParams();
  const Detail = dashboardBarList.find((item) =>
    item.link.includes(String(id))
  );
  const pathName = usePathname();
  return (
    <>
      {!pathName.includes("orders") &&
        !pathName.includes("all-users") &&
        !pathName.includes("report") && (
          <button
            onClick={() => setIsShow(!isShow)}
            className={styles.button}
            type="button"
          >
            Add
          </button>
        )}
      {isShow && (
        <div className={styles.model}>
          <button onClick={() => setIsShow(!isShow)} className={styles.close}>
            <IoCloseSharp />
          </button>
          <div id="model-content" className={styles.model__content}>
            {Detail && Detail.PopupDetail ? (
              <Detail.PopupDetail />
            ) : (
              <h3>Not found</h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
