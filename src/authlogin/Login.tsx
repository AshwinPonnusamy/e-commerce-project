import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputText from "../centralized/InputText";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data:any) => {
    setLoading(true);
    console.log("Login Data:", data);
    setTimeout(() => {
      setLoading(false);
      navigate("/layout");
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          width: "100%",
          maxWidth: "400px",
          margin: "auto",
          backgroundColor: "rgba(58, 209, 230, 0)",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          boxShadow: "1px 2px 8px #000",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 3, color:"rgb(37, 126, 126)", textShadow:"2px 2px #000" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "350px" }}>
          <InputText
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            required
          />
          <InputText
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            required
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, width: "200px", backgroundColor: "rgba(0,255,255,0.5)", color:"#000" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
