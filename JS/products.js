import { addToCart } from "./cart.js";

export function renderProducts(products, container) {
    container.innerHTML = "";

    products.forEach(product => {
        const article = document.createElement("article");

        article.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button>Agregar al carrito</button>
        `;

        article.querySelector("button").addEventListener("click", () => {
            addToCart(product);
        });

        container.appendChild(article);
    });
}