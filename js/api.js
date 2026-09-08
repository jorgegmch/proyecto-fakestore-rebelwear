import { tagProduct } from "./product-tags.js";

const API_URL = "https://fakestoreapi.com/products";

export async function getClothingProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        return data
            .filter(product =>
                product.category === "men's clothing" ||
                product.category === "women's clothing"
            )
            .map(tagProduct);

    } catch (error) {
        console.error("Error al cargar productos:", error);
        return [];
    }
}