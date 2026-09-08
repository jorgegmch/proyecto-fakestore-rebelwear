import { getClothingProducts } from "./api.js";
import { renderProducts } from "./ui.js";
import { filterByText, sortByPrice } from "./filters.js";

let allProducts = [];

const state = {
    searchText: "",
    category: null,
    sortOrder: null
};

const CATEGORY_MAP = {
    "hombre": "men's clothing",
    "mujer": "women's clothing"
};

document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await getClothingProducts();

    const cards = document.querySelectorAll(".cards-pag-collect");
    applyFiltersAndRender(cards);

    setupSearch(cards);
    setupSortSelect(cards);
    setupCategories(cards);
});

/* Combina los tres filtros del estado sobre allProducts */
function getFilteredProducts() {
    let result = [...allProducts];

    if (state.category) {
        result = result.filter(p => p.category === state.category);
    }

    if (state.searchText) {
        result = filterByText(result, state.searchText);
    }

    if (state.sortOrder === "asc" || state.sortOrder === "desc") {
        result = sortByPrice(result, state.sortOrder);
    } else if (state.sortOrder === "newest") {
        result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
}

function applyFiltersAndRender(cards) {
    renderProducts(getFilteredProducts(), cards);
}

/* Buscador */
function setupSearch(cards) {
    const input = document.querySelector('input[type="search"]');

    input.addEventListener("input", () => {
        state.searchText = input.value;
        applyFiltersAndRender(cards);
    });
}

/* Filtro de ordenamiento (desplegable) */
function setupSortSelect(cards) {
    const select = document.querySelector("select.search-filter");

    select.addEventListener("change", () => {
        if (select.value === "precio-mayor") {
            state.sortOrder = "desc";
        } else if (select.value === "precio-menor") {
            state.sortOrder = "asc";
        } else if (select.value === "nuevos") {
            state.sortOrder = "newest";
        } else {
            state.sortOrder = null;
        }

        applyFiltersAndRender(cards);
    });
}

/* Categorías: estado visual (.active) y filtrado en un solo lugar */
function setupCategories(cards) {
    const buttons = document.querySelectorAll(".catg-collect");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const label = btn.textContent.trim().toLowerCase();
            state.category = label === "todos" ? null : (CATEGORY_MAP[label] || null);

            applyFiltersAndRender(cards);
        });
    });
}