import { Product } from "../state/store/features/productData";

export const categories: string[] = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Wellness",
    "Automotive",
    "Groceries"
];

const generateProducts = (): Product[] => {
    const products: Product[] = [];
    let idCounter = 1;

    categories.forEach((category) => {
        for (let i = 1; i <= 20; i++) {
            const id = idCounter++;
            products.push({
                id,
                title: `${category} Product ${i}`,
                description: `This is a high-quality product from the ${category} category. It is designed for maximum performance and durability.`,
                price: Math.floor(Math.random() * 500) + 10,
                discountPercentage: Math.floor(Math.random() * 20),
                rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
                stock: Math.floor(Math.random() * 100) + 1,
                brand: `${category} Brand`,
                category: category,
                thumbnail: `https://picsum.photos/seed/${id}/400/400`,
                images: [
                    `https://picsum.photos/seed/${id}_1/800/800`,
                    `https://picsum.photos/seed/${id}_2/800/800`,
                    `https://picsum.photos/seed/${id}_3/800/800`
                ],
                availabilityStatus: "In Stock",
                minimumOrderQuantity: 1,
                returnPolicy: "30 days return policy",
                warrantyInformation: "1 year warranty",
                shippingInformation: "Ships in 3-5 business days"
            });
        }
    });

    return products;
};

export const dummyProducts: Product[] = generateProducts();
