// Botones de categorias de la página de colecciones

const botones = document.querySelectorAll('.catg-collect');

botones.forEach(boton => {
    boton.addEventListener('click', () => {

        botones.forEach(btn => btn.classList.remove('active'));

        boton.classList.add('active');

    });
});