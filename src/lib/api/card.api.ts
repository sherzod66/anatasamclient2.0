import { ICard, ICardCreate, ICardEdit } from '@/types/card.type'
import { apiSlice } from './api'
import {
	createCard,
	deleteCard,
	deleteCardImage,
	getCardById,
	getCardByTag,
	pushCardImage,
	updateCard
} from './api helper/api.heper'
import { getToken } from './api helper/apiCookies.helper'

export const cardApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getCards: builder.query<ICard[], null>({
			query: () => '/cards/get-cards',
			keepUnusedDataFor: 10
		}),
		getCardsAdmin: builder.query<ICard[], null>({
			query: () => ({
				url: '/cards/get-cards-admin',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				keepUnusedDataFor: 5
			}),
			providesTags: () => [{ type: 'Card' }]
		}),
		getCardByTag: builder.query<ICard[], { tag: string }>({
			query: ({ tag }) => ({
				url: `${getCardByTag()}/${tag}`,
				method: 'GET'
			})
		}),
		createCard: builder.mutation<ICard, ICardCreate>({
			query: card => ({
				url: createCard(),
				method: 'POST',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body: card
			}),
			invalidatesTags: () => [{ type: 'Card' }]
		}),
		updateCard: builder.mutation<ICard, { id: number; body: ICardEdit }>({
			query: ({ id, body }) => ({
				url: `${updateCard()}/${id}`,
				method: 'PUT',
				headers: { Authorization: `Bearer ${getToken()}` },
				body
			}),
			invalidatesTags: () => [{ type: 'Card' }]
		}),
		deleteCard: builder.mutation<ICard[], { id: string }>({
			query: id => ({
				url: deleteCard() + id.id,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getToken()}`
				}
			}),
			invalidatesTags: () => [{ type: 'Card' }]
		}),
		deleteCardImage: builder.mutation<ICard, { cardId: number; imagePath: string }>({
			query: body => ({
				url: deleteCardImage(),
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Card' }]
		}),
		pushImage: builder.mutation<ICard, { cardId: number; imagePath: string }>({
			query: body => ({
				url: pushCardImage(),
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${getToken()}`
				},
				body
			}),
			invalidatesTags: () => [{ type: 'Card' }]
		}),
		getCardById: builder.query<ICard, { id: number }>({
			query: ({ id }) => ({
				url: `${getCardById()}/${id}`,
				method: 'GET'
			}),
			providesTags: () => [{ type: 'Card' }]
		})
	})
})

export const {
	useGetCardsQuery,
	useGetCardsAdminQuery,
	useCreateCardMutation,
	useDeleteCardMutation,
	useUpdateCardMutation,
	useGetCardByTagQuery,
	useDeleteCardImageMutation,
	useGetCardByIdQuery,
	usePushImageMutation
} = cardApi
