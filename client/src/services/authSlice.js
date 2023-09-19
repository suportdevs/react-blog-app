import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "./reducer";

const BASE_URL = 'http://localhost:8000/';
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userObj) => ({
                url: '/auth/register',
                method: 'POST',
                body: userObj,
            }),
            invalidatesTags: ['Users'],
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Users'],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: "POST",
            })
        }),
        postStore: builder.mutation({
            query: (obj) => ({
                url: '/post',
                method: "POST",
                body: obj
            }),
            invalidatesTags: ['Posts'],
        })
    }),
});

export const {useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation, usePostStoreMutation} = authApi;