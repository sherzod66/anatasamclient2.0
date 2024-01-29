"use client";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import styles from "./editModel.module.scss";
import { Select } from "antd";
import Loader from "../Loader/Loader";
import { IUser } from "@/types/user.type";
import { useUpdateUserMutation } from "@/lib/api/user.api";
import { editUserUpdateObject } from "./editCardObject";

type TModelEdit = {
  setEdit: Dispatch<
    SetStateAction<{
      isShow: boolean;
      data: IUser;
    }>
  >;
  data: IUser;
};
const EditModelUser: FC<TModelEdit> = ({ setEdit, data }) => {
  const [user, setUser] = useState<IUser>(data);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateUser({ id: user.id, body: editUserUpdateObject(user) });
    } catch (e) {}
  };
  const changeIsAdmin = (value: boolean) => {
    setUser((prev) => ({ ...prev, isAdmin: value }));
  };
  return (
    <div
      onClick={(e) =>
        !(e.target as HTMLElement).closest("#model-content") &&
        !(e.target as HTMLElement).closest(".ant-select-dropdown") &&
        setEdit((prev) => ({ ...prev, isShow: false }))
      }
      className={styles.model}
    >
      <div id="model-content" className={styles.model__content}>
        <p className={styles.createdAt}>
          Date of creation: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        {isLoading && <Loader />}
        <form onSubmit={onSubmit} className={styles.editForm}>
          <label htmlFor="name">User name</label>
          <input
            className={styles.input__big}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
            id="name"
            value={user.name ? user.name : ""}
            type="text"
          />
          <label htmlFor="phone-number">Phone Number</label>
          <input
            className={styles.input__big}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
            id="phone-number"
            value={user.phoneNumber}
            type="text"
          />
          <label style={{ margin: "10px 0px 5px 0px" }}>User rights</label>
          <Select
            style={{
              width: "100%",
              height: "36px",
            }}
            defaultValue={user.isAdmin}
            onChange={changeIsAdmin}
            placeholder="Select sorting"
            options={[
              { value: true, label: "Administrator" },
              { value: false, label: "Not an administrator" },
            ]}
          />
          <button className={styles.edit__button}>Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditModelUser;
