import { apiSlice } from './api'
import { getToken } from './api helper/apiCookies.helper'
import { electronicCreate, electronicDelete, electronicGetAll } from './api helper/api.heper'
import { IElectronic, IElectronicCreate } from '@/types/electronic.type'
import { IOrderChangeStatusResult } from '@/types/order.type'

export const electronicApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllElectronic: builder.query<IElectronic[], null>({
			query: () => ({
				url: electronicGetAll(),
				method: 'GET',
				headers: { Authorization: `Bearer ${getToken()}` }
			}),
			providesTags: () => [{ type: 'Electronic' }]
		}),
		createElectronic: builder.mutation<IElectronic, IElectronicCreate>({
			query: body => ({
				url: electronicCreate(),
				method: 'POST',
				headers: { Authorization: `Bearer ${getToken()}` },
				body
			}),
			invalidatesTags: () => [{ type: 'Electronic' }]
		}),
		deleteElectronic: builder.mutation<IOrderChangeStatusResult, { id: string }>({
			query: ({ id }) => ({
				url: `${electronicDelete()}/${id}`,
				method: 'DELETE',
				headers: { Authorization: `Bearer ${getToken()}` }
			}),
			invalidatesTags: () => [{ type: 'Electronic' }]
		})
	})
})

export const {
	useGetAllElectronicQuery,
	useCreateElectronicMutation,
	useDeleteElectronicMutation
} = electronicApi
