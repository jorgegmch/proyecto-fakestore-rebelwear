export function filterByText(products, text) {
    return products.filter(p =>
        p.title.toLowerCase().includes(text.toLowerCase())
    );
}

export function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
    );
}