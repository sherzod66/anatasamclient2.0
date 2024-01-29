import { FC } from 'react'
import styles from './check.module.scss'
import { IOrderInfo } from '@/types/invitationInfo.type'
import { formatPrice } from '@/util/formatPrice'

type TCheckDetail = {
	check: IOrderInfo
}
const CheckDetail: FC<TCheckDetail> = ({ check }) => {
	return (
		<div className={styles.ticket__column}>
			<div className={styles.flex}>
				<p>Дата:</p>
				<p>{new Date().toLocaleDateString()}</p>
			</div>
			<div className={styles.flex}>
				<p>Время:</p>
				<p>{new Date().toLocaleTimeString()}</p>
			</div>
			<div className={styles.cardTable}>
				<ul className={styles.lis__row}>
					<li>Номер товара</li>
					<li>Виновники торжества</li>
					<li>Количество</li>
					<li>Время торжества</li>
					<li>Коментарий</li>
					<li>Цена</li>
				</ul>
				{check.invitationInfo.map(el => (
					<ul key={el.cardId} className={styles.cardInfo__row}>
						<li>{el.cardId}</li>
						<li>{el.luckyOnes}</li>
						<li>{el.quantity}</li>
						<li>
							{el.date} в {el.time}
						</li>
						<li>{el.comment}</li>
						<li>{formatPrice(el.cardPrice * el.quantity)} Сум</li>
					</ul>
				))}
			</div>
			<div className={styles.flex}>
				<p>Ресторан:</p>
				<p>{check.invitationInfo[0].restaurant}</p>
			</div>
			<div className={styles.flex}>
				<p>С уважением:</p>
				<p>{check.invitationInfo[0].family}</p>
			</div>
			<div className={styles.flex}>
				<p>Оплачено:</p>
				<p>
					{formatPrice(check.paid ? check.paid : 0)}
					Сум
				</p>
			</div>
			<div className={styles.flex}>
				<p>Нужно доплатить:</p>
				<p>
					{formatPrice(check.paid ? check.orderPrice - check.paid : 0)}
					Сум
				</p>
			</div>
			<div className={styles.flex}>
				<p>Общаяя сумма:</p>
				<p>
					{formatPrice(check.orderPrice)}
					Сум
				</p>
			</div>
		</div>
	)
}

export default CheckDetail
