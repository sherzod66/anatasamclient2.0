'use client'
import { FC, FormEvent, useEffect, useState } from 'react'
import styles from '../orderCard.module.scss'
import { checkWrite, getOrderNowLocal } from '@/config/localStorage.helper'
import { imageLik } from '@/util/imageLinkHalper'
import { FaFileCircleCheck } from 'react-icons/fa6'
import { IInvitationInfo, IOrderInfo, IPayment } from '@/types/invitationInfo.type'
import { defaultInfo } from '../defaultInfo'
import { useGetUserQuery } from '@/lib/api/api'
import { getToken } from '@/lib/api/api helper/apiCookies.helper'
import { formatPrice } from '@/util/formatPrice'
import { useCreateOrderMutation } from '@/lib/api/orders.api'
import { orderNowValidation, paymentInfoValidation } from './orderNowValidation'
import { clickRedirect, handelMutationData } from './handelMutationData'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader/Loader'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'

const OrderNow: FC = () => {
	const orderInfo = getOrderNowLocal()
	const { push } = useRouter()
	const [createOrder, { isLoading, data: response }] = useCreateOrderMutation()
	const { t } = useTranslation()
	const { data } = useGetUserQuery(getToken())
	const [info, setInfo] = useState<IInvitationInfo>(defaultInfo(orderInfo))
	const [paymentInfo, setPaymentInfo] = useState<IOrderInfo>({
		invitationInfo: [],
		orderPrice: orderInfo.price * orderInfo.orderQuantity,
		paymentMethod: data ? (data.isAdmin ? 'CASH' : 'UZCARD') : 'CASH',
		userName: data ? (data.isAdmin ? '' : data.name ? data.name : 'unknown') : '',
		userPhone: data ? (data.isAdmin ? '+998' : data.phoneNumber) : '',
		paid: 0,
		basket: false
	})
	const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (orderNowValidation(info) && paymentInfoValidation(paymentInfo)) {
			//console.log(handelMutationData(info, paymentInfo))
			createOrder(handelMutationData(info, paymentInfo)).catch(() => message.error('Error!'))
		}
	}
	useEffect(() => {
		if (response) {
			if (data?.isAdmin) {
				push('/manager/orders')
			} else {
				clickRedirect(response?.orderPrice, response?.id, response?.paymentMethod)
			}
		}
	}, [response])
	return (
		<div className={styles.writeOrder}>
			{isLoading && <Loader />}
			<div className={styles.writeOrder__container}>
				<form onSubmit={handelSubmit} className={styles.writeOrder__form}>
					<div className={styles.writeOrder__row}>
						<div className={styles.writeOrder__column}>
							<div className={styles.writeOrder__item}>
								<h2>{t('checked_card')}</h2>
								<div className={styles.writeOrder__image}>
									<img src={imageLik(orderInfo.imageLink[0])} alt={orderInfo.name} />
								</div>
								<h2>
									{t('quantity')}: {orderInfo.orderQuantity}
								</h2>
								<div className={styles.writeOrder__lang}>
									<p>{t('lang')}:</p>
									<span>
										<input
											id='lang-id'
											type='radio'
											value='RU'
											name={orderInfo.name}
											onChange={e =>
												setInfo(prev => ({
													...prev,
													lang: e.target.value as 'RU'
												}))
											}
										/>
										RU
									</span>
									<span>
										<input
											id='lang-id'
											type='radio'
											value='UZ'
											name={orderInfo.name}
											onChange={e =>
												setInfo(prev => ({
													...prev,
													lang: e.target.value as 'UZ'
												}))
											}
										/>
										UZ
									</span>
									<span>
										<input
											id='lang-id'
											type='radio'
											value='EN'
											name={orderInfo.name}
											onChange={e =>
												setInfo(prev => ({
													...prev,
													lang: e.target.value as 'UZ'
												}))
											}
										/>
										EN
									</span>
								</div>
								<label htmlFor='luckyOnce'>{t('luckyOnes')}</label>
								<input
									className={styles.writeOrder__input}
									id='luckyOnce'
									placeholder='Саша и Таня'
									onChange={e => setInfo(prev => ({ ...prev, luckyOnes: e.target.value }))}
									value={info.luckyOnes}
									type='text'
									name='name'
								/>
								<label htmlFor='data'>{t('time_and_date')}</label>
								<div className={styles.writeOrder__data}>
									<p>
										<input
											className={styles.writeOrder__dataMonth}
											id='data'
											onChange={e => setInfo(prev => ({ ...prev, date: e.target.value }))}
											value={info.date}
											type='date'
										/>
									</p>
									<p>
										<label htmlFor='time'>{t('time')}</label>
										{data?.isAdmin ? (
											<input
												id='time'
												placeholder='18:00'
												onChange={e => setInfo(prev => ({ ...prev, time: e.target.value }))}
												value={info.time}
												type='text'
												name='time'
												className={styles.writeOrder__time}
											/>
										) : (
											<input
												id='time'
												placeholder='18:00'
												onChange={e => setInfo(prev => ({ ...prev, time: e.target.value }))}
												value={info.time}
												type='time'
												name='time'
												className={styles.writeOrder__time}
											/>
										)}
									</p>
								</div>
								<label htmlFor='restaurant'>{t('restaurant')}</label>
								<input
									id='restaurant'
									type='text'
									onChange={event =>
										setInfo(prev => ({
											...prev,
											restaurant: event.target.value
										}))
									}
									className={styles.writeOrder__input}
								/>

								<label htmlFor='family'>{t('family')}</label>
								<input
									id='family'
									type='text'
									onChange={event => setInfo(prev => ({ ...prev, family: event.target.value }))}
									value={info.family}
									name='family'
									className={styles.writeOrder__input}
								/>
								<label htmlFor='comment'>{t('comment')}</label>
								<textarea
									className={styles.writeOrder__textarea}
									placeholder='Детали заказа'
									onChange={event =>
										setInfo(prev => ({
											...prev,
											comment: event.target.value
										}))
									}
									value={info.comment}
									name='comment'
									id='comment'
								/>
							</div>
						</div>
					</div>
					<div className={styles.writeOrder__result}>
						<div className={styles.writeOrder__payment_method}>
							<label htmlFor='payment-method'>{t('payment_method')}:</label>
							<select
								onChange={e =>
									setPaymentInfo(prev => ({
										...prev,
										paymentMethod: e.target.value as IPayment
									}))
								}
								name='chose-card'
								value={paymentInfo.paymentMethod}
								id='payment-method'
							>
								<option value='UZCARD'>UZCARD</option>
								<option value='HUMO'>HUMO</option>
								{data?.isAdmin && <option value='CASH'>CASH</option>}
							</select>
						</div>
						{data?.isAdmin && (
							<div className={styles.writeOrder__user}>
								<input
									onChange={e =>
										setPaymentInfo(prev => ({
											...prev,
											userName: e.target.value
										}))
									}
									placeholder='User name'
									type='text'
									value={paymentInfo.userName}
									className={styles.writeOrder__input}
								/>
								<input
									onChange={e =>
										setPaymentInfo(prev => ({
											...prev,
											userPhone: e.target.value
										}))
									}
									placeholder='user phone number'
									type='tel'
									value={paymentInfo.userPhone}
									className={styles.writeOrder__input}
								/>
								<input
									onChange={e =>
										setPaymentInfo(prev => ({
											...prev,
											orderPrice: +e.target.value
										}))
									}
									placeholder='Order price'
									value={paymentInfo.orderPrice}
									type='text'
									className={styles.writeOrder__input}
								/>
								<input
									onChange={e =>
										setPaymentInfo(prev => ({
											...prev,
											paid: +e.target.value
										}))
									}
									placeholder='Paid'
									type='text'
									className={styles.writeOrder__input}
								/>
								<button
									className={styles.check__button}
									onClick={() => checkWrite(info, paymentInfo)}
									type='button'
								>
									<FaFileCircleCheck />
								</button>
							</div>
						)}
						<p className={styles.writeOrder__result_price}>
							{t('total')}:{' '}
							<span>
								{formatPrice(paymentInfo.orderPrice)} {t('sum')}
							</span>
						</p>
						<button type='submit' className={styles.writeOrder__button}>
							{t('orders')}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default OrderNow
