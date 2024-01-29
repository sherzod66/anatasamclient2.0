"use client";
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import cn from "clsx";
import styles from "./auth.module.scss";
import { TStateType } from "./Auth";
import { useConfirmationMutation } from "@/lib/api/api";
import Cookies from "js-cookie";
import { useActions } from "@/hooks/useActions";
import { writeToken } from "@/lib/api/api helper/apiCookies.helper";
type TAuthKeyForm = {
  setAllInfo: Dispatch<SetStateAction<TStateType>>;
  allInfo: TStateType;
};
const AuthKeyForm: FC<TAuthKeyForm> = ({ allInfo, setAllInfo }) => {
  const [keyValue, setKeyValue] = useState<string>("");
  const { editAuth } = useActions();
  const [sendKey, { isError, isLoading, isSuccess, data }] =
    useConfirmationMutation();
  useEffect(
    () => setAllInfo((prev) => ({ ...prev, isLoading: isLoading })),
    [isLoading]
  );
  useEffect(() => {
    if (isError) setAllInfo((prev) => ({ ...prev, serverError: true }));
    if (isSuccess) {
      writeToken(data?.access_token as string);
      editAuth({
        auth: true,
        isAdmin: data?.isAdmin,
        token: data?.access_token,
      });
    }
  }, [isError, isLoading]);

  const handelSendKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyValue.length === 6) {
      await sendKey(keyValue);
    } else {
      setAllInfo((prev) => ({ ...prev, isError: true }));
    }
  };
  return (
    <form onSubmit={handelSendKey} className={styles.from__key}>
      <h2>Введите код</h2>
      <h4>
        Для подтверждения телефона отправили 6-значный код на +998{" "}
        {allInfo.phone}
      </h4>
      <div
        className={cn(styles.auth__input_key, {
          [styles.error]: allInfo.serverError,
        })}
      >
        <input
          onChange={(e) => setKeyValue(e.target.value)}
          maxLength={6}
          type="tel"
          value={keyValue}
        />
      </div>
      {allInfo.isError && <span>Код должен состоять из 6 цифр</span>}
      {allInfo.serverError && <span>Не верный код</span>}
      <button className={styles.auth__button} type="submit">
        Отправить
      </button>
    </form>
  );
};

export default AuthKeyForm;
