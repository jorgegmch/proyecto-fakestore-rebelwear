import { getClothingProducts } from "./api.js";
import { renderProducts } from "./ui.js";

let allProducts = [];
let filteredProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await getClothingProducts();
    filteredProducts = [...allProducts];

    const cards = document.querySelectorAll(".cards-pag-collect");
    renderProducts(filteredProducts, cards);

    setupSearch(cards);
    setupFilters(cards);
    setupCategories(cards);
});

/* Buscador */
function setupSearch(cards) {
    const input = document.querySelector('input[type="search"]');

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase();
        filteredProducts = allProducts.filter(p =>
            p.title.toLowerCase().includes(value)
        );
        renderProducts(filteredProducts, cards);
    });
}

/* Filtros */
function setupFilters(cards) {
    const select = document.querySelector(".search-filter");

    select.addEventListener("change", () => {
        if (select.value === "precio-mayor") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
        if (select.value === "precio-menor") {
            filteredProducts.sort((a, b) => a.price - b.price);
        }
        if (select.value === "nuevos") {
            filteredProducts.sort((a, b) => b.id - a.id);
        }

        renderProducts(filteredProducts, cards);
    });
}

/* Categorias */
function setupCategories(cards) {
    const buttons = document.querySelectorAll(".catg-collect");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.textContent.toLowerCase();

            if (category === "todos") {
                filteredProducts = [...allProducts];
            } else {
                filteredProducts = allProducts.filter(p =>
                    p.category.toLowerCase().includes(category)
                );
            }

            renderProducts(filteredProducts, cards);
        });
    });
}