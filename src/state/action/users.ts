import { auth, db } from "../../fireBase/fireBase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { setUserDetails, UserData } from "../store/features/userData";
import { login } from "../store/features/authData";
import { AppDispatch } from "../store/store";

// Register user
export const registerUser = (data: Partial<UserData>) => async (dispatch: AppDispatch) => {
    try {
        const { email, password, fullName, address, phone, profileUrl } = data;
        if (!email || !password) throw new Error("Email and password are required");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const role = email === "ashwinas8902@gmail.com" ? "admin" : "user";
        const userData: UserData = {
            uid: user.uid,
            fullName: fullName || "User",
            email,
            password,
            phone: phone || null,
            address: address || "",
            profileUrl: profileUrl || "https://example.com/default-profile.png",
            role: role,
        };

        await set(ref(db, `users/` + user.uid), userData);
        const token = await user.getIdToken();
        dispatch(login({
            userId: user.uid,
            token,
            email: user.email!,
            role,
        }));
        dispatch(setUserDetails(userData));

        return { ...userData, token };
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};


//login user
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();

        const snapshot = await get(ref(db, "users/" + user.uid));
        const dbData = snapshot.val();

        if (!dbData || !dbData.role) {
            throw new Error("User role not found in DB");
        }
        const userData: UserData = {
            uid: user.uid || "",
            fullName: dbData.fullName || "User",
            email: user.email || "",
            password: dbData.password || "",
            phone: dbData.phone || "",
            address: dbData.address || "",
            profileUrl: dbData.profileUrl || "",
            role: dbData.role || "user",
        };
        dispatch(setUserDetails(userData));
        dispatch(login({
            userId: user.uid,
            token,
            email: user.email!,
            role: dbData.role,
        }));

        return { ...userData, token };
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};


//update user details
export const updateUserDetails = (data: Partial<UserData>) => async (dispatch: AppDispatch) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No user is currently logged in.");
        }
        const userId = user.uid;
        const userRef = ref(db, "users/" + userId);
        const snapshot = await get(userRef);
        const dbData = snapshot.val();
        const updatedData = {
            ...dbData,
            ...data,
            profileUrl: data.profileUrl || dbData?.profileUrl || "https://example.com/default-profile.png",
        };
        await set(userRef, updatedData);
        dispatch(setUserDetails(updatedData));
        return updatedData;
    } catch (error) {
        console.error("Error updating user details:", error);
        throw error;
    }
}
