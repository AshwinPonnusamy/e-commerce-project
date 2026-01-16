import axios from "axios";
import { db } from "../../fireBase/fireBase-config";
import { ref, set, push, get, child, remove, update } from "firebase/database";
import {
    setAllProductList,
    setCurrentProduct,
    setProductCategoryList,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    setSearchProductList,
} from "../store/features/productData";
import { AppDispatch } from "../store/store";
import { Product } from "../store/features/productData";

//Fetch all products from Firebase (with DummyJSON fallback)
export const getAllProductList = () => async (dispatch: AppDispatch) => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `products`));

        if (snapshot.exists()) {
            const firebaseProducts = Object.values(snapshot.val()) as Product[];
            dispatch(setAllProductList(firebaseProducts));

            // Extract unique categories
            const categories = Array.from(new Set(firebaseProducts.map((p: Product) => p.category)));
            dispatch(setProductCategoryList(categories));
        } else {
            // Fallback to DummyJSON if Firebase is empty
            const result = await axios.get("https://dummyjson.com/products");
            if (result?.data) {
                dispatch(setAllProductList(result?.data?.products));
                // Optional: Seed Firebase with DummyJSON data for first run
                // await set(ref(db, 'products'), result.data.products);
            }
        }
    } catch (error) {
        console.error("Failed to get product list:", error);
    }
};

// Add product to Firebase
export const addNewProduct = (productData: Partial<Product>) => async (dispatch: AppDispatch) => {
    try {
        const productListRef = ref(db, 'products');
        const newProductRef = push(productListRef);
        const productWithId = { ...productData, id: newProductRef.key };
        await set(newProductRef, productWithId);
        dispatch(getAllProductList() as any); // Refresh list
        return productWithId;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

// Update a product in Firebase
export const updateProduct = (productId: string, productData: Partial<Product>) => async (dispatch: AppDispatch) => {
    try {
        const productRef = ref(db, `products/${productId}`);
        await update(productRef, productData);
        dispatch(getAllProductList() as any); // Refresh list
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Delete a product from Firebase
export const deleteProduct = (productId: string | number) => async (dispatch: AppDispatch) => {
    try {
        const productRef = ref(db, `products/${productId}`);
        await remove(productRef);
        dispatch(getAllProductList() as any); // Refresh list
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

//Fetch product categories
export const getProductCategoryList = () => async (dispatch: AppDispatch) => {
    try {
        // Categories are now handled in getAllProductList for consistency
        // but can be fetched separately if needed.
        const result = await axios.get("https://dummyjson.com/products/categories");
        if (result?.data) {
            // Filter out objects if any, and ensure we only pass strings
            const categories = (result.data as any[]).map(cat => typeof cat === 'string' ? cat : cat.slug);
            dispatch(setProductCategoryList(categories));
        }
    } catch (error) {
        console.error("Failed to get category list:", error);
    }
};

//Fetch product details by ID
export const getProductById = (data: { id: string | number }) => async (dispatch: AppDispatch) => {
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
export const getSearchProductList = (searchQuery: string) => async (dispatch: AppDispatch) => {
    try {
        const result = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
        if (result?.data?.products) {
            dispatch(setSearchProductList({ list: result.data.products, query: searchQuery }));
        } else {
            dispatch(setSearchProductList({ list: [], query: searchQuery }));
            console.error("No search results found.");
        }
    } catch (error) {
        console.error("Failed to get product details:", error);
        dispatch(setSearchProductList({ list: [], query: searchQuery }));
    }
};

//Add to cart
export const addProductToCart = (product: Product) => (dispatch: AppDispatch) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
};

// Remove from cart
export const removeProductFromCart = (id: number | string) => (dispatch: AppDispatch) => {
    dispatch(removeFromCart(id));
};

// Update cart quantity
export const changeCartQuantity = (id: number | string, quantity: number) => (dispatch: AppDispatch) => {
    dispatch(updateCartQuantity({ id, quantity }));
};


