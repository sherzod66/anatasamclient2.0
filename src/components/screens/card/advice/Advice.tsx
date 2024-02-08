'use client'
import { FC, useEffect, useMemo, useState } from 'react'
import styles from './advice.module.scss'
import { useGetCardByTagQuery } from '@/lib/api/card.api'
import { imageLik } from '@/util/imageLinkHalper'
import { formatPrice } from '@/util/formatPrice'
import Link from 'next/link'
import { lazyImage } from '@/util/lazyImage'
import Loader from '@/components/ui/Loader/Loader'
import { ICard } from '@/types/card.type'
import { useTranslation } from 'react-i18next'

const Advice: FC<{ type: string; id: number }> = ({ type, id }) => {
	let tag = type.split(' ')[0]
	const { t } = useTranslation()
	const [data, setData] = useState<ICard[]>([])
	const { data: globalData, isLoading, isError } = useGetCardByTagQuery({ tag })
	const searchIndex = useMemo(
		() => (globalData ? globalData.findIndex(elem => elem.id === id) : -1),
		[globalData]
	)
	useEffect(() => {
		if (globalData) {
			const copyData = [...globalData]
			copyData.splice(searchIndex, 1)
			setData(copyData)
		}
	}, [globalData])
	useEffect(() => lazyImage(), [data])
	return (
		<section className={styles.advice}>
			<div className={styles.advice__container}>
				{isLoading && <Loader />}
				<h1>{t('similar')}</h1>
				<div className={styles.invitation__row}>
					{globalData
						? data.map(card => (
								<div key={card.id} className={styles.invitation__column}>
									<Link href={'/card/' + card.id} className={styles.invitation__item}>
										<div className={styles.invitation__img}>
											<img data-src={imageLik(card.imageLink[0])} src='/icon/anatasamLoader.png' />
										</div>
										<div className={styles.invitation__text}>{card.name}</div>
										<div className={styles.invitation__price}>{formatPrice(card.price)}</div>
									</Link>
								</div>
						  ))
						: ''}
				</div>
			</div>
		</section>
	)
}

export default Advice
