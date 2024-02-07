'use client'
import { FC, useState } from 'react'
import styles from './profileDetail.module.scss'
import { useGetUserQuery } from '@/lib/api/api'
import { getToken, removeToken } from '@/lib/api/api helper/apiCookies.helper'
import { FaAngleRight } from 'react-icons/fa'
import { useActions } from '@/hooks/useActions'
import ProfileOrder from './ProfileOrder'
import { MdEdit } from 'react-icons/md'
import { Button, Input, Select, message } from 'antd'
import { useUpdateUserNameMutation } from '@/lib/api/user.api'
import { useTranslation } from 'react-i18next'
import i18nConfig from '../../../../../i18nConfig'
import { usePathname, useRouter } from 'next/navigation'
const ProfileDetail: FC = () => {
	const { t, i18n } = useTranslation()
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()
	const { data } = useGetUserQuery(getToken())
	const { editAuth } = useActions()
	const [updateName] = useUpdateUserNameMutation()
	const [isShow, setIsShow] = useState<{ isShow: boolean; value: string }>({
		isShow: false,
		value: ''
	})
	const handelClick = () => {
		updateName({ name: isShow.value })
			.then(() => {
				message.success(t('successfully_changed'))
				setIsShow(prev => ({ ...prev, isShow: !isShow.isShow }))
			})
			.catch(() => message.error(t('change_name_error')))
	}
	const changeLang = (value: string) => {
		const newLocale = value

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
		<main className={styles.profile}>
			<div className={styles.profile__container}>
				<div className={styles.profile__header}>
					<div className={styles.profile__user_image}>
						<img src='/icon/user.png' alt='user' />
					</div>
					<div className={styles.profile__user_info}>
						<h3>
							{data?.name}{' '}
							<button onClick={() => setIsShow(prev => ({ ...prev, isShow: !isShow.isShow }))}>
								<MdEdit />
							</button>
						</h3>

						<h5>{data?.phoneNumber} </h5>
					</div>
					{isShow.isShow && (
						<div className={styles.change__user_name}>
							<Input
								placeholder='Антон'
								type='text'
								onChange={e => setIsShow(prev => ({ ...prev, value: e.target.value }))}
								style={{ marginRight: '10px', width: '200px' }}
							/>
							<Button onClick={handelClick} type='primary'>
								Изменить
							</Button>
						</div>
					)}
				</div>
				<ul className={styles.profile__list}>
					<li>
						<span>{t('your_orders')}</span>{' '}
						<span>
							<FaAngleRight />
						</span>
						<div className={styles.profile__orders}>
							{data && data?.orders.length > 0 ? (
								data.orders.map(order => <ProfileOrder order={order} key={order.id} user={data} />)
							) : (
								<p>{t('orders_not_found')}</p>
							)}
						</div>
					</li>
					<li>
						<p>{t('app_language')}</p>
						<Select
							defaultValue={currentLocale}
							onChange={value => changeLang(value)}
							style={{ maxWidth: '200px', minWidth: '100px' }}
							options={[
								{ value: 'ru', label: 'RU' },
								{ value: 'en', label: 'EN' }
							]}
						/>
					</li>
				</ul>
				<button
					className={styles.profile__logout}
					onClick={() => {
						editAuth({ auth: null, isAdmin: false, token: undefined })
						removeToken()
					}}
					type='button'
				>
					{t('logout')}
				</button>
			</div>
		</main>
	)
}

export default ProfileDetail
