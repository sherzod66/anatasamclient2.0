'use client'
import { FC, useState } from 'react'
import styles from './changeLang.module.scss'
import { VscChevronDown } from 'react-icons/vsc'
import cn from 'clsx'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'
import i18nConfig from '../../../../../i18nConfig'
const HeaderLang: FC = () => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const { i18n } = useTranslation()
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()

	const handleChange = (e: string) => {
		const newLocale = e

		// set cookie for next-i18n-router
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = '; expires=' + date.toUTCString()
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

		// redirect to the new locale path
		if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
			router.push('/' + newLocale + currentPathname)
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
		}

		router.refresh()
	}
	return (
		<div className={styles.header__lang}>
			<div
				onClick={() => setIsShow(!isShow)}
				className={cn(styles.choose__lang, styles[currentLocale])}
			>
				<p>
					{currentLocale.toUpperCase()}
					<VscChevronDown className={styles.icon} />
				</p>
				<ul className={cn(styles.choose__lang_list, { [styles.active]: isShow })}>
					<p onClick={() => handleChange('ru')}>RU</p>
					<p onClick={() => handleChange('en')}>EN</p>
				</ul>
			</div>
		</div>
	)
}

export default HeaderLang
