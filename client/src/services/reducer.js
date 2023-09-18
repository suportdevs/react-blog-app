import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}
const userSlice = createSlice({
    name: "userApi",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            // Use proper immutability here
            state.user = action.payload;
          },
    }
});
export const {setCurrentUser} = userSlice.actions;
export default userSlice;