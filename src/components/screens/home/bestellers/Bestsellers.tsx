import { FC } from 'react'
import styles from './bestsellers.module.scss'
import initTranslations from '@/app/i18n'
import { GetBestsellers } from '@/server api/getCard'
import Link from 'next/link'
import { imageLik } from '@/util/imageLinkHalper'
import { formatPrice } from '@/util/formatPrice'

const Bestsellers: FC<{ locale: string }> = async ({ locale }) => {
	const { t } = await initTranslations(locale, ['layout'])
	const data = await GetBestsellers()
	return (
		<>
			{data ? (
				<section className={styles.bestseller}>
					<div className={styles.bestseller__container}>
						<h1>{t('bestsellers')}</h1>
						<div className={styles.invitation__row}>
							{data.map(card => (
								<div key={card.id} className={styles.invitation__column}>
									<Link href={'/card/' + card.id} className={styles.invitation__item}>
										<div className={styles.invitation__img}>
											<img src={imageLik(card.imageLink[0])} />
										</div>
										<div className={styles.invitation__text}>{card.name}</div>
										<div className={styles.invitation__price}>
											{formatPrice(card.price)} {t('sum')}
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				</section>
			) : (
				''
			)}
		</>
	)
}

export default Bestsellers
