import { getCart, saveCart } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {

    const cartSection = document.getElementById("cart-items");

    const subtotalEl = document.getElementById("val-subt");
    const envioEl = document.getElementById("val-env");
    const totalEl = document.getElementById("val-total");

    const SHIPPING_COST = 15;
    const FREE_SHIPPING_THRESHOLD = 200;

    const continueBtn = document.getElementById("btn-continue-shopping");
    continueBtn.addEventListener("click", () => {
        window.location.href = "catalog.html";
    });

    let cart = getCart();

    function renderCart() {

        cartSection.querySelectorAll(".cart-card, .cart-empty").forEach(el => el.remove());

        if (!cart.length) {
            const emptyMsg = document.createElement("p");
            emptyMsg.classList.add("cart-empty");
            emptyMsg.textContent = "Tu carrito está vacío.";
            cartSection.appendChild(emptyMsg);
            updateSummary();
            return;
        }

        cart.forEach(product => {

            const article = document.createElement("article");
            article.classList.add("cart-card");

            article.innerHTML = `
                <div class="img-cart">
                    <img src="${product.image}" alt="${product.title}" class="prd-img">
                </div>

                <div class="cart-info">
                    <h3 class="name-prodt">${product.title}</h3>
                    <p>Talla: M &nbsp;&nbsp; Color: Único</p>

                    <div class="cart-controls">
                        <button class="mas-menos menos">-</button>
                        <span>${product.quantity}</span>
                        <button class="mas-menos mas">+</button>
                        <button class="delete-product">🗑️</button>
                    </div>
                </div>

                <div class="cart-price">
                    <strong class="price-prd">
                        $${(product.price * product.quantity).toFixed(2)}
                    </strong>
                    <small>$${(product.price * product.quantity).toFixed(2)}</small>
                </div>
            `;

            // Aumentar cantidad
            article.querySelector(".mas").addEventListener("click", () => {
                product.quantity++;
                updateCart();
            });

            // Disminuir cantidad
            article.querySelector(".menos").addEventListener("click", () => {
                if (product.quantity > 1) {
                    product.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== product.id);
                }
                updateCart();
            });

            // Eliminar producto
            article.querySelector(".delete-product").addEventListener("click", () => {
                cart = cart.filter(item => item.id !== product.id);
                updateCart();
            });

            cartSection.appendChild(article);
        });

        updateSummary();
    }

    function updateSummary() {
        const subtotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
        const shipping = !cart.length ? 0 : (freeShipping ? 0 : SHIPPING_COST);

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        envioEl.textContent = !cart.length
            ? "$0.00"
            : (freeShipping ? "Envío gratis" : `$${shipping.toFixed(2)}`);
        totalEl.textContent = `$${(subtotal + shipping).toFixed(2)}`;
    }

    function updateCart() {
        saveCart(cart);
        renderCart();
    }

    renderCart();
});