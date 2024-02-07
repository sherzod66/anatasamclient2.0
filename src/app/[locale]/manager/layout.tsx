'use client'
import { useAuth } from '@/hooks/useAuth'
import styles from './adminLayout.module.scss'
import Link from 'next/link'
import { removeToken } from '@/lib/api/api helper/apiCookies.helper'
import { useActions } from '@/hooks/useActions'
import NotFound from '../../not-found'
import { dashboardBarList } from '@/assets/dashboard/dashboardList'
import { useParams } from 'next/navigation'
import { useGetUserQuery } from '@/lib/api/api'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const { id } = useParams()
	const { isAdmin } = useAuth()
	const { data } = useGetUserQuery(undefined)
	const { editAuth } = useActions()
	return (
		<>
			{isAdmin && data ? (
				<main className={styles.dashboard}>
					<section className={styles.dashboard__bar}>
						<div className={styles.dashboard__bar_body}>
							<div className={styles.dashboard__bar_logo}>
								<img src='/icon/logoMobile.png' alt='Logo' />
							</div>
							<ul className={styles.dashboard__bar_list}>
								{dashboardBarList.map(element => {
									if (element.role.includes(data.role))
										return (
											<li
												className={element.link.includes(String(id)) ? styles.active : ''}
												key={element.link}
											>
												{<element.icon className='' />}
												<Link
													title={element.translateTitle}
													className={styles.dashboard__bar_link}
													href={element.link}
												>
													{element.title}
												</Link>
											</li>
										)
								})}
							</ul>
							<button
								type='button'
								onClick={() => {
									editAuth({ auth: null, isAdmin: false, token: undefined })
									removeToken()
								}}
								className={styles.dashboard__bar_button}
							>
								Log out
							</button>
						</div>
					</section>
					<section className={styles.dashboard__content}>{children}</section>
				</main>
			) : (
				<NotFound />
			)}
		</>
	)
}
