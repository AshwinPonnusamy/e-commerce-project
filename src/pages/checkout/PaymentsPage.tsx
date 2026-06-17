import React from 'react';
import InputText from '../../centralized/InputText';
import CustomRadio from '../../centralized/CustomRadio';
import { useForm } from "react-hook-form";
import CustomButton from '../../components/commonComponents/button/CustomButton';

interface Props {
  setPaymentMethod: (method: string) => void;
  paymentMethod: string;
  totalAmount?: number;
}

const PaymentsPage: React.FC<Props> = ({ setPaymentMethod, paymentMethod, totalAmount }) => {
  const { control } = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      captcha: "",
    },
  });

  const walletOptions = [
    { name: "Google Pay", src: "/image/paymentIcons/google-pay-icon.svg", method: "gpay" },
    { name: "PhonePe", src: "/image/paymentIcons/phonepe-icon.svg", method: "phonepe" },
    { name: "Stripe", src: "/image/paymentIcons/stripe-icon.svg", method: "stripe" },
    { name: "Razorpay", src: "/image/paymentIcons/razorpay-icon.svg", method: "razorpay" }
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
        <div className="mt-4 flex flex-wrap gap-4 p-4 bg-white rounded-lg border border-gray-100">
          {walletOptions.map((app) => (
            <img
              key={app.method}
              src={app.src}
              alt={app.name}
              onClick={() => handlePaymentClick(app.method)}
              className="h-6 object-contain cursor-pointer transition-transform hover:scale-110"
              title={app.name}
            />
          ))}
        </div>
      )
    },
    {
      value: 'card',
      label: 'Credit / Debit Card',
      description: 'Add and secure cards as per RBI guidelines',
      content: (
        <div className="mt-4 space-y-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <InputText
            fullWidth
            label="Enter Card Number"
            name="cardNumber"
            placeholder='0000 0000 0000 0000'
            control={control}
            pattern={/^\d*$/}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputText
              fullWidth
              label="Valid thru MM/YY"
              name="expiry"
              placeholder='MM/YY'
              control={control}
            />
            <InputText
              fullWidth
              label="CVV"
              name="cvv"
              placeholder='123'
              control={control}
              pattern={/^\d*$/}
            />
          </div>
          <CustomButton
            label={`PAY ₹${totalAmount?.toFixed(2)}`}
            className="w-full py-3 bg-[#7c3aed] text-white font-black rounded-lg shadow-md hover:bg-violet-700 transition-all"
          />
        </div>
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
        <div className="mt-4 space-y-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
          <InputText
            fullWidth
            label="Enter the characters"
            name="captcha"
            placeholder='Enter Captcha'
            control={control}
          />
          <CustomButton
            label='CONFIRM ORDER'
            className="w-full py-3 bg-orange-500 text-white font-black rounded-lg shadow-md hover:bg-orange-600 transition-all"
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-violet-600 rounded-full"></div>
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Payment Method</h2>
      </div>

      <div className="bg-gray-50 p-2 md:p-4 rounded-xl border border-gray-100">
        <div className="space-y-2">
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
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
