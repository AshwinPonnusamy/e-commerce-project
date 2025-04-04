import { useState } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    Link,
    Fade,
    Divider
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GitHub, Google, Facebook } from "@mui/icons-material";
import InputText from "../centralized/InputText";
import backgroundImage from "../assets/image/login/login-bg3.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../fireBase/fireBase-config";
import { useDispatch } from "react-redux";
import { login } from "../state/store/features/authData";
import { ref, set } from "firebase/database";
const Register = () => {
    const {
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const [showConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const writeUserToDB = async (userId: string, data: any) => {
        await set(ref(db, 'users/' + userId), data);
    };
    const onSubmit = async (data: any) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            const role = data.email === "ashwinas8902@gmail.com" ? "admin" : "user";

            console.log("User registered:", user);
            const token = await user.getIdToken();
            const userData = {
                isLoggedIn: true,
                userId: user.uid,
                token: token,
                email: user.email,
                role: role,
                loading: false,
            };
            await writeUserToDB(user.uid, {
                userId: user.uid,
                fName: data.firstName,
                lName: data.lastName,
                email: user.email,
                role,
            });

            dispatch(login({ userData }));
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Fade in={true} timeout={800}>
                <Box
                    sx={{
                        borderRadius: 4,
                        maxHeight: "75vh",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "absolute",
                        left: '53%',
                        top: '20%',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        }
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            mb: 1,
                            fontWeight: 700,
                            color: "warning.main",
                            textAlign: 'center'
                        }}
                    >
                        Create Account
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                        Join our community today
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <InputText
                                    name="firstName"
                                    control={control}
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    fullWidth
                                // required
                                />
                                <InputText
                                    name="lastName"
                                    control={control}
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    fullWidth
                                // required
                                />
                            </Box>
                            <InputText
                                name="email"
                                control={control}
                                label="Email Address"
                                placeholder="Enter your email"
                                // required
                                pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                            />
                            <InputText
                                name="password"
                                control={control}
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                // required
                                minLength={6}
                            />
                            <InputText
                                name="confirmPassword"
                                control={control}
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                type={showConfirmPassword ? "text" : "password"}
                            // required
                            />
                        </Box>
                        <Button type="submit" variant="contained" fullWidth
                            sx={{
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                boxShadow: 'none',
                                backgroundColor: 'warning.main',
                                '&:hover': {
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                OR REGISTER WITH
                            </Typography>
                        </Divider>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                            <IconButton sx={{
                                bgcolor: 'error.light',
                                '&:hover': { bgcolor: 'error.main' }
                            }} >
                                <Google sx={{ color: 'common.white' }} />
                            </IconButton>
                            <IconButton sx={{
                                bgcolor: 'info.light',
                                '&:hover': { bgcolor: 'info.main' }
                            }} >
                                <Facebook sx={{ color: 'common.white' }} />
                            </IconButton>
                            <IconButton sx={{
                                bgcolor: 'grey.800',
                                '&:hover': { bgcolor: 'grey.900' }
                            }} >
                                <GitHub sx={{ color: 'common.white' }} />
                            </IconButton>
                        </Box>
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                            Already have an account?
                            <Link
                                href="/login"
                                fontWeight={600}
                                underline="hover"
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Fade>
        </Box>
    );
};
export default Register;