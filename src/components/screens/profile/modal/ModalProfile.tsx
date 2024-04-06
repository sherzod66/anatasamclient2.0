'use client'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import styles from './modal.module.css'
import { GetData } from '@/util/Date.heper'
import { IOrder } from '@/types/order.type'
import { formatPrice } from '@/util/formatPrice'
import { imageLik } from '@/util/imageLinkHalper'
import { useTranslation } from 'react-i18next'
import { Button, Popconfirm, message } from 'antd'
import { useDeleteOrderMutation } from '@/lib/api/orders.api'
type TModalProfile = {
	order: IOrder
	setModal: Dispatch<SetStateAction<boolean>>
}
const ModalProfile: FC<TModalProfile> = ({ order, setModal }) => {
	const { t } = useTranslation()
	const [deleteOrder, { data: deleteOrderData }] = useDeleteOrderMutation()
	useEffect(() => {
		if (deleteOrderData) {
			if (deleteOrderData.status >= 0) {
				message.success(t('delete_order_s'))
			} else {
				message.error(t('delete_order_e'))
			}
		}
	}, [deleteOrderData])
	return (
		<div
			onClick={e =>
				!(e.target as HTMLElement).closest('#item') &&
				!(e.target as HTMLElement).closest('.ant-popover-content') &&
				setModal(false)
			}
			className={styles.modal}
		>
			<div id='item' className={styles.modalDetail__container}>
				<div className={styles.modalDetail__info}>
					<div className={styles.modalDetailI__column}>
						<div className={styles.modalDetail__itemInfoDate}>
							{t('order_time')}: {GetData(+order.createdAt)}
						</div>
						<div className={styles.modalDetail__prepayment}>
							{t('order_paid')}: {formatPrice(order.paid)} {t('sum')}
						</div>
						<div className={styles.modalDetail__neeed}>
							{t('need_paid')}: {formatPrice(order.orderPrice - order.paid)} {t('sum')}
						</div>
						<div className={styles.modalDetail__price}>
							{t('total_amount')} {formatPrice(order.orderPrice)} {t('sum')}
						</div>
						<Popconfirm
							title='Delete the order'
							description='Are you sure to delete this order?'
							onConfirm={() => deleteOrder({ id: order.id })}
							okText='Yes'
							cancelText='No'
						>
							<Button danger>{t('delete')}</Button>
						</Popconfirm>
					</div>
				</div>
				<div className={styles.modalDetail__row}>
					{order.invitationInfo
						? order.invitationInfo.map(item => (
								<div key={item.cardId} className={styles.modalDetail__column}>
									<div className={styles.modalDetail__item}>
										<div className={styles.modalDetail__img}>
											<img src={imageLik(item.cardImage[0])} alt='Not found' />
										</div>
										<div className={styles.modalDetail__body}>
											<div id='nameP' className={styles.modalDetail__rowNameP}>
												{item.luckyOnes}
											</div>
											<div className={styles.modalDetail__rowQunaty}>
												{t('restaurant')}: {item.restaurant}
											</div>
											<div className={styles.modalDetail__rowQunaty}>
												{t('family')}: {item.family}
											</div>
											<div className={styles.modalDetail__rowQunaty}>
												{t('quantity')}: {item.quantity}
											</div>
											<div className={styles.modalDetail__rowQunaty}>
												{item.date} в {item.time}
											</div>
											<div className={styles.modalDetail__itemInfoColumn}>
												<div className={styles.comment__user}>
													{t('comment')}: <p>{item.comment}</p>
												</div>
											</div>
											<div className={styles.modalDetail__rowPrice}>
												{t('price')}: {formatPrice(item.cardPrice * item.quantity)}
											</div>
										</div>
									</div>
								</div>
						  ))
						: ''}
				</div>
			</div>
		</div>
	)
}

export default ModalProfile
