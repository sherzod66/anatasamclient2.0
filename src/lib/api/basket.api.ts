import { ICard } from "@/types/card.type";
import { apiSlice } from "./api";
import { getToken } from "./api helper/apiCookies.helper";

export const basketApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<ICard[], string | undefined>({
      query: (token) => ({
        method: "GET",
        url: "/basket",
        headers: { Authorization: `Bearer ${token ? token : getToken()}` },
      }),
      providesTags: () => [{ type: "Basket" }],
    }),
    toggleBasket: builder.mutation<ICard[], { cardId: number; token?: string }>(
      {
        query: ({ cardId, token }) => ({
          url: `/basket/toggle-basket/${cardId}`,
          method: "POST",
          headers: { Authorization: `Bearer ${token ? token : getToken()}` },
        }),
        invalidatesTags: () => [{ type: "Basket" }],
      }
    ),
  }),
});

export const { useGetBasketQuery, useToggleBasketMutation } = basketApi;
