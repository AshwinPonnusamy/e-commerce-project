import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Chip, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store/store';
import { getAllProductList, deleteProduct } from '../../state/action/product';
import { Edit, Delete, Add, People, ShoppingBag, MonetizationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../../fireBase/fireBase-config';
import { Product } from '../../state/store/features/productData';

const AdminDashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.productData.allProductList);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        dispatch(getAllProductList() as any);
        fetchUserCount();
    }, [dispatch]);

    const fetchUserCount = async () => {
        try {
            const snapshot = await get(ref(db, 'users'));
            if (snapshot.exists()) {
                setUserCount(Object.keys(snapshot.val()).length);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = (id: string | number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id) as any);
        }
    };

    const stats = [
        { label: 'Total Products', value: products.length, icon: <ShoppingBag color="primary" />, color: '#e3f2fd' },
        { label: 'Total Users', value: userCount, icon: <People color="secondary" />, color: '#f3e5f5' },
        { label: 'Total Sales', value: '₹45,200', icon: <MonetizationOn color="success" />, color: '#e8f5e9' },
        { label: 'Active Orders', value: '12', icon: <ShoppingBag color="warning" />, color: '#fff3e0' },
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/layout/addProduct')}
                >
                    Add New Product
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: stat.color, borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#fff', p: 1, borderRadius: '50%', display: 'flex' }}>
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Products Table */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Manage Products</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.slice(0, 10).map((product: Product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <img src={product.thumbnail} alt={product.title} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                                            <Typography variant="body2" fontWeight="bold">{product.title}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>₹{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                                            size="small"
                                            color={product.stock > 0 ? "success" : "error"}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="primary">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default AdminDashboard;
