'use client'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './auth.module.scss'
import Loader from '@/components/ui/Loader/Loader'
import AuthSendForm from './AuthSendForm'
import AuthKeyForm from './AuthKeyForm'
import { IoMdArrowBack } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

export type TStateType = {
	isLoading: boolean
	isError: boolean
	step: boolean
	phone: string
	serverError: boolean
}

type TAuthProps = {
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
const Auth: FC<TAuthProps> = ({ setIsOpen }) => {
	const [allInfo, setAllInfo] = useState<TStateType>({
		isLoading: false,
		isError: false,
		step: false,
		phone: '',
		serverError: false
	})
	return (
		<section
			className={styles.auth}
			onClick={e => !(e.target as HTMLElement).closest('#auth-body') && setIsOpen(false)}
		>
			<div id='auth-body' className={styles.auth__body}>
				<nav className={styles.auth__navigation}>
					{allInfo.step && (
						<button onClick={() => setAllInfo(prev => ({ ...prev, step: false }))} type='button'>
							<IoMdArrowBack />
						</button>
					)}
					<button onClick={() => setIsOpen(false)}>
						<IoClose />
					</button>
				</nav>
				{allInfo.isLoading && <Loader />}
				{!allInfo.step && <AuthSendForm allInfo={allInfo} setAllInfo={setAllInfo} />}
				{allInfo.step && <AuthKeyForm allInfo={allInfo} setAllInfo={setAllInfo} />}
			</div>
		</section>
	)
}

export default Auth
