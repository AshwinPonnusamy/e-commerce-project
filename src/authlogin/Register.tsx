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
import { useDispatch } from "react-redux";
import { registerUser } from "../state/action/users";
import { AppDispatch } from "../state/store/store";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const [showConfirmPassword] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            await dispatch(registerUser(data));
            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Registration failed:", error.message);
            }
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
                                    name="fullName"
                                    control={control}
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    fullWidth
                                // required
                                />
                                <InputText
                                    name="phone"
                                    control={control}
                                    label="Mobile Number"
                                    placeholder="Enter your mobile number"
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