// Nav responsive mobile

const btnResponsive = document.querySelector(".nav-responsive");
const menu = document.querySelector(".menu-principal");
const overlay = document.querySelector(".menu-overlay");

btnResponsive.addEventListener("click", () => {
    menu.classList.toggle("activo");
    overlay.classList.toggle("activo");
});

overlay.addEventListener("click", () => {
    menu.classList.remove("activo");
    overlay.classList.remove("activo");
});