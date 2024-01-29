"use client";
import { ILocalBasket } from "@/types/localStorage.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ILocalBasket[] = [
  { cardId: 0, orderQuantity: 0, cardPrice: 0 },
];

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    countBasket: (state, { payload }: PayloadAction<ILocalBasket[]>) => {
      state.length = 0;
      state.push(...payload);
    },
  },
});

export const { actions, reducer } = basketSlice;
