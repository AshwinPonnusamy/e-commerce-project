import { 
    setAllProductList, 
    setCurrentProduct, 
    setProductCategoryList, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    setSearchProductList 
} from "../store/features/productData";
import { AppDispatch } from "../store/store";
import { Product } from "../store/features/productData";
import { dummyProducts, categories } from "../../utils/dummyData";

// Fetch all products from dummy data
export const getAllProductList = () => (dispatch: AppDispatch) => {
    try {
        dispatch(setAllProductList(dummyProducts));
        dispatch(setProductCategoryList(categories));
    } catch (error) {
        console.error("Failed to get product list:", error);
    }
};

// Add product (Mocked)
export const addNewProduct = (productData: Partial<Product>) => (dispatch: AppDispatch) => {
    try {
        const newProduct = { ...productData, id: Date.now().toString() } as Product;
        // In a real app, you'd update the dummyProducts array or a local state
        // For now, we'll just refresh with existing dummy data to simulate a change
        dispatch(getAllProductList() as any); 
        return newProduct;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

// Update product (Mocked)
export const updateProduct = (productId: string, productData: Partial<Product>) => (dispatch: AppDispatch) => {
    try {
        console.log("Mock update product:", productId, productData);
        dispatch(getAllProductList() as any); 
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Delete product (Mocked)
export const deleteProduct = (productId: string | number) => (dispatch: AppDispatch) => {
    try {
        console.log("Mock delete product:", productId);
        dispatch(getAllProductList() as any); 
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Fetch product categories
export const getProductCategoryList = () => (dispatch: AppDispatch) => {
    try {
        dispatch(setProductCategoryList(categories));
    } catch (error) {
        console.error("Failed to get category list:", error);
    }
};

// Fetch product details by ID from dummy data
export const getProductById = (data: { id: string | number }) => (dispatch: AppDispatch) => {
    try {
        const product = dummyProducts.find(p => p.id.toString() === data.id.toString());
        if (product) {
            dispatch(setCurrentProduct(product));
        } else {
            console.error("Error: Product not found in dummy data");
        }
    } catch (error) {
        console.error("Failed to get product details:", error);
    }
};

// Search products in dummy data
export const getSearchProductList = (searchQuery: string) => (dispatch: AppDispatch) => {
    try {
        const filteredProducts = dummyProducts.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        dispatch(setSearchProductList({ list: filteredProducts, query: searchQuery }));
    } catch (error) {
        console.error("Failed to search products:", error);
        dispatch(setSearchProductList({ list: [], query: searchQuery }));
    }
};

// Add to cart
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


