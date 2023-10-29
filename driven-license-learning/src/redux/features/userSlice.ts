import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {convertTokenToObject, getTokenDataFromLocalStorage} from "../../utils/serverUtils";

const initialState = {
    token: "",
    userAccountInfor: "",
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        USER_LOGIN_REQUEST: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.loading = true;
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },

        USER_LOGIN_SUCCESS: (state, action) => {
            state.token = action.payload.accessToken;
            state.userAccountInfor = action.payload;
            state.role = action.payload.role;
            state.isloggedInSuccess = true;
            state.loading = false;
        },

        USER_LOGIN_FAIL: (state, action) => {
            state.token = null;
            state.isloggedInSuccess = false;
            state.loginErrorMessage = action.payload;
            state.loading = false;
        },
        USER_LOGOUT_SUCCESS: (state) => {
            state.token = null;
            state.userAccountInfor = null;
            state.role = null;
            state.loading = false;
            state.isloggedInSuccess = false;
        },
        USER_CLEAR: (state) => {
            state.isloggedInSuccess = null;
            state.isloggedOutSuccess = null;
        },
        USER_UPDATE_SUCCESS: (state) => {
            state.token = getTokenDataFromLocalStorage();
            state.userAccountInfor = convertTokenToObject();
            state.loading = false;
        },
    },
});

export const {
    USER_LOGIN_REQUEST,
    USER_CLEAR,
    USER_LOGIN_FAIL,
    USER_UPDATE_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_LOGIN_SUCCESS,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
