// Productos marcados manualmente. Un mismo producto puede aparecer
// aquí y en cualquier página (preview, catálogo, carrito) con el
// mismo estado, porque todas consultan esta misma fuente.

export const NEW_PRODUCT_IDS = [1, 4];
export const SALE_PRODUCT_IDS = [2];
export const SALE_DISCOUNT_PERCENT = 20;

export function tagProduct(product) {
    const isNew = NEW_PRODUCT_IDS.includes(product.id);
    const onSale = SALE_PRODUCT_IDS.includes(product.id);

    return {
        ...product,
        isNew,
        onSale,
        originalPrice: onSale
            ? Number((product.price / (1 - SALE_DISCOUNT_PERCENT / 100)).toFixed(2))
            : null
    };
}