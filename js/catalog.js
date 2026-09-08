import { getClothingProducts } from "./api.js";
import { renderProducts } from "./ui.js";
import { filterByText, sortByPrice } from "./filters.js";

let allProducts = [];

const ITEMS_PER_PAGE = 9;

const state = {
    searchText: "",
    category: null,
    sortOrder: null,
    currentPage: 1
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
    setupPagination(cards);
});

/* Combina categoría + búsqueda + orden sobre allProducts (sin paginar) */
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

function getTotalPages() {
    const total = getFilteredProducts().length;
    return Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
}

/* Recorta el resultado filtrado a la página actual */
function getPaginatedProducts() {
    const filtered = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

    // Si un filtro nuevo deja menos páginas de las que había,
    // no te quedes "atrapado" en una página que ya no existe.
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
}

function applyFiltersAndRender(cards) {
    renderProducts(getPaginatedProducts(), cards);
    updatePaginationUI();
}

function updatePaginationUI() {
    const totalPages = getTotalPages();
    const controls = document.getElementById("pagination-controls");
    const info = document.getElementById("pagination-info");

    if (!controls || !info) return;

    // Con un solo resultado de página no hace falta mostrar los controles
    controls.style.display = totalPages > 1 ? "flex" : "none";
    info.textContent = `Página ${state.currentPage} de ${totalPages}`;
}

/* Buscador */
function setupSearch(cards) {
    const input = document.querySelector('input[type="search"]');

    input.addEventListener("input", () => {
        state.searchText = input.value;
        state.currentPage = 1;
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

        state.currentPage = 1;
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

            state.currentPage = 1;
            applyFiltersAndRender(cards);
        });
    });
}

/* Paginación: Anterior/Siguiente ciclan entre el primer y último resultado */
function setupPagination(cards) {
    const prevBtn = document.getElementById("btn-prev-page");
    const nextBtn = document.getElementById("btn-next-page");

    prevBtn.addEventListener("click", () => {
        const totalPages = getTotalPages();
        state.currentPage = state.currentPage <= 1 ? totalPages : state.currentPage - 1;
        applyFiltersAndRender(cards);
    });

    nextBtn.addEventListener("click", () => {
        const totalPages = getTotalPages();
        state.currentPage = state.currentPage >= totalPages ? 1 : state.currentPage + 1;
        applyFiltersAndRender(cards);
    });
}