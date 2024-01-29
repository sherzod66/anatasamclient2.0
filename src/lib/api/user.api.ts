import { IUpdateUser, IUser } from "@/types/user.type";
import { apiSlice } from "./api";
import {
  getAllUsers,
  updateUser,
  updateUserName,
} from "./api helper/api.heper";
import { getToken } from "./api helper/apiCookies.helper";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], null>({
      query: () => ({
        method: "GET",
        url: getAllUsers(),
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: () => [{ type: "User" }],
    }),
    updateUser: builder.mutation<IUser, { id: number; body: IUpdateUser }>({
      query: ({ id, body }) => ({
        url: `${updateUser()}/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body,
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),
    updateUserName: builder.mutation<IUser, { name: string }>({
      query: ({ name }) => ({
        url: updateUserName(),
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: { name },
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateUserNameMutation,
} = usersApi;
