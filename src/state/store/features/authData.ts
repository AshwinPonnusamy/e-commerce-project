import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthData {
    isLoggedIn: boolean;
    userId: string | null;
    token: string | null;
    email: string | null;
    role: string | null;
    loading: boolean;
    userData: any | null;
}

const initialState: AuthData = {
    isLoggedIn: false,
    userId: null,
    token: null,
    email: null,
    role: null,
    loading: false,
    userData: null,
};

const authSlice = createSlice({
    name: "authData",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ userData: any; }>) => {
            state.userData = action.payload.userData;
            console.log("User data in auth slice:", action.payload.userData);
            
            state.isLoggedIn = true;
            state.userId = action.payload.userData.userId;
            state.token = action.payload.userData.token;
            state.role = action.payload.userData.role;
        },
        logout: () => initialState,
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
