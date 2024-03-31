'use client'
import { FC } from 'react'
import styles from '../orderCard.module.scss'
import { useOrderBasketInfo } from './useOrderBasketInfo'
import Loader from '@/components/ui/Loader/Loader'
import { imageLik } from '@/util/imageLinkHalper'
import { IPayment } from '@/types/invitationInfo.type'
import { formatPrice } from '@/util/formatPrice'
import { changeEvent } from './changeEvent'
import { FaFileCircleCheck } from 'react-icons/fa6'
import { checkWriteMulti } from '@/config/localStorage.helper'
import { IoIosCopy } from 'react-icons/io'

const OrderBasket: FC = () => {
	const {
		data,
		setInvitationInfo,
		invitationInfo,
		isLoading,
		paymentInfo,
		setPaymentInfo,
		user,
		contextHolder,
		handelSubmitForm,
		handelLoading,
		copyInfo,
		t
	} = useOrderBasketInfo()

	return (
		<div className={styles.writeOrder}>
			{contextHolder}
			{isLoading && <Loader />}
			{handelLoading && <Loader />}
			<div className={styles.writeOrder__container}>
				<form onSubmit={handelSubmitForm} className={styles.writeOrder__form}>
					<div className={styles.writeOrder__row}>
						<div onClick={copyInfo} className={styles.copy}>
							<IoIosCopy />
						</div>
						{invitationInfo.map((info, index) => (
							<div key={info.cardId} className={styles.writeOrder__column}>
								<div className={styles.writeOrder__item}>
									<h2>{t('checked_card')}</h2>
									<div className={styles.writeOrder__image}>
										<img src={imageLik(info.cardImage[0])} alt={'image not found'} />
									</div>
									<h4>
										{t('one_price')}: {formatPrice(info.cardPrice)}
									</h4>
									<h2>
										{t('quantity')}: {info.quantity}
									</h2>
									<div className={styles.writeOrder__lang}>
										<p>{t('lang')}:</p>
										<span>
											<input
												id='lang-id'
												type='radio'
												value='RU'
												defaultChecked
												name={data![index].name}
												onChange={e =>
													changeEvent(index, e, invitationInfo, 'lang', setInvitationInfo)
												}
											/>
											RU
										</span>
										<span>
											<input
												id='lang-id'
												type='radio'
												value='UZ'
												name={data![index].name}
												onChange={e =>
													changeEvent(index, e, invitationInfo, 'lang', setInvitationInfo)
												}
											/>
											UZ
										</span>
										<span>
											<input
												id='lang-id'
												type='radio'
												value='EN'
												name={data![index].name}
												onChange={e =>
													changeEvent(index, e, invitationInfo, 'lang', setInvitationInfo)
												}
											/>
											EN
										</span>
									</div>
									<label htmlFor={`${info.cardId}-name`}>{t('luckyOnes')}</label>
									<input
										className={styles.writeOrder__input}
										id={`${info.cardId}-name`}
										placeholder='Саша и Таня'
										onChange={e =>
											changeEvent(index, e, invitationInfo, 'luckyOnes', setInvitationInfo)
										}
										value={info.luckyOnes}
										type='text'
										name='name'
									/>
									<label htmlFor={`${info.cardId}-date`}>{t('time_and_date')}</label>
									<div className={styles.writeOrder__data}>
										<p>
											<input
												className={styles.writeOrder__dataMonth}
												id={`${info.cardId}-date`}
												onChange={e =>
													changeEvent(index, e, invitationInfo, 'date', setInvitationInfo)
												}
												value={info.date}
												type='date'
											/>
										</p>
										<p>
											<label htmlFor={`${info.cardId}-time`}>{t('time')}</label>
											<input
												id={`${info.cardId}-time`}
												placeholder='18:00'
												onChange={e =>
													changeEvent(index, e, invitationInfo, 'time', setInvitationInfo)
												}
												value={info.time}
												type='time'
												name='time'
												className={styles.writeOrder__time}
											/>
										</p>
									</div>
									<label htmlFor={`${info.cardId}-restaurant`}>{t('restaurant')}</label>
									<input
										id={`${info.cardId}-restaurant`}
										type='text'
										value={info.restaurant}
										onChange={e =>
											changeEvent(index, e, invitationInfo, 'restaurant', setInvitationInfo)
										}
										className={styles.writeOrder__input}
									/>

									<label htmlFor={`${info.cardId}-family`}>{t('family')}</label>
									<input
										id={`${info.cardId}-family`}
										type='text'
										onChange={e =>
											changeEvent(index, e, invitationInfo, 'family', setInvitationInfo)
										}
										value={info.family}
										name='family'
										className={styles.writeOrder__input}
									/>
									<label htmlFor={`${info.cardId}-comment`}>{t('comment')}</label>
									<textarea
										className={styles.writeOrder__textarea}
										placeholder='Пригласительное должно быть готово уже через 2 дня'
										onChange={e =>
											changeEvent(index, e, invitationInfo, 'comment', setInvitationInfo)
										}
										value={info.comment}
										name='comment'
										id={`${info.cardId}-comment`}
									/>
								</div>
							</div>
						))}
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
								value={user?.isAdmin ? 'CASH' : 'UZCARD'}
								name='chose-card'
								id='payment-method'
							>
								<option value='UZCARD'>UZCARD</option>
								<option value='HUMO'>HUMO</option>
								{user?.isAdmin && <option value='CASH'>CASH</option>}
							</select>
						</div>
						{user?.isAdmin && (
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
									type='button'
									onClick={() => checkWriteMulti(invitationInfo, paymentInfo)}
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

export default OrderBasket
