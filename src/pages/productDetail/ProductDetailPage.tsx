import React, { useState } from "react";
import { Grid } from "@mui/material";
import ProductDescription from "../../components/commonComponents/customCards/ProductDescription";
import ProductDetailCard from "../../components/commonComponents/customCards/ProductDetailCard";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store/store";
const ProductDetailPage: React.FC = () => {

const product = useSelector((state: RootState) => state.productData?.currentProduct)

    const originalPrice = product?.price / (1 - (product?.discountPercentage / 100));

    console.log(product);

    const [quant, setQuant] = useState(1);
    // const [orderedQuant, setOrderedQuant] = useState(0);
    const addQuant = () => setQuant((prev) => Math.min(prev + 1, 100));
    const removeQuant = () => setQuant((prev) => Math.max(prev - 1, 0));
    //   const resetQuant = () => setQuant(1);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProductDetailCard images={product?.images} />
                    </Grid>
                    <Grid item xs={8}>
                        <ProductDescription
                            onQuant={quant}
                            onAdd={addQuant}
                            onRemove={removeQuant}
                            onSetOrderedQuant={(Number)}
                            productName={product?.title}
                            brand={product?.brand}
                            productDescription={product?.description}
                            price={product?.price}
                            stock={product?.stock}
                            rating={product?.rating}
                            discount={product?.discountPercentage}
                            originalPrice={originalPrice}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default ProductDetailPage;
