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
import { auth, db } from "../fireBase/fireBase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { login } from "../state/store/features/authData";
import { useDispatch } from "react-redux";
import { get, ref } from "firebase/database";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      console.log("User logged in:", user);
      const role = data.email === "ashwinas8902@gmail.com" ? "admin" : "user";
      const token = await user.getIdToken();
      const snapshot = await get(ref(db, 'users/' + user.uid));
      const dbData = snapshot.val();
      if (!dbData || !dbData.role) {
        console.error("User role not found in DB");
        return;
      }
      const userData = {
        isLoggedIn: true,
        userId: user.uid,
        token: token,
        email: user.email,
        role: role,
        loading: false,
      };
      dispatch(login({ userData }));
      navigate(role === 'admin' ? "/layout/admin" : "/layout/home");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };


  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "20%",
            left: "57%",
            maxHeight: "70vh",

          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: "warning.main",
              textAlign: 'center',
              letterSpacing: 0.5
            }}
          >
            Welcome Back
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <InputText
                name="email"
                control={control}
                label="Email Address"
                placeholder="Enter your email"
                required
                pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                fullWidth
              />

              <InputText
                name="password"
                control={control}
                label="Password"
                type="password"
                required
                minLength={6}
              />

              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
              }}>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    '&:hover': {
                      color: "primary.main"
                    }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: 'none',
                  backgroundColor: "warning.main",
                  '&:hover': {
                    boxShadow: 'none'
                  }
                }}
              >
                Sign In
              </Button>

              <Divider sx={{ my: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary", px: 2 }}>
                  OR CONTINUE WITH
                </Typography>
              </Divider>

              <Box sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 3
              }}>
                <IconButton
                  sx={{
                    bgcolor: 'error.light',
                    '&:hover': { bgcolor: 'error.main' }
                  }}
                >
                  <Google sx={{ color: 'common.white' }} />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: 'info.light',
                    '&:hover': { bgcolor: 'info.main' }
                  }}
                >
                  <Facebook sx={{ color: 'common.white' }} />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: 'grey.800',
                    '&:hover': { bgcolor: 'grey.900' }
                  }}
                >
                  <GitHub sx={{ color: 'common.white' }} />
                </IconButton>
              </Box>

              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Don't have an account?{' '}
                <Link
                  href="/register"
                  fontWeight={600}
                  underline="hover"
                  sx={{
                    color: "primary.main",
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Login;