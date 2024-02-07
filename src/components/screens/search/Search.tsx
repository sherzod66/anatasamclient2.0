'use client'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './search.module.scss'
import { ICard } from '@/types/card.type'
import { LuSearch } from 'react-icons/lu'
import Loader from '@/components/ui/Loader/Loader'
import Link from 'next/link'
import { imageLik } from '@/util/imageLinkHalper'
import { formatPrice } from '@/util/formatPrice'
import { SearchCard } from '@/server api/search'
import { useTranslation } from 'react-i18next'

const Search: FC = () => {
	const [cards, setCards] = useState<ICard[] | []>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { t } = useTranslation()
	const handlerResponse = async (event: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true)
		const response = await SearchCard(event.target.value)
		setIsLoading(false)
		setCards(response)
	}
	return (
		<>
			<section className={styles.search}>
				<div className={styles.search__container}>
					<div className={styles.search__header}>
						<div className={styles.search__input}>
							<input placeholder={t('search')} onChange={handlerResponse} type='text' />
							<p>
								<LuSearch />
							</p>
						</div>
					</div>
					<main className={styles.search__body}>
						{isLoading && <Loader />}
						<div className={styles.search__row}>
							{cards!.length > 0
								? cards?.map(card => (
										<Link key={card.id} className={styles.search__column} href={`card/${card.id}`}>
											<div className={styles.search__item}>
												<div className={styles.search__card_img}>
													<img src={imageLik(card.imageLink[0])} alt={card.name} />
												</div>
												<div className={styles.search__card_info}>
													<h3>{card.name}</h3>
													<p>{formatPrice(card.price)} сум</p>
												</div>
											</div>
										</Link>
								  ))
								: ''}
						</div>
					</main>
				</div>
			</section>
		</>
	)
}

export default Search
