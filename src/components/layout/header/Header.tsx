'use client'
import { FC } from 'react'
import styles from './header.module.scss'
import { LuSearch, LuShoppingBag } from 'react-icons/lu'
import { FaRegUser } from 'react-icons/fa'
import Link from 'next/link'
import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useGetBasketQuery } from '@/lib/api/basket.api'
import { useTranslation } from 'react-i18next'
import HeaderLang from './lang/HeaderLang'

const Header: FC = () => {
	const pathname = usePathname()
	const auth = useAuth()
	const { data } = useGetBasketQuery(auth.token)
	const { t } = useTranslation()
	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__row}>
						<Link href={'/'} className={styles.header__logo}>
							<picture>
								<source srcSet='/icon/logo.png' type='image/png' media='(min-width:431px)' />
								<img src='/icon/logoMobile.png' alt='Anatasam' />
							</picture>
						</Link>
						<nav className={styles.header__nav}>
							<div className={styles.header__info}>
								<a href='tel:+998915229627'>+998 91 522 96 27</a>
								<p>Пн. - Сб.: с 09:00 до 19:00</p>
							</div>
							<ul className={styles.header__list}>
								<li>
									<Link
										className={cn(styles.header__link, {
											[styles.active]: pathname.includes('search')
										})}
										href={'/search'}
									>
										<LuSearch /> <p>{t('search')}</p>
									</Link>
								</li>
								<li>
									<Link
										className={cn(styles.header__link, {
											[styles.active]: pathname.includes('basket')
										})}
										href={'/basket'}
									>
										<LuShoppingBag /> <p>{t('basket')}</p>
									</Link>
									<span>{data ? data.length : 0}</span>
								</li>
								<li>
									<Link
										className={cn(styles.header__link, {
											[styles.active]: pathname.includes('profile')
										})}
										href={auth.isAdmin ? '/manager' : '/profile'}
									>
										<FaRegUser /> <p>{auth.isAdmin ? t('admin') : t('profile')}</p>
									</Link>
								</li>
							</ul>
							<HeaderLang />
						</nav>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
