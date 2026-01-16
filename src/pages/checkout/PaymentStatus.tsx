import Lottie from "lottie-react";
import successAnimation from "../../assets/animation/PaymentSuccessAnimation.json";
import failureAnimation from "../../assets/animation/PaymentFailedAnimation.json";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import CustomButton from "../../components/commonComponents/button/CustomButton";


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
      <Box>
      <Lottie
        animationData={status === "success" ? successAnimation : failureAnimation}
        loop={false}
        style={{ width: 300, height: 300, margin: '0 auto' }}
      />
      </Box>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {status === "success"
          ? "Your order has been placed successfully. You will receive a confirmation email soon."
          : "Your payment could not be processed. Please try again."}
      </Typography>

      <CustomButton
        label={status === "success" ? "Go to Home" : "Try Again"}
        variant="outlined"
        color={status === "success" ? "primary" : "error"}
        sx={{ mt: 2, px: 3 }}
        onClick={() => navigate(status === "success" ? "/layout/home" : "/layout/orderDetails")}
      />
    </Box>
  );
};

export default PaymentStatus;
