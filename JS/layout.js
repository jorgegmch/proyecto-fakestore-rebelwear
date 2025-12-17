// Nav responsive mobile

const btnMenu = document.querySelector(".nav-responsive");
const menu = document.querySelector(".menu-principal");
const overlay = document.querySelector(".menu-overlay");

btnMenu.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});