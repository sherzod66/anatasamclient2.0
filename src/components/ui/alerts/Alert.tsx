import { Dispatch, FC, SetStateAction } from "react";
import cn from "clsx";
import styles from "./alert.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import { TUi } from "@/types/ui.type";
type TAlert = {
  text: string;
  type: "success" | "error" | string;
  setState: Dispatch<SetStateAction<TUi>>;
};
const Alert: FC<TAlert> = ({ text, type, setState }) => {
  return (
    <div className={styles.alert}>
      <div className={cn(styles.alertContent, styles[type])}>
        <p>{text}</p>
        <p
          className={styles.icon}
          onClick={() =>
            setState((prev) => ({ ...prev, event: "", alertShow: false }))
          }
        >
          <IoCloseSharp />
        </p>
      </div>
    </div>
  );
};

export default Alert;
