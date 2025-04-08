import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import InputText from '../../centralized/InputText';
import CustomRadio from '../../centralized/CustomRadio';
import { useForm } from "react-hook-form";
import googlePay from '../../assets/image/paymentIcons/google-pay-icon.svg';
import phonePay from '../../assets/image/paymentIcons/phonepe-icon.svg';
import stripePay from '../../assets/image/paymentIcons/stripe-icon.svg';
import razorPay from '../../assets/image/paymentIcons/razorpay-icon.svg';
import CustomButton from '../../components/commonComponents/button/CustomButton';

interface Props {
  setPaymentMethod?: any;
  paymentMethod?: any;
  totalAmount?: number;
}

const PaymentsPage: React.FC<Props> = ({ setPaymentMethod, paymentMethod, totalAmount }) => {
  const { control } = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });


  const walletOptions = [
    { name: "Google Pay", src: googlePay, method: "gpay" },
    { name: "PhonePe", src: phonePay, method: "phonepe" },
    { name: "Stripe", src: stripePay, method: "stripe" },
    { name: "Razorpay", src: razorPay, method: "razorpay" }
  ];

  const handlePaymentClick = (method: string) => {
    console.log(`Selected payment method: ${method}`);
  };

  const paymentOptions = [
    {
      value: 'wallets',
      label: 'Wallets',
      description: 'Pay via Google Pay, PhonePe, Stripe, or Razorpay',
      content: (
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          {walletOptions.map((app) => (
            <Box
              key={app.method}
              component="img"
              src={app.src}
              alt={app.name}
              onClick={() => handlePaymentClick(app.method)}
              sx={{
                width: 60,
                height: 25,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.1)" }
              }}
            />
          ))}
        </Box>
      )
    },
    {
      value: 'card',
      label: 'Credit / Debit Card',
      description: 'Add and secure cards as per RBI guidelines',
      content: (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 2 }}>
          <InputText
            fullWidth
            label="Enter Card Number"
            name="cardNumber"
            placeholder='Card Number'
            control={control}
            pattern={/^\d*$/}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputText
                fullWidth
                label="Valid thru MM/YY"
                name="expiry"
                placeholder='MM/YY'
                control={control}
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                fullWidth
                label="CVV"
                name="cvv"
                placeholder='CVV'
                control={control}
                pattern={/^\d*$/}
              />
            </Grid>
          </Grid>
          <CustomButton
            label={`PAY ₹${totalAmount?.toFixed(2)}`}
            fullWidth
            variant="contained"
          />
        </Box>
        // </form>
      )
    },
    {
      value: 'netbanking',
      label: 'Net Banking',
      description: 'This instrument has low success, use UPI or cards for better experience'
    },
    {
      value: 'cod',
      label: 'Cash on Delivery',
      description: 'Due to handling costs, a nominal fee of ₹17 will be charged',
      content: (
        <Box sx={{ mt: 2 }}>
          <InputText
            fullWidth
            label="Enter the characters"
            name="captcha"
            placeholder='Captcha'
            control={control}
          />
          <CustomButton
            label='CONFIRM ORDER'
            fullWidth
            variant="contained"
          />
        </Box>
      )
    }
  ];

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {paymentOptions.map((option) => (
              <CustomRadio
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                selectedValue={paymentMethod}
                onChange={setPaymentMethod}
              >
                {paymentMethod === option.value && option.content}
              </CustomRadio>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentsPage;
