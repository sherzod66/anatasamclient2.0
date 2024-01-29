'use client'
import { FC, useEffect, useState } from 'react'
import Loader from '@/components/ui/Loader/Loader'
import { useDeleteCardMutation, useGetCardsAdminQuery } from '@/lib/api/card.api'
import styles from './adminDashboard.module.scss'
import cn from 'clsx'
import { imageLik } from '@/util/imageLinkHalper'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import Link from 'next/link'
import { formatPrice } from '@/util/formatPrice'
import ModelEdit from '@/components/ui/admin edit/EditModel'
import { ICard } from '@/types/card.type'
import { cardDefaultValue } from '../../card/cardDefaultValue'
import InvitationFilter from '../admin filter data/InvitationFilter'
import { lazyImage } from '@/util/lazyImage'
import { useGetUserQuery } from '@/lib/api/api'

const AdminInvitation: FC = () => {
	const { data: globalData, isLoading } = useGetCardsAdminQuery(null)
	const [data, setData] = useState<ICard[] | undefined>([])
	useEffect(() => setData(globalData), [globalData])
	useEffect(() => lazyImage(), [data])
	const [deleteCard, { isLoading: loading }] = useDeleteCardMutation()
	const { data: user } = useGetUserQuery(undefined)
	const [edit, setEdit] = useState<{ isShow: boolean; data: ICard }>({
		isShow: false,
		data: cardDefaultValue
	})
	return (
		<>
			{isLoading && <Loader />}
			{loading && <Loader />}
			{edit.isShow && <ModelEdit setEdit={setEdit} data={edit.data} />}
			{user ? (
				user.role === 'DIRECTOR' || user.role === 'SALESMAN' ? (
					<>
						<InvitationFilter globalDate={globalData} setData={setData} />
						{data ? (
							data.length > 0 ? (
								data.map(card => (
									<div key={card.id} className={styles.dashboard__row}>
										<Link href={`/card/${card.id}`} className={styles.dashboard__image}>
											<img
												draggable={false}
												data-src={imageLik(card.imageLink[0])}
												src={'/icon/anatasamLoader.png'}
												alt={card.name}
											/>
											<p>{card.name}</p>
										</Link>
										<p className={styles.dashboard__time}>Price: {formatPrice(card.price)}</p>
										<p className={styles.dashboard__time}>
											{new Date(card.createdAt).toLocaleDateString()}
										</p>
										<p className={styles.dashboard__time}>Oders: {card.orders}</p>
										<p className={styles.dashboard__time}>In stock: {card.quantity}</p>
										<button
											type='button'
											className={cn(styles.dashboard__button, styles.edit)}
											onClick={() =>
												setEdit(prev => ({
													...prev,
													data: card,
													isShow: !edit.isShow
												}))
											}
										>
											Edit <MdModeEdit />
										</button>
										<button
											type='button'
											onClick={() => {
												const confirm = window.confirm('Are you sure you want to delete the card?')
												if (confirm) deleteCard({ id: `${card.id}` })
											}}
											className={cn(styles.dashboard__button, styles.delete)}
										>
											Delete <MdDelete />
										</button>
									</div>
								))
							) : (
								<h2>Not found</h2>
							)
						) : (
							''
						)}
					</>
				) : (
					<h1>You don't have enough rights</h1>
				)
			) : (
				<h1>Error</h1>
			)}
		</>
	)
}

export default AdminInvitation
