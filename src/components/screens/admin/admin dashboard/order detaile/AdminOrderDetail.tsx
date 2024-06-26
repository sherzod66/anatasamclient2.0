'use client'
import { Dispatch, FC, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import styles from './adminOrder.module.scss'
import { IOrder } from '@/types/order.type'
import { GetData } from '@/util/Date.heper'
import { formatPrice } from '@/util/formatPrice'
import cn from 'clsx'
import { lazyImage } from '@/util/lazyImage'
import { imageLinkHelper } from '@/components/ui/card carousel/imageLink.halper'
import { Button, FloatButton, Input, Popconfirm, Select, message } from 'antd'
import {
	useChangePhoneNumberMutation,
	useChangePriceMutation,
	useChangeStatusMutation,
	useDeleteInvitationInfoMutation,
	useDeleteOrderMutation
} from '@/lib/api/orders.api'
import { MdEdit, MdModeEdit } from 'react-icons/md'
import { TEditOrder } from './AdminOrder'
type TDetailProps = {
	data: IOrder
	setEditOrder: Dispatch<SetStateAction<TEditOrder>>
}
type TChangePrice = {
	isShow: boolean
	value: string
	phoneNumber: string
}
const AdminOrderDetail: FC<TDetailProps> = ({ data, setEditOrder }) => {
	const [active, setActive] = useState<boolean>(false)
	const [changeOrderPrice] = useChangePriceMutation()
	const [changeOrderPhoneNumber] = useChangePhoneNumberMutation()
	const [changePrice, setChangePrice] = useState<TChangePrice>({
		isShow: false,
		value: String(data.orderPrice),
		phoneNumber: data.userPhone
	})
	const [deleteOrder, { data: deleteOrderData }] = useDeleteOrderMutation()
	const [deleteInvitationInfo] = useDeleteInvitationInfoMutation()
	const [statusChange, { isLoading, data: statusData }] = useChangeStatusMutation()
	const popup = (event: MouseEvent) => {
		if (
			!(event.target as HTMLElement).closest('#itemC') &&
			!(event.target as HTMLElement).closest('#info') &&
			!(event.target as HTMLElement).closest('.ant-popover') &&
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
	const confirmCardDelete = (infoId: number) => {
		deleteInvitationInfo({ invitationInfoId: infoId, orderId: data.id })
			.then(() => message.success('Successfully deleted'))
			.catch(() => message.error('Error'))
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
	const changeOrderHandler = () => {
		changeOrderPrice({ orderId: data.id, price: +changePrice.value })
			.then(() => {
				message.success('Successfully changed')
				setChangePrice(prev => ({ ...prev, isShow: false }))
			})
			.catch(() => message.error('Error'))
	}
	const changePhoneNumberHandler = () => {
		if (data.userPhone !== changePrice.phoneNumber) {
			changeOrderPhoneNumber({ orderId: data.id, phoneNumber: changePrice.phoneNumber })
				.then(() => {
					message.success('Successfully changed')
					setChangePrice(prev => ({ ...prev, isShow: false }))
				})
				.catch(() => message.error('Error'))
		}
	}
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
								<p
									onClick={() => setChangePrice(prev => ({ ...prev, isShow: !changePrice.isShow }))}
								>
									Total amount: {formatPrice(data.orderPrice)} Sum <MdEdit />
								</p>
								{changePrice.isShow && (
									<>
										<input
											value={changePrice.value}
											onChange={e => setChangePrice(prev => ({ ...prev, value: e.target.value }))}
											type='number'
										/>
										<button onClick={changeOrderHandler} type='button'>
											Change
										</button>
									</>
								)}
							</div>
						</div>
						<div className={styles.order__itemInfoColumn}>
							<p>
								Client name: <strong>{data.userName}</strong>
							</p>
							{data.payment_id.length > 11 ? (
								<>
									<span>Client number:</span>
									<Input
										onChange={e =>
											setChangePrice(prev => ({ ...prev, phoneNumber: e.target.value }))
										}
										value={changePrice.phoneNumber}
									/>
									{data.userPhone !== changePrice.phoneNumber && (
										<Button onClick={changePhoneNumberHandler} style={{ marginTop: '5px' }}>
											Edit
										</Button>
									)}
								</>
							) : (
								<p>
									Client number: <strong>{data.userPhone}</strong>
								</p>
							)}
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
							<button
								onClick={() =>
									setEditOrder({
										invitationInfo: data.invitationInfo,
										isShow: true,
										order: data
									})
								}
								className={styles.edit__button}
							>
								<MdModeEdit /> Edit
							</button>
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
										<Popconfirm
											title='Delete this card?'
											description='Are you sure to delete this card?'
											onConfirm={() => confirmCardDelete(item.id!)}
											okText='Yes'
											cancelText='No'
										>
											<Button danger>Delete</Button>
										</Popconfirm>
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
