import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}
console.log(initialState)
const userSlice = createSlice({
    name: "userApi",
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            return state.user = action.payload;
        }
    }
});
export const {getCurrentUser} = userSlice.actions;
export default userSlice;