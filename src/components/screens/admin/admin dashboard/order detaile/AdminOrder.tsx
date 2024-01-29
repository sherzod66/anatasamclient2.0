'use client'
import Loader from '@/components/ui/Loader/Loader'
import { FC, useEffect, useState } from 'react'
import { useGetOrdersQuery } from '@/lib/api/orders.api'
import AdminOrderDetail from './AdminOrderDetail'
import OrderFilter from '../../admin filter data/OrderFilter'
import { IOrder } from '@/types/order.type'
import styles from './adminOrder.module.scss'
import { useGetUserQuery } from '@/lib/api/api'

const AdminOrder: FC = () => {
	const { data: globalDate, isLoading } = useGetOrdersQuery(null)
	const [orders, setOrders] = useState<IOrder[] | undefined>(globalDate)
	const { data: user } = useGetUserQuery(undefined)
	useEffect(() => setOrders(globalDate), [globalDate])
	return (
		<>
			{isLoading && <Loader />}
			{user ? (
				user.role === 'DIRECTOR' || user.role === 'MANAGER' ? (
					<>
						<OrderFilter globalDate={globalDate} setData={setOrders} />
						<div className={styles.order__wrapper}>
							{orders ? (
								orders.length > 0 ? (
									orders.map(order => <AdminOrderDetail data={order} key={order.id} />)
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
