import { useGetBasketQuery } from '@/lib/api/basket.api'
import { IInvitationInfo, IOrderInfo } from '@/types/invitationInfo.type'
import { FormEvent, use, useEffect, useMemo, useState } from 'react'
import { orderBasketValidation, refactorQueryData } from './refactorQueryData'
import { useGetUserQuery } from '@/lib/api/api'
import { getAllLocal, removeLocalBasket } from '@/config/localStorage.helper'
import { countBasketPrice } from '@/util/contBasketPrice'
import { useCreateOrderMutation } from '@/lib/api/orders.api'
import { clickRedirect, handelMultiMutationData } from '../order now/handelMutationData'
import { openNotification } from '@/components/ui/alerts/notification'
import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import { useActions } from '@/hooks/useActions'

export const useOrderBasketInfo = () => {
	const { data, isLoading } = useGetBasketQuery(undefined)
	const { push } = useRouter()
	const { data: user } = useGetUserQuery(undefined)
	const [createOrder, { isLoading: handelLoading, data: response }] = useCreateOrderMutation()
	const [api, contextHolder] = notification.useNotification()
	const basket = getAllLocal()
	const { countBasket } = useActions()
	const [invitationInfo, setInvitationInfo] = useState<IInvitationInfo[]>([])
	const [paymentInfo, setPaymentInfo] = useState<IOrderInfo>({
		invitationInfo: [],
		orderPrice: 0,
		paymentMethod: 'UZCARD',
		userName: '',
		userPhone: '',
		paid: 0,
		basket: true
	})
	useEffect(() => {
		if (data) {
			setInvitationInfo(refactorQueryData(data, basket ? basket : []))
			setPaymentInfo(prev => ({
				...prev,
				orderPrice: countBasketPrice(basket ? basket : []),
				userName: user ? (user.isAdmin ? '' : user.name ? user.name : 'unknown') : '',
				userPhone: user ? (user.isAdmin ? '' : user.phoneNumber) : ''
			}))
		}
	}, [data])
	useEffect(
		() =>
			setPaymentInfo(prev => ({
				...prev,
				userName: user ? (user.isAdmin ? '' : user.name ? user.name : 'unknown') : '',
				userPhone: user ? (user.isAdmin ? '' : user.phoneNumber) : ''
			})),
		[user]
	)
	useEffect(() => {
		if (response) {
			if (user?.isAdmin) {
				removeLocalBasket()
				countBasket([])
				push('/manager/orders')
			} else {
				clickRedirect(response?.orderPrice, response?.id, response?.paymentMethod)
			}
		}
	}, [response])
	const handelSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (orderBasketValidation(invitationInfo)) {
			if (paymentInfo.orderPrice >= 1000) {
				createOrder(handelMultiMutationData(invitationInfo, paymentInfo))
			}
			//console.log(handelMultiMutationData(invitationInfo, paymentInfo));
		} else {
			openNotification('top', api)
		}
	}
	return useMemo(
		() => ({
			data,
			invitationInfo,
			setInvitationInfo,
			isLoading,
			setPaymentInfo,
			paymentInfo,
			user,
			response,
			contextHolder,
			handelSubmitForm,
			handelLoading
		}),
		[data, invitationInfo, paymentInfo, user, api, response, handelLoading]
	)
}
