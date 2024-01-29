import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import { reducer as authReducer } from "./auth/auth.slice";
import { reducer as basketReducer } from "./basket/basket.slice";

export const reducers = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  basket: basketReducer,
});
