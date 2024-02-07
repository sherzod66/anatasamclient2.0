'use client'
import { FC } from 'react'
import styles from './basketCard.module.scss'
import { ICard } from '@/types/card.type'
import { MdDelete } from 'react-icons/md'
import { imageLik } from '@/util/imageLinkHalper'
import BasketCount from './BasketCount'
import Link from 'next/link'
import { formatPrice } from '@/util/formatPrice'
import { getAllLocal, getLocalQuantity, pushLocalStorage } from '@/config/localStorage.helper'
import { useToggleBasketMutation } from '@/lib/api/basket.api'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { countBasketPrice } from '@/util/contBasketPrice'
import { useTranslation } from 'react-i18next'

type TBasketCard = {
	card: ICard[]
}
const BasketCard: FC<TBasketCard> = ({ card }) => {
	const basket = useTypedSelector(state => state.basket)
	const { t } = useTranslation()
	const [removeBasket] = useToggleBasketMutation()
	const { countBasket } = useActions()
	const handlerRemove = (id: number) => {
		removeBasket({ cardId: id }).then(() => {
			pushLocalStorage(id, 0, 0)
			let checkLocal = getAllLocal()
			countBasket(checkLocal ? checkLocal : [])
		})
	}
	return (
		<section className={styles.placing}>
			<div className={styles.placing__container}>
				<h2>
					{t('basket_title')}, {card.length} {t('product')}
				</h2>
				<div className={styles.placing__row}>
					<div className={styles.placing__products}>
						{card.map(item => (
							<div key={item.id} className={styles.product}>
								<div className={styles.product__img}>
									<img src={imageLik(item.imageLink[0])} alt={item.name} />
								</div>
								<div className={styles.product__info}>
									<Link href={`card/${item.id}`} className={styles.product__title}>
										{item.name}
									</Link>
									<div className={styles.product__price_pc}>
										<BasketCount card={item} />
										<span>
											{formatPrice(item.price)} сум /{t('unit')}.
										</span>
									</div>
									<button
										onClick={() => handlerRemove(item.id)}
										className={styles.product__remove}
										type='button'
									>
										<MdDelete /> {t('delete')}
									</button>
									<h3>
										{formatPrice(item.price * Number(getLocalQuantity(item.id)?.orderQuantity))} Сум
									</h3>
								</div>
							</div>
						))}
					</div>
					<div className={styles.placing__result}>
						<h3>{t('your_order')}</h3>
						<div className={styles.placing__order_info}>
							<div className={styles.placing__order_product}>
								<p>
									{t('goods')} ({card.length}):
								</p>
								<p>{formatPrice(countBasketPrice(basket))} сум</p>
							</div>
							<button type='button'>
								<Link href='/order/basket'>{t('placing_an_order')}</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BasketCard
