import { setUserDetails, UserData } from "../store/features/userData";
import { login } from "../store/features/authData";
import { AppDispatch } from "../store/store";

// Mock Register user
export const registerUser = (data: Partial<UserData>) => async (dispatch: AppDispatch) => {
    try {
        const { email, password, fullName, address, phone } = data;
        if (!email || !password) throw new Error("Email and password are required");

        const userId = "mock_uid_" + Date.now();
        const role = email === "admin@example.com" ? "admin" : "user";
        const userData: UserData = {
            uid: userId,
            fullName: fullName || "Mock User",
            email,
            password,
            phone: phone || null,
            address: address || "",
            profileUrl: "https://example.com/default-profile.png",
            role: role,
        };

        const token = "mock_token_" + userId;
        dispatch(login({
            userId: userId,
            token,
            email: email,
            role,
        }));
        dispatch(setUserDetails(userData));

        return { ...userData, token };
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};


// Mock login user
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const isAdmin = email === "admin@stitch.com" && password === "admin123";
        const userId = isAdmin ? "admin_uid" : "user_uid_" + Date.now();
        const role = isAdmin ? "admin" : "user";
        
        const userData: UserData = {
            uid: userId,
            fullName: isAdmin ? "Alex Rivers" : "Sample User",
            email: email,
            password: password,
            phone: isAdmin ? "9876543210" : "1234567890",
            address: isAdmin ? "Admin HQ, Stitch City" : "123 Mock Street",
            profileUrl: isAdmin ? "https://i.pravatar.cc/150?u=admin" : "https://i.pravatar.cc/150?u=user",
            role: role,
        };

        const token = "mock_token_" + userId;
        dispatch(setUserDetails(userData));
        dispatch(login({
            userId: userId,
            token,
            email: email,
            role: role,
        }));

        return { ...userData, token };
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};


// Mock update user details
export const updateUserDetails = (data: Partial<UserData>) => async (dispatch: AppDispatch) => {
    try {
        const updatedData = {
            uid: "mock_uid_123",
            fullName: "Mock User",
            email: "user@example.com",
            password: "",
            phone: "",
            address: "",
            profileUrl: "https://example.com/default-profile.png",
            role: "user",
            ...data,
        };
        dispatch(setUserDetails(updatedData));
        return updatedData;
    } catch (error) {
        console.error("Error updating user details:", error);
        throw error;
    }
}
