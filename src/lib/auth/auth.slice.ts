import { IAuth } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../api/api helper/apiCookies.helper";

const initialState: IAuth = {
  auth: null,
  isAdmin: false,
  token: getToken(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    editAuth: (state, { payload }: PayloadAction<IAuth>) => {
      state.auth = payload.auth;
      state.isAdmin = payload.isAdmin;
      state.token = payload.token;
    },
  },
});

export const { actions, reducer } = authSlice;
