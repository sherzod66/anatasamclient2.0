'use client'
import Loader from '@/components/ui/Loader/Loader'
import { useGetAllUsersQuery } from '@/lib/api/user.api'
import { FC, use, useEffect, useState } from 'react'
import styles from './adminDashboard.module.scss'
import { FaUser } from 'react-icons/fa'
import cn from 'clsx'
import { IUser } from '@/types/user.type'
import UsersFilter from '../admin filter data/UsersFilter'
import { userDefaultValue } from '../../profile/profile content/userDefault'
import EditModelUser from '@/components/ui/admin edit/EditModelUser'
import { useGetUserQuery } from '@/lib/api/api'

const AdminAllUser: FC = () => {
	const { data: globalData, isLoading } = useGetAllUsersQuery(null)
	const { data: user } = useGetUserQuery(undefined)
	const [data, setData] = useState<IUser[] | undefined>([])
	const [edit, setEdit] = useState<{ isShow: boolean; data: IUser }>({
		isShow: false,
		data: userDefaultValue
	})
	useEffect(() => setData(globalData), [globalData])
	return (
		<>
			{isLoading && <Loader />}
			{edit.isShow && <EditModelUser data={edit.data} setEdit={setEdit} />}
			{user ? (
				user.role === 'DIRECTOR' ? (
					<>
						<UsersFilter globalData={globalData} setData={setData} />
						{data ? (
							data.length > 0 ? (
								data.map(user => (
									<div key={user.id} className={cn(styles.dashboard__row, styles.edit)}>
										<div className={styles.dashboard__column}>
											<FaUser /> {user.name ? user.name : 'unknown'}
										</div>
										<div className={styles.dashboard__column}>
											<strong>{user.phoneNumber}</strong>
										</div>
										<button
											type='button'
											onClick={() =>
												setEdit(prev => ({
													...prev,
													isShow: !edit.isShow,
													data: user
												}))
											}
											className={cn(styles.dashboard__button, styles.edit)}
										>
											Info
										</button>
										<button type='button' className={cn(styles.dashboard__button, styles.delete)}>
											Delete
										</button>
									</div>
								))
							) : (
								<h2>Users not found</h2>
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

export default AdminAllUser
