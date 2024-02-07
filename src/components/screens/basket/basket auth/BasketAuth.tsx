'use client'
import { FC, useState } from 'react'
import styles from './basketAuth.module.scss'
import Auth from '../../profile/authPage/Auth'
import { useTranslation } from 'react-i18next'
const BasketAuth: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { t } = useTranslation()
	return (
		<>
			{isOpen && <Auth setIsOpen={setIsOpen} />}
			<div className={styles.basketAuth}>
				<div className={styles.basketAuth__body}>
					<h2>{t('auth_description')}</h2>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className={styles.basketAuth__button}
						type='button'
					>
						{t('auth')}
					</button>
				</div>
			</div>
		</>
	)
}

export default BasketAuth
