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

// Evita que el menú "parpadee" al cruzar el breakpoint mientras se
// arrastra el borde de la ventana: apaga las transiciones durante el
// resize y las reactiva cuando el usuario deja de mover el borde.
let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resizing");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resizing");
    }, 200);
});