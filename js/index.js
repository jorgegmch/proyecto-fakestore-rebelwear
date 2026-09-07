import { getClothingProducts } from "./api.js";
import { addToCart } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {

    const products = await getClothingProducts();
    if (!products.length) return;

// Destacados
    const featuredContainers = document.querySelectorAll(
        "#sect-destacado .producto-dest"
    );

    products.slice(0, 3).forEach((product, index) => {
        const container = featuredContainers[index];
        if (!container) return;

        container.style.backgroundImage = `url(${product.image})`;
        container.style.backgroundSize = "cover";
        container.style.backgroundPosition = "center";
    });

// Preview colección
    const previewCards = document.querySelectorAll("#preview-coleccion article");

    products.slice(0, 6).forEach((product, index) => {
        const card = previewCards[index];
        if (!card) return;

        const image = card.querySelector(".prev-producto");
        const title = card.querySelector(".nombre-producto-prev");
        const price = card.querySelector(".precio-producto-prev");
        const btn = card.querySelector(".btn-add-prev");

        image.style.backgroundImage = `url(${product.image})`;
        image.style.backgroundSize = "cover";
        image.style.backgroundPosition = "center";

        title.textContent = product.title;
        price.textContent = `$ ${product.price.toFixed(2)}`;

        btn.addEventListener("click", () => {
            addToCart(product);
            window.location.href = "HTML/shopping-cart.html";
        });
    });
});