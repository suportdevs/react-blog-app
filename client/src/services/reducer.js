import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: "userApi",
    initialState,
    reducres: {
        createUser: (state) => {

        },
    }
});

export const {createUser} = userSlice;
export default userSlice;