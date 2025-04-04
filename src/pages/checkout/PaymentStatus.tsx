import Lottie from "lottie-react";
import successAnimation from "../../assets/animation/PaymentSuccessAnimation.json";
import failureAnimation from "../../assets/animation/PaymentFailedAnimation.json";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


const PaymentStatus = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Lottie
        animationData={status === "success" ? successAnimation : failureAnimation}
        loop={false}
        style={{ width: 500, height: 400, margin: "auto" }}
      />

      <Typography variant="body1" sx={{ mb: 3 }}>
        {status === "success"
          ? "Your order has been placed successfully. You will receive a confirmation email soon."
          : "Your payment could not be processed. Please try again."}
      </Typography>

      <Button
        variant="outlined"
        color={status === "success" ? "primary" : "error"}
        sx={{ mt: 2, px: 3 }}
        onClick={() => navigate(status === "success" ? "/layout/home" : "/layout/orderDetails")}
      >
        {status === "success" ? "Go to Home" : "Try Again"}
      </Button>
    </Box>
  );
};

export default PaymentStatus;
