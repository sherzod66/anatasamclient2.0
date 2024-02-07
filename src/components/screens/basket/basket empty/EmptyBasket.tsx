'use client'
import { FC } from 'react'
import styles from './basketEmpty.module.scss'
import { BsBasket } from 'react-icons/bs'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
const EmptyBasket: FC = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.empty}>
			<div className={styles.empty__body}>
				<h1>{t('basket')}</h1>
				<p className={styles.empty__icon}>
					<BsBasket />
				</p>
				<h3>{t('empty_basket')}</h3>
				<p className={styles.empty__choice}>{t('basket_description')}</p>
				<button type='button'>
					<Link href='/'>{t('home')}</Link>
				</button>
			</div>
		</div>
	)
}

export default EmptyBasket
