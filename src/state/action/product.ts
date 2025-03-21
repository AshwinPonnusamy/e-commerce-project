import axios from 'axios';
import { setAllProduuctList, setCurrentProduct, setProductCategoryList } from '../store/features/productData';

// all product list
export const getAllProductList = () => async (dispatch: any) => {
    try {
        const result = await axios.get('https://dummyjson.com/products');
        if (result?.data) {
            dispatch(setAllProduuctList(result?.data?.products));
        } else {
            console.error('Error: No data found in API response');
        }
    } catch (error) {
        console.error('Failed to get product list:', error);
    }
};


//category list
export const getProductCategoryList = () => async (dispatch: any) => {
    try {
        const result = await axios.get('https://dummyjson.com/products/categories');
        if (result?.data) {
            dispatch(setProductCategoryList(result?.data));
            console.log(result?.data);
            
        } else {
            console.error('Error: No data found in API response');
        }
    } catch (error) {
        console.error('Failed to get product list:', error);
    }
};


// product get by id
export const getProductCById = (data:any) => async (dispatch: any) => {
    try {
        const result = await axios.get(`https://dummyjson.com/products/${data.id}`);
        if (result?.data) {
            dispatch(setCurrentProduct(result?.data));
            console.log(result?.data);
            
        } else {
            console.error('Error: No data found in API response');
        }
    } catch (error) {
        console.error('Failed to get product list:', error);
    }
};
