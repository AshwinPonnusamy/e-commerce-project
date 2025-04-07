import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthData {
    isLoggedIn: boolean;
    userId: string | null;
    token: string | null;
    email: string | null;
    role: string | null;
    loading: boolean;
}

const initialState: AuthData = {
    isLoggedIn: false,
    userId: null,
    token: null,
    email: null,
    role: null,
    loading: false,
};

const authSlice = createSlice({
    name: "authData",
    initialState,
    reducers: {
        login: ( state, action: PayloadAction<{ userId: string; token: string; email: string; role: string }>
        ) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isLoggedIn = true;
        },
        logout: () => initialState,
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
