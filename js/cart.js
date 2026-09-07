import { getCart, saveCart } from "./storage.js";

export function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
}