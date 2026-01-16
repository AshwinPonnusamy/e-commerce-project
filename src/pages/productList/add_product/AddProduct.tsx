import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
} from '@mui/material';
import { Add, HighlightOff } from '@mui/icons-material';
import CommonPaper from '../../../components/commonComponents/CommonPaper';
import InputText from '../../../centralized/InputText';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../../state/action/product';
import { AppDispatch } from '../../../state/store/store';

interface ProductFormInput {
    productName: string;
    productDescription: string;
    category: string;
    basePrice: string;
    stock: string;
    discount: string;
    brand: string;
}

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [images, setImages] = useState<string[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const { control, handleSubmit, reset } = useForm<ProductFormInput>({
        defaultValues: {
            productName: "",
            productDescription: "",
            category: "",
            basePrice: "",
            stock: "",
            discount: "",
            brand: "",
        }
    });

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

    const onSubmit = async (data: ProductFormInput) => {
        if (images.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        const productData = {
            title: data.productName,
            description: data.productDescription,
            category: data.category,
            price: parseFloat(data.basePrice),
            stock: parseInt(data.stock),
            discountPercentage: parseFloat(data.discount || "0"),
            brand: data.brand || "Generic",
            images: images,
            thumbnail: images[mainImageIndex],
            rating: 5, // Default rating for new products
            availabilityStatus: "In Stock"
        };

        try {
            await dispatch(addNewProduct(productData) as any);
            alert("Product added successfully!");
            reset();
            setImages([]);
            navigate('/layout/allproducts');
        } catch (error) {
            console.error("Failed to add product:", error);
            alert("Failed to add product");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, backgroundColor: '#f7f7f7' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                🛍️ Add New Product
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <CommonPaper sx={{ height: "100%" }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>General Information</Typography>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <InputText name="productName" control={control} label="Product Name" fullWidth required />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <InputText name="brand" control={control} label="Brand" fullWidth required />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <InputText name="productDescription" control={control} label="Product Description" multiline={true} rows={3} fullWidth required />
                            </Grid>
                        </Grid>
                    </CommonPaper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <CommonPaper sx={{ height: "100%" }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Upload Product Image</Typography>
                        {/* Main Preview */}
                        <Box sx={{
                            width: '100%', height: 210, borderRadius: 2, backgroundColor: '#f5f5f5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
                            overflow: 'hidden'
                        }}>
                            {images[mainImageIndex] ? (
                                <img src={images[mainImageIndex]} alt="main" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                            ) : (
                                <Typography variant="body2" color="textSecondary">No Image</Typography>
                            )}
                        </Box>

                        {/* Thumbnails + Add Button */}
                        <Grid container spacing={1}>
                            {images.map((img, i) => (
                                <Grid key={i}>
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
                                            onClick={(e) => {
                                                e.stopPropagation();
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
                            <Grid>
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


                <Grid size={{ xs: 12, md: 8 }}>
                    <CommonPaper>
                        <Typography variant="h6" sx={{ mb: 2 }}>Pricing And Stock</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}><InputText name="basePrice" control={control} label="Base Price (₹)" type='number' fullWidth required /></Grid>
                            <Grid size={{ xs: 6 }}><InputText name="stock" control={control} label="Stock" type='number' fullWidth required /></Grid>
                            <Grid size={{ xs: 6 }}><InputText name="discount" control={control} label="Discount (%)" type='number' fullWidth /></Grid>
                        </Grid>
                    </CommonPaper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <CommonPaper sx={{ height: "100%" }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <InputText name="category" control={control} label="Product Category" fullWidth required />
                            </Grid>
                        </Grid>
                    </CommonPaper>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Add Product</Button>
            </Box>
        </Box>
    );
};

export default AddProduct;