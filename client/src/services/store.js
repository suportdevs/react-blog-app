import {configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authSlice";
import { webApi } from "./webSlice";
import Cookies from "universal-cookie";
import userSlice, { getCurrentUser } from "./reducer";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [webApi.reducerPath]: webApi.reducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware).concat(webApi.middleware)
});

// Retrieve user data from cookies when the app loads
const cookies = new Cookies();
const token = cookies.get('token');

if (token) {
    console.log(token)
  // Assuming your user data is stored as a JSON string in a cookie
  store.dispatch(getCurrentUser(token));
}


setupListeners(store.dispatch);