import { useGetBasketQuery } from '@/lib/api/basket.api'
import { IInvitationInfo, IOrderInfo } from '@/types/invitationInfo.type'
import { FormEvent, useEffect, useMemo, useState } from 'react'
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
import { useTranslation } from 'react-i18next'
import { paymentInfoValidation } from '../order now/orderNowValidation'

export const useOrderBasketInfo = () => {
	const { data, isLoading } = useGetBasketQuery(undefined)
	const { push } = useRouter()
	const { t } = useTranslation()
	const { data: user } = useGetUserQuery(undefined)
	const [createOrder, { isLoading: handelLoading, data: response }] = useCreateOrderMutation()
	const [api, contextHolder] = notification.useNotification()
	const basket = getAllLocal()
	const { countBasket } = useActions()
	const [invitationInfo, setInvitationInfo] = useState<IInvitationInfo[]>([])
	const [paymentInfo, setPaymentInfo] = useState<IOrderInfo>({
		invitationInfo: [],
		orderPrice: 0,
		paymentMethod: user ? (user.isAdmin ? 'CASH' : 'UZCARD') : 'CASH',
		userName: '',
		userPhone: user ? (user.isAdmin ? '+998' : user.phoneNumber) : '',
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
				userPhone: user ? (user.isAdmin ? '+998' : user.phoneNumber) : ''
			}))
		}
	}, [data])
	useEffect(
		() =>
			setPaymentInfo(prev => ({
				...prev,
				userName: user ? (user.isAdmin ? '' : user.name ? user.name : 'unknown') : '',
				userPhone: user ? (user.isAdmin ? '+998' : user.phoneNumber) : ''
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
		if (orderBasketValidation(invitationInfo) && paymentInfoValidation(paymentInfo)) {
			if (paymentInfo.orderPrice >= 1000) {
				createOrder(handelMultiMutationData(invitationInfo, paymentInfo))
			}
			//console.log(handelMultiMutationData(invitationInfo, paymentInfo));
		} else {
			openNotification('top', api, t('order_notification_m'), t('order_notification_d'))
		}
	}
	const copyInfo = () => {
		const firstElement = invitationInfo.slice(0, 1)[0]
		const allCardCopy = [...invitationInfo]
		const payloadData = allCardCopy.map((elem): IInvitationInfo => {
			if (elem.cardId !== firstElement.cardId) {
				return {
					cardId: elem.cardId,
					cardImage: elem.cardImage,
					cardName: elem.cardName,
					cardPrice: elem.cardPrice,
					comment: elem.comment,
					date: firstElement.date,
					family: firstElement.family,
					lang: elem.lang,
					luckyOnes: firstElement.luckyOnes,
					quantity: elem.quantity,
					restaurant: firstElement.restaurant,
					time: firstElement.time
				}
			} else {
				return elem
			}
		})
		setInvitationInfo([...payloadData])
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
			handelLoading,
			copyInfo,
			t
		}),
		[data, invitationInfo, paymentInfo, user, api, response, handelLoading]
	)
}
