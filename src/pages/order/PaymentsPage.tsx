import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid
} from '@mui/material';
import InputText from '../../centralized/InputText';
import CustomRadio from '../../centralized/CustomRadio';
import { useForm } from "react-hook-form";

interface Props {
  setPaymentMethod?: any;
  paymentMethod?: any;
}

const PaymentsPage: React.FC<Props> = ({ setPaymentMethod, paymentMethod }) => {
  // const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [captcha, setCaptcha] = useState('');
  const { control } = useForm();

  const paymentOptions = [
    {
      value: 'upi',
      label: 'Your UPI ID',
      description: 'Pay by any UPI app',
      content: (
        <Box sx={{ mt: 2 }}>
          <InputText
            fullWidth
            label="Enter UPI ID"
            name="upiId"
            placeholder='UPI ID'
            control={control}
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#1976d2' }}
          >
            PAY ¥910
          </Button>
        </Box>
      )
    },
    {
      value: 'card',
      label: 'Credit / Debit Card',
      description: 'Add and secure cards as per RBI guidelines',
      content: (
        <Box sx={{ mt: 2 }}>
          <InputText
            fullWidth
            label="Enter Card Number"
            name="cardNumber"
            placeholder='Card Number'
            control={control}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputText
                fullWidth
                label="Valid thru MM/YY"
                name="expiry"
                placeholder='MM/YY'
                control={control}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputText
                fullWidth
                label="CVV"
                name="cvv"
                placeholder='CVV'
                control={control}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#1976d2' }}
          >
            PAY ¥910
          </Button>
        </Box>
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
      description: 'Due to handling costs, a nominal fee of ¥17 will be charged',
      content: (
        <Box sx={{ mt: 2 }}>
          <InputText
            fullWidth
            label="Enter the characters"
            name="captcha"
            placeholder='Captcha'
            control={control}
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#1976d2' }}
          >
            CONFIRM ORDER
          </Button>
        </Box>
      )
    }
  ];

  return (
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
  );
};

export default PaymentsPage;
