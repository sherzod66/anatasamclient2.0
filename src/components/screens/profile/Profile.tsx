'use client'
import Layout from '@/components/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { FC, useState } from 'react'
import Auth from './authPage/Auth'
import ProfileDetail from './profile content/ProfileDetail'
import { useTranslation } from 'react-i18next'
const ProfilePage: FC = () => {
	const { auth, isAdmin } = useAuth()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { t } = useTranslation()
	return (
		<>
			<>{isOpen && !auth && <Auth setIsOpen={setIsOpen} />}</>
			{auth && !isAdmin ? (
				<ProfileDetail />
			) : (
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '90px',
						height: 'calc(100vh - 90px)'
					}}
				>
					<button className='global-auth-bt' onClick={() => setIsOpen(!isOpen)} type='button'>
						{t('auth')}
					</button>
				</div>
			)}
		</>
	)
}

export default ProfilePage
