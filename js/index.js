import { getClothingProducts } from "./api.js";
import { addToCart } from "./cart.js";
import { setBackgroundImage } from "./dom-helpers.js";

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

        setBackgroundImage(container, product.image);
    });

    // Preview colección
    const previewCards = document.querySelectorAll("#preview-coleccion article");

    products.slice(0, 6).forEach((product, index) => {
        const card = previewCards[index];
        if (!card) return;

        const image = card.querySelector(".prev-producto");
        const title = card.querySelector(".nombre-producto-prev");
        const price = card.querySelector(".precio-producto-prev");
        const crossedPrice = card.querySelector(".precio-tachado-prev");
        const badge = card.querySelector(".product-badge");
        const btn = card.querySelector(".btn-add-prev");

        setBackgroundImage(image, product.image);

        title.textContent = product.title;
        price.textContent = `$${product.price.toFixed(2)}`;

        if (product.onSale) {
            crossedPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
            badge.textContent = "HOT SALE";
            badge.style.display = "flex";
        } else if (product.isNew) {
            crossedPrice.textContent = "";
            badge.textContent = "NUEVO";
            badge.style.display = "flex";
        } else {
            crossedPrice.textContent = "";
            badge.style.display = "none";
        }

        btn.addEventListener("click", () => {
            addToCart(product);
            window.location.href = "html/shopping-cart.html";
        });
    });
});