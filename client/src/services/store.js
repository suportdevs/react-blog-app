import {configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authSlice";
import { webApi } from "./webSlice";
import Cookies from "universal-cookie";
import userSlice, { setCurrentUser } from "./reducer";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [webApi.reducerPath]: webApi.reducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware).concat(webApi.middleware)
});

setupListeners(store.dispatch);