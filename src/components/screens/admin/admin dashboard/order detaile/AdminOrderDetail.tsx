'use client'
import { FC, MouseEvent, useEffect, useState } from 'react'
import styles from './adminOrder.module.scss'
import { IOrder } from '@/types/order.type'
import { GetData } from '@/util/Date.heper'
import { formatPrice } from '@/util/formatPrice'
import cn from 'clsx'
import { lazyImage } from '@/util/lazyImage'
import { imageLinkHelper } from '@/components/ui/card carousel/imageLink.halper'
import { Button, Popconfirm, Select, message } from 'antd'
import { useChangeStatusMutation, useDeleteOrderMutation } from '@/lib/api/orders.api'
import { useGetCardByIdQuery } from '@/lib/api/card.api'
type TDetailProps = {
	data: IOrder
}

const AdminOrderDetail: FC<TDetailProps> = ({ data }) => {
	const [active, setActive] = useState<boolean>(false)
	const [deleteOrder, { data: deleteOrderData }] = useDeleteOrderMutation()
	const [statusChange, { isLoading, data: statusData }] = useChangeStatusMutation()
	const popup = (event: MouseEvent) => {
		if (
			!(event.target as HTMLElement).closest('#itemC') &&
			!(event.target as HTMLElement).closest('#info') &&
			!(event.target as HTMLElement).closest('.rc-virtual-list')
		) {
			setActive(!active)
		}
	}
	useEffect(() => lazyImage(), [data])
	useEffect(() => {
		if (statusData) {
			if (statusData.status >= 0) message.success(statusData.message)
			else message.error(statusData.message)
		}
	}, [statusData])
	const changeStatus = (
		value: 'PENDING' | 'IN_PROGRESS' | 'CAN_BE_PICKED_UP' | 'TOOK',
		id: number
	) => {
		statusChange({ id, status: value })
	}
	const confirm = () => {
		deleteOrder({ id: data.id })
	}
	useEffect(() => {
		if (deleteOrderData) {
			if (deleteOrderData.status >= 0) {
				message.success(deleteOrderData.message)
			} else {
				message.error(deleteOrderData.message)
			}
		}
	}, [deleteOrderData])
	console.log(data.invitationInfo)
	return (
		<div
			onClick={popup}
			id='order__column'
			className={cn(styles.order__column, { [styles.active]: active })}
		>
			<div className={styles.order__item}>
				{data.invitationInfo ? (
					<div id='info' className={styles.order__itemInfo}>
						<div className={styles.order__itemInfoColumn}>
							<div title='Время заказа' className={styles.order__itemInfoDate}>
								Order time: {GetData(+data.createdAt)}
							</div>
							<div id='status' className={styles.order__status}>
								{data.status}
							</div>
							<Select
								style={{ width: '60%', height: '36px' }}
								defaultValue={data.status}
								onChange={value => changeStatus(value, data.id)}
								placeholder='Select sorting'
								options={[
									{ value: 'PENDING', label: 'PENDING', title: 'В ожидании' },
									{ value: 'IN_PROGRESS', label: 'IN PROGRESS', title: 'В процессе' },
									{ value: 'CAN_BE_PICKED_UP', label: 'CAN BE PICKED UP', title: 'Можно забирать' },
									{ value: 'TOOK', label: 'TOOK', title: 'Забрал' }
								]}
							/>
							<div title='Оплачено' className={styles.order__prepayment}>
								Paid: {formatPrice(data.paid)} Sum
							</div>
							<div title='Нужно оплатить' className={styles.order__need}>
								NeedPaid: {formatPrice(data.orderPrice - data.paid)} Sum
							</div>
							<div title='Полная стоимость заказа' className={styles.order__price}>
								Total amount: {formatPrice(data.orderPrice)} Sum
							</div>
						</div>
						<div className={styles.order__itemInfoColumn}>
							<p>
								Client name: <strong>{data.userName}</strong>
							</p>
							<p>
								Client number: <strong>{data.userPhone}</strong>
							</p>
							<p>
								Payment method: <strong>{data.paymentMethod}</strong>
							</p>
							<p>
								Payment id: <strong>{data.payment_id}</strong>
							</p>
						</div>
						<div className={styles.order__itemInfoColumn}>
							<div
								// onClick={removeOrder}
								className={`${styles.remove__order} ${
									data.status === 'PENDING' ? styles.active : ''
								}`}
							>
								<Popconfirm
									title='Delete the order'
									description='Are you sure to delete this order?'
									onConfirm={confirm}
									okText='Yes'
									cancelText='No'
								>
									<Button danger>Delete</Button>
								</Popconfirm>
							</div>
						</div>
					</div>
				) : (
					''
				)}
				<div className={styles.order__row}>
					{data.invitationInfo
						? data.invitationInfo.map(item => (
								<div id='itemC' key={item.cardId} className={styles.order__rowColumn}>
									<div className={styles.order__rowImg}>
										<img
											data-src={imageLinkHelper(item.cardImage[0])}
											src='/icon/anatasamLoader.png'
											alt='image'
										/>
									</div>
									<div className={styles.order__info}>
										<div title='Имя пригласительной' className={styles.order__rowQuantity}>
											<strong>Card name: </strong> {item.cardName ? item.cardName : 'Unknown'}
										</div>
										<div title='Количество' className={styles.order__rowQuantity}>
											<strong>Quantity: </strong> {item.quantity}
										</div>
										<div title='Язык пригласительной' className={styles.order__rowQunaty}>
											<strong>Lang:</strong> {item.lang}
										</div>
										<div title='Виновники торжества' className={styles.order__rowNameP}>
											<strong>Bride and groom: </strong> {item.luckyOnes}
										</div>
										<div title='Ресторан' className={styles.order__restaurant}>
											<strong>Restaurant: </strong> {item.restaurant}
										</div>
										<div title='С уважением семьи' className={styles.order__famly}>
											<strong>Family :</strong> {item.family}
										</div>
										<div title='Время и дата' className={styles.order__rowQunaty}>
											<strong>Date :</strong> {item.date} в {item.time}
										</div>
										<div title='Коментарий' className={styles.order__itemInfoColumn}>
											<div className={styles.comment__user}>
												<strong>comment: </strong> <p>{item.comment}</p>
											</div>
										</div>
										<div title='Стоимость пригласительной' className={styles.order__rowPrice}>
											<strong>Price:</strong> {formatPrice(item.cardPrice)} Sum
										</div>
									</div>
								</div>
						  ))
						: ''}
				</div>
			</div>
			<p id='nameP' className={styles.order__id}>
				{data.invitationInfo ? data.invitationInfo[0].luckyOnes : ''}
			</p>
		</div>
	)
}

export default AdminOrderDetail
