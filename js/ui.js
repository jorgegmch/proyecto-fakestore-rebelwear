import { addToCart } from "./cart.js";
import { setBackgroundImage } from "./dom-helpers.js";

export function renderProducts(products, cards) {

    cards.forEach((card, index) => {
        const product = products[index];

        if (!product) {
            card.style.display = "none";
            return;
        }

        card.style.display = "";

        const imgContainer = card.querySelector(".img-card-collect");
        setBackgroundImage(imgContainer, product.image);

        card.querySelector(".name-prod-collect").textContent = product.title;

        card.querySelector(".price-prod-collect").textContent =
            `$${product.price.toFixed(2)}`;

        const btn = card.querySelector(".btn-add-collect");

        btn.replaceWith(btn.cloneNode(true));
        const newBtn = card.querySelector(".btn-add-collect");

        newBtn.addEventListener("click", () => {
            addToCart(product);
            window.location.href = "../html/shopping-cart.html";
        });
    });
}