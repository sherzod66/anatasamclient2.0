import { IOrderInfo } from '@/types/invitationInfo.type'
import { apiSlice } from './api'
import {
	changeOrderPhoneNumber,
	changeOrderPrice,
	checkPay,
	createOrder,
	deleteInvitationInfo,
	deleteOrder,
	getAllOrders,
	orderChangeStatus,
	orderEdit
} from './api helper/api.heper'
import { getToken } from './api helper/apiCookies.helper'
import {
	IDeleteOrderInfoQuery,
	IEditOrderRequest,
	IOrder,
	IOrderChangeStatusRequest,
	IOrderChangeStatusResult,
	TPaymentVerificationResult
} from '@/types/order.type'

export const ordersApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getOrders: builder.query<IOrder[], null>({
			query: () => ({
				method: 'GET',
				url: getAllOrders(),
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				keepUnusedDataFor: 5
			}),
			providesTags: () => [{ type: 'Orders' }]
		}),
		createOrder: builder.mutation<IOrder, IOrderInfo>({
			query: body => ({
				url: createOrder(),
				method: 'POST',
				body,
				headers: {
					Authorization: `Bearer ${getToken()}`
				}
			}),
			invalidatesTags: () => [{ type: 'Card' }, { type: 'Orders' }, { type: 'Basket' }]
		}),
		paymentVerification: builder.query<TPaymentVerificationResult, { paymentId: string }>({
			query: ({ paymentId }) => `${checkPay()}/${paymentId}`
		}),
		changeStatus: builder.mutation<IOrderChangeStatusResult, IOrderChangeStatusRequest>({
			query: body => ({
				url: orderChangeStatus(),
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Orders' }]
		}),
		editOrder: builder.mutation<{ success: boolean }, IEditOrderRequest>({
			query: body => ({
				url: orderEdit(),
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${getToken()}`,
					'Content-Type': 'application/json'
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Orders' }]
		}),
		deleteOrder: builder.mutation<{ status: number; message: string }, { id: number }>({
			query: ({ id }) => ({
				url: `${deleteOrder()}/${id}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getToken()}`
				}
			}),
			invalidatesTags: () => [{ type: 'Orders' }, { type: 'User' }]
		}),
		deleteInvitationInfo: builder.mutation<{ success: number }, IDeleteOrderInfoQuery>({
			query: body => ({
				url: deleteInvitationInfo(),
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Orders' }]
		}),
		changePrice: builder.mutation<IOrder, { orderId: number; price: number }>({
			query: body => ({
				url: changeOrderPrice(),
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Orders' }]
		}),
		changePhoneNumber: builder.mutation<IOrder, { orderId: number; phoneNumber: string }>({
			query: body => ({
				url: changeOrderPhoneNumber(),
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Orders' }]
		})
	})
})

export const {
	useGetOrdersQuery,
	useCreateOrderMutation,
	usePaymentVerificationQuery,
	useChangeStatusMutation,
	useDeleteOrderMutation,
	useEditOrderMutation,
	useDeleteInvitationInfoMutation,
	useChangePriceMutation,
	useChangePhoneNumberMutation
} = ordersApi
