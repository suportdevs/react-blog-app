import {createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookies";
const cookies = new Cookies();

const token = cookies.get('token');
console.log(token);
const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: "userApi",
    initialState,
    reducers: {
        createUser: (state) => {

        },
    }
});

export const {createUser} = userSlice;
export default userSlice;