"use client";
import { FC, useState } from "react";
import styles from "./profileDetail.module.scss";
import { useGetUserQuery } from "@/lib/api/api";
import { getToken, removeToken } from "@/lib/api/api helper/apiCookies.helper";
import { FaAngleRight } from "react-icons/fa";
import { useActions } from "@/hooks/useActions";
import ProfileOrder from "./ProfileOrder";
import { MdEdit } from "react-icons/md";
import { Button, Input, message } from "antd";
import { useUpdateUserNameMutation } from "@/lib/api/user.api";
const ProfileDetail: FC = () => {
  const { data } = useGetUserQuery(getToken());
  const { editAuth } = useActions();
  const [updateName] = useUpdateUserNameMutation();
  const [isShow, setIsShow] = useState<{ isShow: boolean; value: string }>({
    isShow: false,
    value: "",
  });
  const handelClick = () => {
    updateName({ name: isShow.value })
      .then(() => {
        message.success("Успешно изменено");
        setIsShow((prev) => ({ ...prev, isShow: !isShow.isShow }));
      })
      .catch(() => message.error("Ошибка что-то пошло не так"));
  };
  return (
    <main className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__header}>
          <div className={styles.profile__user_image}>
            <img src="/icon/user.png" alt="user" />
          </div>
          <div className={styles.profile__user_info}>
            <h3>
              {data?.name}{" "}
              <button
                onClick={() =>
                  setIsShow((prev) => ({ ...prev, isShow: !isShow.isShow }))
                }
              >
                <MdEdit />
              </button>
            </h3>

            <h5>{data?.phoneNumber} </h5>
          </div>
          {isShow.isShow && (
            <div className={styles.change__user_name}>
              <Input
                placeholder="Антон"
                type="text"
                onChange={(e) =>
                  setIsShow((prev) => ({ ...prev, value: e.target.value }))
                }
                style={{ marginRight: "10px", width: "200px" }}
              />
              <Button onClick={handelClick} type="primary">
                Изменить
              </Button>
            </div>
          )}
        </div>
        <ul className={styles.profile__list}>
          <li>
            <span>Заказы</span>{" "}
            <span>
              <FaAngleRight />
            </span>
            <div className={styles.profile__orders}>
              {data && data?.orders.length > 0 ? (
                data.orders.map((order) => (
                  <ProfileOrder order={order} key={order.id} user={data} />
                ))
              ) : (
                <p>Заказов не найденно</p>
              )}
            </div>
          </li>
        </ul>
        <button
          className={styles.profile__logout}
          onClick={() => {
            editAuth({ auth: null, isAdmin: false, token: undefined });
            removeToken();
          }}
          type="button"
        >
          Выйти
        </button>
      </div>
    </main>
  );
};

export default ProfileDetail;
