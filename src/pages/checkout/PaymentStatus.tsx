import Lottie from "lottie-react";
import successAnimation from "../../assets/animation/PaymentSuccessAnimation.json";
import failureAnimation from "../../assets/animation/PaymentFailedAnimation.json";
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

  const isSuccess = status === "success";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-8">
        <Lottie
          animationData={isSuccess ? successAnimation : failureAnimation}
          loop={false}
          style={{ width: 300, height: 300 }}
          className="mx-auto"
        />
      </div>

      <h1 className={`text-3xl font-black mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        {isSuccess ? "Payment Successful!" : "Payment Failed!"}
      </h1>

      <p className="text-gray-600 max-w-md mx-auto mb-10 font-medium">
        {isSuccess
          ? "Your order has been placed successfully. You will receive a confirmation email soon."
          : "Your payment could not be processed. Please try again or choose a different payment method."}
      </p>

      <CustomButton
        label={isSuccess ? "Go to Home" : "Try Again"}
        variant="outlined"
        className={`px-12 py-3 rounded-full font-black border-2 transition-all ${
          isSuccess 
          ? 'border-violet-600 text-violet-600 hover:bg-violet-50' 
          : 'border-red-600 text-red-600 hover:bg-red-50'
        }`}
        onClick={() => navigate(isSuccess ? "/layout/home" : "/layout/checkout")}
      />
    </div>
  );
};

export default PaymentStatus;
