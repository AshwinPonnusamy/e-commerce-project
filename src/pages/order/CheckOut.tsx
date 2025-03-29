import { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, Stepper, Step, StepLabel, Divider } from '@mui/material';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentsPage';
import ShippingDetails from './ShippingDetails';
import { ArrowBack } from '@mui/icons-material';
import { ArrowRight } from 'iconsax-react';

const steps = ['Shipping Details', 'Order Summary', 'Payment'];

const CheckOut = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={3}>
                {/* Title Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Checkout Process
                    </Typography>
                </Grid>

                {/* Stepper */}
                <Grid item xs={12}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                {/* Main Content Area */}
                <Grid container item xs={12} spacing={3}>
                    {/* Dynamic Content Section*/}
                    <Grid item xs={12} md={8}>
                        {activeStep === 0 && <ShippingDetails />}
                        {activeStep === 1 && <OrderSummary />}
                        {activeStep === 2 && (
                            <PaymentOptions
                                setPaymentMethod={setPaymentMethod}
                                paymentMethod={paymentMethod}
                            />
                        )}
                    </Grid>

                    {/* Price Details Section (4 columns on desktop, 12 on mobile) */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{
                            p: 2,
                            boxShadow: 2,
                            borderRadius: 1,
                            position: { md: 'sticky' },
                            top: { md: 20 }
                        }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                                PRICE DETAILS
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Price (2 items)</Typography>
                                <Typography variant="body2">¥910</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Delivery Charges</Typography>
                                <Typography variant="body2">FREE</Typography>
                            </Box>

                            {paymentMethod === 'cod' && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Payment Handling Fee</Typography>
                                    <Typography variant="body2">¥17</Typography>
                                </Box>
                            )}

                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Amount Payable
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {paymentMethod === 'cod' ? '¥917' : '¥910'}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Navigation Buttons */}
                <Grid item xs={12}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBack />}
                            sx={{
                                textTransform: 'none',
                                fontSize: 14,
                                color: '#c21d17',
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            endIcon={<ArrowRight />}
                            sx={{
                                textTransform: 'none',
                                fontSize: 14,
                                color: '#0026fd',
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default CheckOut;