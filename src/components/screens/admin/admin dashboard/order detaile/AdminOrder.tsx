'use client'
import Loader from '@/components/ui/Loader/Loader'
import { FC, useEffect, useState } from 'react'
import { useGetOrdersQuery } from '@/lib/api/orders.api'
import AdminOrderDetail from './AdminOrderDetail'
import OrderFilter from '../../admin filter data/OrderFilter'
import { IOrder, orderDefault } from '@/types/order.type'
import styles from './adminOrder.module.scss'
import { useGetUserQuery } from '@/lib/api/api'
import { IInvitationInfo } from '@/types/invitationInfo.type'
import EditModalOrder from '@/components/ui/admin edit/EditModalOrder'

export type TEditOrder = {
	order: IOrder
	invitationInfo: IInvitationInfo[]
	isShow: boolean
}

const AdminOrder: FC = () => {
	const { data: globalDate, isLoading } = useGetOrdersMinQuery(null)
	const [orders, setOrders] = useState<IOrder[] | undefined>(globalDate)
	const { data: user } = useGetUserQuery(undefined)
	const [editOrder, setEditOrder] = useState<TEditOrder>({
		invitationInfo: [],
		isShow: false,
		order: orderDefault
	})
	useEffect(() => {
		if (globalDate) setOrders([...globalDate.filter(status => status.status === 'PENDING')])
	}, [globalDate])
	return (
		<>
			{isLoading && <Loader />}
			{user ? (
				user.role === 'DIRECTOR' || user.role === 'MANAGER' ? (
					<>
						{editOrder.isShow && (
							<EditModalOrder EditOrder={editOrder} setEditOrder={setEditOrder} />
						)}
						<OrderFilter globalDate={globalDate} setData={setOrders} />
						<div className={styles.order__wrapper}>
							{orders ? (
								orders.length > 0 ? (
									orders.map(order => (
										<AdminOrderDetail setEditOrder={setEditOrder} data={order} key={order.id} />
									))
								) : (
									<h2>Not found</h2>
								)
							) : (
								''
							)}
						</div>
					</>
				) : (
					<h1>You don't have enough rights</h1>
				)
			) : (
				<h1>Error</h1>
			)}
		</>
	)
}

export default AdminOrder
