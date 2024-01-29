import { ICard, ICardCreate, ICardEdit } from "@/types/card.type";
import { apiSlice } from "./api";
import { createCard, deleteCard, updateCard } from "./api helper/api.heper";
import { getToken } from "./api helper/apiCookies.helper";

export const cardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<ICard[], null>({
      query: () => "/cards/get-cards",
      keepUnusedDataFor: 10,
    }),
    getCardsAdmin: builder.query<ICard[], null>({
      query: () => ({
        url: "/cards/get-cards-admin",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        keepUnusedDataFor: 5,
      }),
      providesTags: () => [{ type: "Card" }],
    }),
    createCard: builder.mutation<ICard, ICardCreate>({
      query: (card) => ({
        url: createCard(),
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: card,
      }),
      invalidatesTags: () => [{ type: "Card" }],
    }),
    updateCard: builder.mutation<ICard, { id: number; body: ICardEdit }>({
      query: ({ id, body }) => ({
        url: `${updateCard()}/${id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
        body,
      }),
      invalidatesTags: () => [{ type: "Card" }],
    }),
    deleteCard: builder.mutation<ICard[], { id: string }>({
      query: (id) => ({
        url: deleteCard() + id.id,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: () => [{ type: "Card" }],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardsAdminQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardApi;
