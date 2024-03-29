import { IOrderInfo } from '@/types/invitationInfo.type'
import { apiSlice } from './api'
import {
	checkPay,
	createOrder,
	deleteOrder,
	getAllOrders,
	orderChangeStatus
} from './api helper/api.heper'
import { getToken } from './api helper/apiCookies.helper'
import {
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
		deleteOrder: builder.mutation<{ status: number; message: string }, { id: number }>({
			query: ({ id }) => ({
				url: `${deleteOrder()}/${id}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getToken()}`
				}
			}),
			invalidatesTags: () => [{ type: 'Orders' }, { type: 'User' }]
		})
	})
})

export const {
	useGetOrdersQuery,
	useCreateOrderMutation,
	usePaymentVerificationQuery,
	useChangeStatusMutation,
	useDeleteOrderMutation
} = ordersApi
