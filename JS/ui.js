import { addToCart } from "./cart.js";

export function renderProducts(products, cards) {

    cards.forEach((card, index) => {
        const product = products[index];
        if (!product) return;

        const imgContainer = card.querySelector(".img-card-collect");
        imgContainer.style.backgroundImage = `url(${product.image})`;
        imgContainer.style.backgroundSize = "cover";
        imgContainer.style.backgroundPosition = "center";

        card.querySelector(".name-prod-collect").textContent = product.title;

        card.querySelector(".price-prod-collect").textContent =
            `$ ${product.price.toFixed(2)}`;

        const btn = card.querySelector(".btn-add-collect");

        btn.replaceWith(btn.cloneNode(true));
        const newBtn = card.querySelector(".btn-add-collect");

        newBtn.addEventListener("click", () => {
            addToCart(product);
            window.location.href = "../HTML/shopping-cart.html";
        });
    });
}