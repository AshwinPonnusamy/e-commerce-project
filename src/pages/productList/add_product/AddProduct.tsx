import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
} from '@mui/material';
import { Add, HighlightOff } from '@mui/icons-material';
import CommonPaper from '../../../components/commonComponents/CommonPaper';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [stock, setStock] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) setImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = () => {
        console.log({ productName, description, basePrice, stock, discount, discountType, category, images });
    };

    return (
        <Box sx={{ p: 4, backgroundColor: '#f7f7f7' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                🛍️ Add New Product
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <CommonPaper sx={{ height: "100%" }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>General Information</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField label="Name Product" value={productName} onChange={e => setProductName(e.target.value)} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Description Product" multiline rows={3} value={description} onChange={e => setDescription(e.target.value)} fullWidth sx={{ mt: 2 }} />
                            </Grid>
                        </Grid>
                    </CommonPaper>

                </Grid>

                <Grid item xs={12} md={4}>
                    <Grid item xs={12}>
                        <CommonPaper>
                            <Typography variant="h6" sx={{ mb: 2 }}>Upload Product Image</Typography>
                            {/* Main Preview */}
                            <Box sx={{
                                width: '100%', height: 200, borderRadius: 2, backgroundColor: '#f5f5f5',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2
                            }}>
                                {images[mainImageIndex] ? (
                                    <img src={images[mainImageIndex]} alt="main" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Typography variant="body2" color="textSecondary">No Image</Typography>
                                )}
                            </Box>

                            {/* Thumbnails + Add Button */}
                            <Grid container spacing={1}>
                                {images.map((img, i) => (
                                    <Grid item key={i}>
                                        <Box
                                            sx={{
                                                width: 50, height: 50, borderRadius: 2, position: 'relative',
                                                border: mainImageIndex === i ? '2px solid #4caf50' : '1px solid #ccc',
                                                overflow: 'hidden', cursor: 'pointer',
                                            }}
                                        >
                                            <img
                                                src={img}
                                                alt={`thumb-${i}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onClick={() => setMainImageIndex(i)}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#d32f2f',
                                                    zIndex: 1, '&:hover': { color: '#d32f2f' }
                                                }}
                                                onClick={() => {
                                                    setImages(prev => prev.filter((_, index) => index !== i));
                                                    if (mainImageIndex === i) setMainImageIndex(0);
                                                    else if (mainImageIndex > i) setMainImageIndex(prev => prev - 1);
                                                }}
                                            >
                                                <HighlightOff sx={{ fontSize: '18px', backgroundColor: '#ffffff', borderRadius: 10 }} />
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                                {/* Add More Button */}
                                <Grid item>
                                    <Box component="label" htmlFor="upload-more" sx={{
                                        width: 50, height: 50, border: '2px dashed #ccc', borderRadius: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                    }}>
                                        <Add color="action" />
                                        <input id="upload-more" type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CommonPaper>
                    </Grid>
                </Grid>


                <Grid item xs={12} md={8}>
                    <CommonPaper>
                        <Typography variant="h6" sx={{ mb: 2 }}>Pricing And Stock</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><TextField label="Base Pricing" value={basePrice} onChange={e => setBasePrice(e.target.value)} fullWidth /></Grid>
                            <Grid item xs={6}><TextField label="Stock" value={stock} onChange={e => setStock(e.target.value)} fullWidth /></Grid>
                            <Grid item xs={6}><TextField label="Discount" value={discount} onChange={e => setDiscount(e.target.value)} fullWidth /></Grid>
                            <Grid item xs={6}><TextField label="Discount Type" value={discountType} onChange={e => setDiscountType(e.target.value)} fullWidth /></Grid>
                        </Grid>
                    </CommonPaper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <CommonPaper>
                        <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Product Category" value={category} onChange={e => setCategory(e.target.value)} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" fullWidth startIcon={<Add />} sx={{ mt: 2 }}>Add Category</Button>
                            </Grid>
                        </Grid>
                    </CommonPaper>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="outlined">Save Draft</Button>
                <Button variant="contained" onClick={handleSubmit}>Add Product</Button>
            </Box>
        </Box>
    );
};

export default AddProduct;