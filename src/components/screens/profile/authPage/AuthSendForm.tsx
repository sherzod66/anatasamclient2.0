"use client";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./auth.module.scss";
import InputMask from "react-input-mask";
import { useAuthMutation } from "@/lib/api/api";
import { TStateType } from "./Auth";
import cn from "clsx";
type TAuthSendForm = {
  allInfo: TStateType;
  setAllInfo: Dispatch<SetStateAction<TStateType>>;
};
const AuthSendForm: FC<TAuthSendForm> = ({ allInfo, setAllInfo }) => {
  const [phone, setPhone] = useState<string>("");
  const [handlerAuth, { isLoading, isError, isSuccess }] = useAuthMutation();
  const sendSms = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone.includes("_") || phone.length === 0) {
      setAllInfo((prev) => ({ ...prev, isError: true }));
    } else {
      const splitNum = phone.split(" ");
      await handlerAuth(splitNum.join(""));
    }
  };
  useEffect(
    () => setAllInfo((prev) => ({ ...prev, isLoading: isLoading })),
    [isLoading]
  );
  useEffect(() => {
    if (isError) setAllInfo((prev) => ({ ...prev, serverError: true }));
    if (isSuccess) setAllInfo((prev) => ({ ...prev, step: true }));
    setAllInfo((prev) => ({ ...prev, phone }));
  }, [isError, isLoading]);
  return (
    <form onSubmit={sendSms} className={styles.from__number}>
      <h2>Введите номер телефона</h2>
      <h4>Отправим смс с кодом подтверждения</h4>
      <div
        className={cn(styles.auth__input_wrapper, {
          [styles.error]: allInfo.isError,
        })}
      >
        <div className={styles.auth_slot}>+998 </div>
        <InputMask
          placeholder="00 000-00-00"
          type="tel"
          className={styles.auth__input_tel}
          onChange={(e) => {
            setPhone(e.target.value);
            setAllInfo((prev) => ({ ...prev, isError: false }));
          }}
          value={phone}
          mask={"99 999 99 99"}
        />
      </div>
      {allInfo.isError && <span>Неверный формат номера</span>}
      {allInfo.serverError && <span>Ошибка на стороне сервера</span>}
      <button className={styles.auth__button} type="submit">
        Отправить код
      </button>
    </form>
  );
};

export default AuthSendForm;
