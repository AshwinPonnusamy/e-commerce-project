import React, { useState } from "react";
import { Grid } from "@mui/material";
import ProductDescription from "../../components/commonComponents/customCards/ProductDescription";
import ProductDetailCard from "../../components/commonComponents/customCards/ProductDetailCard";
const ProductPage: React.FC = () => {
    const [quant, setQuant] = useState(1);
    // const [orderedQuant, setOrderedQuant] = useState(0);
    const addQuant = () => setQuant((prev) => Math.min(prev + 1, 100));
    const removeQuant = () => setQuant((prev) => Math.max(prev - 1, 0));
    //   const resetQuant = () => setQuant(1);
    const productImages = [
        "https://cdn.dummyjson.com/products/images/beauty/Essence Mascara Lash Princess/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
        "https://cdn.dummyjson.com/products/images/beauty/Essence Mascara Lash Princess/3.png",
    ];
    return (

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProductDetailCard images={productImages} />
                    </Grid>

                    <Grid item xs={8}>
                        <ProductDescription
                            onQuant={quant}
                            onAdd={addQuant}
                            onRemove={removeQuant}
                            onSetOrderedQuant={(Number)}
                            productName={""}
                            productDescription={""}
                            price={0}
                            discount={0}
                            originalPrice={0}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default ProductPage;
