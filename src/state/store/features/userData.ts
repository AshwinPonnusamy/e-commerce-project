import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
    uid: string | null;
    fullName: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
    address: string | null;
    profileUrl: string | null;
    role: string | null;
}

const initialState: UserData = {
    uid: null,
    fullName: null,
    email: null,
    password: null,
    phone: null,
    address: null,
    profileUrl: null,
    role: null,
};

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserDetails(_, action: PayloadAction<UserData>) {
            return  action.payload;
        },
        updateUser(state, action: PayloadAction<Partial<UserData>>) {
            return { ...state, ...action.payload };
        }
    },
});

export const { setUserDetails, updateUser } = userSlice.actions;
export default userSlice.reducer;
