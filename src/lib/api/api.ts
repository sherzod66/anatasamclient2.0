import { IUser } from '@/types/user.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TAuth, getUserHelper, postAuthKey, postUserAuth } from './api helper/api.heper'
import { getToken } from './api helper/apiCookies.helper'

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['User', 'Basket', 'Card', 'Orders', 'Electronic'],
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL_RESPONSE
	}),
	endpoints: builder => ({
		getUser: builder.query<IUser, string | undefined>({
			query: token => ({
				method: 'GET',
				url: getUserHelper(),
				headers: { Authorization: `Bearer ${token ? token : getToken()}` }
			}),
			providesTags: () => [{ type: 'User' }]
		}),
		auth: builder.mutation<TAuth, string>({
			query: numberPhone => ({
				url: postUserAuth(), //'https://jsonplaceholder.typicode.com/posts'
				method: 'POST',
				body: {
					phoneNumber: `+998${numberPhone}`
				}
			})
		}),
		confirmation: builder.mutation<IUser, string>({
			query: key => ({
				url: `${postAuthKey()}${key}`,
				method: 'POST'
			}),
			invalidatesTags: () => [{ type: 'User' }]
		})
	})
})

export const { useGetUserQuery, useAuthMutation, useConfirmationMutation } = apiSlice
