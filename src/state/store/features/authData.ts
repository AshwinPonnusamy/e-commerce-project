import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthData {
    isLoggedIn: boolean;
    userId: string | null;
    token: string | null;
    email: string | null;
    role: string | null;
}

const initialState: AuthData = {
    isLoggedIn: false,
    userId: null,
    token: null,
    email: null,
    role: null,
};

const authSlice = createSlice({
    name: "authData",
    initialState,
    reducers: {
        // set local storage data when user login
    


        login: ( state, action: PayloadAction<{ userId: string; token: string; email: string; role: string }>
        ) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isLoggedIn = true;
            localStorage.setItem("userId", action.payload.userId || "");
            localStorage.setItem("token", action.payload.token || "");
            localStorage.setItem("email", action.payload.email || "");
            localStorage.setItem("role", action.payload.role || "");

        },
        //after logout clear all data form local storage and set initial state
        logout: ( state ) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.token = null;
            state.email = null;
            state.role = null;

            // Clear local storage
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
        }

    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
