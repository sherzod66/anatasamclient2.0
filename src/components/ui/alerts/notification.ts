import type { NotificationArgsProps } from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface'
type NotificationPlacement = NotificationArgsProps['placement']
export const openNotification = (
	placement: NotificationPlacement,
	api: NotificationInstance,
	message: string,
	description: string
) => {
	api.info({
		message,
		description,
		placement
	})
}
