import { useState } from 'react';
import { Box, Typography, Paper, Stepper, Step, StepLabel, Divider, Grid } from '@mui/material';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentsPage';
import ShippingDetails from './ShippingDetails';
import { ArrowBack } from '@mui/icons-material';
import { ArrowRight } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/commonComponents/button/CustomButton';
import { useMediaQuery, useTheme } from '@mui/material';
const steps = ['Shipping', 'Order Summary', 'Payment'];

const CheckOut = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const cartItems = useSelector((state: RootState) => state.productData.cartItems);

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalOriginalPrice = cartItems.reduce(
        (sum, item) => {
            const originalPrice = item.price / (1 - (item.discountPercentage / 100));
            return sum + originalPrice * item.quantity;
        },
        0
    );
    const totalDiscount = totalOriginalPrice - subtotal;
    const deliveryCharges = subtotal > 500 ? 0 : 50;
    const handlingFee = paymentMethod === 'cod' ? 17 : 0;
    const totalAmount = subtotal + deliveryCharges + handlingFee;
    const handleCardPayment = async (totalAmount?: number) => {
        if (!totalAmount) {
            alert("Invalid payment amount.");
            return;
        }
        const amountInPaise = Math.round(totalAmount * 100);
        const itemNames = cartItems.map(item => item.title).join(", ");
        try {
            const response = await axios.post('http://localhost:4242/create-checkout-session', {
                amount: amountInPaise,
                itemName: itemNames.substring(0, 100) // Truncate if too long
            });

            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                alert("Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert(`Payment failed. Error: ${(error as Error).message}`);
            navigate("/layout/orderDetails/payment-status/failed");
        }
    };
    return (
        <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
            <Grid container spacing={3}>
                {/* Title Section */}
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: { xs: 'center', md: 'left' } }}>
                        Checkout Process
                    </Typography>
                </Grid>

                {/* Stepper */}
                <Grid size={{ xs: 12 }}>
                    <Stepper activeStep={activeStep} alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                {/* Main Content Area */}
                <Grid size={{ xs: 12 }}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{ mb: { xs: 4, md: 0 } }}>
                                {activeStep === 0 && <ShippingDetails />}
                                {activeStep === 1 && <OrderSummary />}
                                {activeStep === 2 && (
                                    <PaymentOptions
                                        setPaymentMethod={setPaymentMethod}
                                        paymentMethod={paymentMethod}
                                        totalAmount={totalAmount}
                                    />
                                )}
                            </Box>
                        </Grid>

                        {/* Price Details Section */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{
                                position: { xs: 'static', md: 'sticky' },
                                top: 100,
                            }}>
                                <Paper sx={{
                                    p: 3,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    border: '1px solid #eee'
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        PRICE DETAILS
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="body1">M.R.P ({cartItems.length} items)</Typography>
                                        <Typography variant="body1" sx={{ textDecoration: "line-through", color: 'text.secondary' }}>₹{totalOriginalPrice.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="body1" color="success.main">Product Discount</Typography>
                                        <Typography variant="body1" color="success.main">-₹{totalDiscount.toFixed(2)}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="body1">Delivery Charges</Typography>
                                        <Typography variant="body1" sx={{ color: deliveryCharges === 0 ? 'success.main' : 'text.primary', fontWeight: deliveryCharges === 0 ? 'bold' : 'normal' }}>
                                            {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                                        </Typography>
                                    </Box>

                                    {paymentMethod === 'cod' && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                            <Typography variant="body1">Payment Handling Fee</Typography>
                                            <Typography variant="body1">₹17</Typography>
                                        </Box>
                                    )}

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Total Amount
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            ₹{totalAmount?.toFixed(2)}
                                        </Typography>
                                    </Box>

                                    {activeStep === 2 ? (
                                        <CustomButton
                                            label={paymentMethod === "cod" ? 'Place Order' : `Pay ₹{totalAmount?.toFixed(2)}`}
                                            variant="contained"
                                            color="warning"
                                            disabled={!paymentMethod}
                                            fullWidth={true}
                                            sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                                            onClick={() => {
                                                if (paymentMethod === "cod") {
                                                    navigate("/layout/orderDetails/payment-status/success");
                                                } else {
                                                    handleCardPayment(totalAmount);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <CustomButton
                                            label="Proceed to Next Step"
                                            variant="contained"
                                            color="primary"
                                            fullWidth={true}
                                            sx={{ mt: 3, py: 1.5, fontWeight: 'bold', display: { xs: 'flex', md: 'none' } }}
                                            onClick={handleNext}
                                            disabled={activeStep === steps.length - 1}
                                        />
                                    )}
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Navigation Buttons (Desktop) */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'space-between',
                        mt: 2
                    }}>
                        <CustomButton
                            label="Back"
                            variant="text"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBack />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold'
                            }}
                        />
                        <CustomButton
                            label="Next Step"
                            variant="outlined"
                            onClick={handleNext}
                            endIcon={<ArrowRight />}
                            disabled={activeStep === steps.length - 1}
                            color='primary'
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold'
                            }}
                        />
                    </Box>
                    {/* Mobile Back Button */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 2 }}>
                        <CustomButton
                            label="Back"
                            variant="text"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBack />}
                            sx={{ textTransform: 'none' }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default CheckOut;
