import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import styles from "./filter.module.scss";
import { IUser } from "@/types/user.type";
type TUserProps = {
  globalData: IUser[] | undefined;
  setData: Dispatch<SetStateAction<IUser[] | undefined>>;
};
const UsersFilter: FC<TUserProps> = ({ globalData, setData }) => {
  const filterPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const result = globalData?.filter((item) =>
      item.phoneNumber.includes(e.target.value)
    );
    setData(result);
  };
  return (
    <div className={styles.row}>
      <div>
        <input
          onChange={filterPhone}
          placeholder="Search by phone number"
          type="number"
        />
      </div>
    </div>
  );
};

export default UsersFilter;
