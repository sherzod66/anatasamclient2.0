'use client'
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react'
import cn from 'clsx'
import styles from './auth.module.scss'
import { TStateType } from './Auth'
import { useAuthMutation, useConfirmationMutation } from '@/lib/api/api'
import { useActions } from '@/hooks/useActions'
import { writeToken } from '@/lib/api/api helper/apiCookies.helper'
import { useTranslation } from 'react-i18next'
import { countrySecond } from './countrySecond'
import { MdRefresh } from 'react-icons/md'
type TAuthKeyForm = {
	setAllInfo: Dispatch<SetStateAction<TStateType>>
	allInfo: TStateType
}
const AuthKeyForm: FC<TAuthKeyForm> = ({ allInfo, setAllInfo }) => {
	const [keyValue, setKeyValue] = useState<string>('')
	const [second, setSecond] = useState<number>(60)
	const [handlerAuth, { isLoading: smsSendLoading }] = useAuthMutation()
	const { t } = useTranslation()
	const { editAuth } = useActions()
	const [sendKey, { isError, isLoading, isSuccess, data }] = useConfirmationMutation()
	useEffect(() => setAllInfo(prev => ({ ...prev, isLoading: isLoading })), [isLoading])
	useEffect(() => {
		if (isError) setAllInfo(prev => ({ ...prev, serverError: true }))
		if (isSuccess) {
			writeToken(data?.access_token as string)
			editAuth({
				auth: true,
				isAdmin: data?.isAdmin,
				token: data?.access_token
			})
			location.reload()
		}
		if (smsSendLoading) {
			setAllInfo(prev => ({ ...prev, isLoading: true }))
		} else {
			setAllInfo(prev => ({ ...prev, isLoading: false }))
		}
	}, [isError, isLoading, smsSendLoading])
	useEffect(() => countrySecond(second, setSecond), [allInfo])

	const handelSendKey = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (keyValue.length === 6) {
			await sendKey(keyValue)
		} else {
			setAllInfo(prev => ({ ...prev, isError: true }))
		}
	}
	return (
		<form onSubmit={handelSendKey} className={styles.from__key}>
			<h2>{t('enter_code')}</h2>
			<h4>
				{t('confirmation')} +998 {allInfo.phone}
			</h4>
			<div
				className={cn(styles.auth__input_key, {
					[styles.error]: allInfo.serverError
				})}
			>
				<input
					onChange={e => setKeyValue(e.target.value)}
					maxLength={6}
					type='tel'
					value={keyValue}
				/>
			</div>
			{allInfo.isError && <span>{t('error_key')}</span>}
			{allInfo.serverError && <span>{t('error_key_server')}</span>}
			<button className={styles.auth__button} type='submit'>
				{t('send')}
			</button>
			{second > 0 && <p className={styles.again_sms}>{t('again_sms', { second })}</p>}
			{second === 0 && (
				<button
					onClick={() => handlerAuth(allInfo.phone.split(' ').join('')).then(() => setSecond(60))}
					className={styles.again__button}
					type='button'
				>
					<MdRefresh />
					{t('again_send_sms')}
				</button>
			)}
		</form>
	)
}

export default AuthKeyForm
