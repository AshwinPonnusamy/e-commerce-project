import axios from "axios";
import {
    setAllProductList,
    setCurrentProduct,
    setProductCategoryList,
    addToCart,
    removeFromCart,
    updateCartQuantity,
} from "../store/features/productData";

//Fetch all products
export const getAllProductList = () => async (dispatch: any) => {
    try {
        const result = await axios.get("https://dummyjson.com/products");
        if (result?.data) {
            dispatch(setAllProductList(result?.data?.products));
        } else {
            console.error("Error: No data found in API response");
        }
    } catch (error) {
        console.error("Failed to get product list:", error);
    }
};

//Fetch product categories
export const getProductCategoryList = () => async (dispatch: any) => {
    try {
        const result = await axios.get("https://dummyjson.com/products/categories");
        if (result?.data) {
            dispatch(setProductCategoryList(result?.data));
        } else {
            console.error("Error: No data found in API response");
        }
    } catch (error) {
        console.error("Failed to get category list:", error);
    }
};

//Fetch product details by ID
export const getProductCById = (data: any) => async (dispatch: any) => {
    try {
        const result = await axios.get(`https://dummyjson.com/products/${data.id}`);
        if (result?.data) {
            dispatch(setCurrentProduct(result?.data));
        } else {
            console.error("Error: No data found in API response");
        }
    } catch (error) {
        console.error("Failed to get product details:", error);
    }
};

//Add to cart
export const addProductToCart = (product: any) => (dispatch: any) => {
    dispatch(addToCart(product));
};

// Remove from cart
export const removeProductFromCart = (id: number) => (dispatch: any) => {
    dispatch(removeFromCart(id));
};

// Update cart quantity
export const changeCartQuantity = (id: number, quantity: number) => (dispatch: any) => {
    dispatch(updateCartQuantity({ id, quantity }));
};
