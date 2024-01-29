import type { NotificationArgsProps } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
type NotificationPlacement = NotificationArgsProps["placement"];
export const openNotification = (
  placement: NotificationPlacement,
  api: NotificationInstance
) => {
  api.info({
    message: "Не все поля формы заполнены!",
    description: "Пожалуйста заполните все поля формы",
    placement,
  });
};
