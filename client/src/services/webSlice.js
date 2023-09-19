import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const BASE_URL = 'http://localhost:8000';

export const webApi = createApi({
    reducerPath: 'webApi',
    baseQuery: fetchBaseQuery({
        baseUrl:BASE_URL,
        // credentials: 'include', // To include cookies and authorization headers
        // mode: "no-cors",
        prepareHeaders: (headers, { getState }) => {
            // Get the token from your state
            const token = cookies.get('token');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
        }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({url: 'post'}),
        }),
        getSinglePost: builder.query({
            query: (id) => ({url: `post/${id}`}),
        }),
        storePost: builder.mutation({
            query: (postObj) => ({
                url: 'post',
                method: 'POST',
                body: postObj,
            }),
        }),
        getPostEdit: builder.query({
            query: (id) => ({url: `post?id=${id}`}),
        }),
        updatePost: builder.mutation({
            query: ({id, postObj}) => ({
                url: `post/${id}`,
                method: 'PUT',
                body: postObj,
            }),
        }),
        postDelete: builder.mutation({
            query: (id) => ({
                url: `post/${id}`,
                method: 'DELETE',
                body: id,
            }),
        }),
        getCategories: builder.query({
            query: () => '/category',
            providesTags: ["Category"],
        }),
        storeCategory: builder.mutation({
            query: (categoryObj) => ({
                url: '/category',
                method: 'POST',
                body: categoryObj,
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {useGetPostsQuery, useGetSinglePostQuery, useGetPostEditQuery, useStorePostMutation, useUpdatePostMutation, usePostDeleteMutation, useGetCategoriesQuery, useStoreCategoryMutation} = webApi;