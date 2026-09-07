## ANÁLISIS PROYECTO REBELWEAR

## Descripción

Este archivo contiene explicación detallada sobre las decisiones de diseño, estructuras de datos, filtros y ordenamientos de usabilidad, que fueron implementados durante el proyecto con el objetivo de consolidar los conocimientos vistos previamente en clase de programación avanzada, modulo de JavaScript.

## Decisiones de diseño

1. Inicialicé repositorio en GitHub para almacenar todo el proyecto.

2. Maqueté el diseño por medio de la aplicación web: https://www.figma.com/es-es/

3. Proporcioné paletas de color en tonos rojos, negros, grises y blancos para hacerlo ver más moderno e intenso. 
	
	ROJOS - HEX: #DD0000 rojo claro - #210000 rojo oscuro
	NEGRO - HEX: #000000
	BLANCO - HEX: #FFFFFF
	GRISES - HEZ: #1B1B1B gris oscuro - #6D6D6D gris claro

4. Elegí como tipografía la letra "Inter", la cual incrusté en el HTML a traves de la API de Google Fonts.

5. Escogi colores entre las tonalidades del rojo porque generan sensación de ansiedad, energia e incentivan a la compra, razón por la que muchas marcas famosas utilizan este color y el negro para un toque elegante, impactante y moderno.

6. Cuando inicie el diseño con el HTML y el CSS, utilizaba 'position: relative;' para los contenedores padres y 'position: absolute;' para los hijos, sin darme cuenta, los sobre utilice, lo que rompe el diseño en tanto a responsividad, pero luego de tanto investigar, logré reparar la falla en el main del archivo catalog.html

7. Tardé entendí que era mejor usar 'display: grid;' para organizar mis contenedores principales y así asegurar una mejor responsividad o respuesta en pantallas de desktop con tamaños diferentes y facilitar el cambio de medidas a pantallas de moviles y tablets.


## Estructura de datos

### Productos
Los productos se obtienen desde la **FakeStore API** y se manejan como objetos JSON con la siguiente estructura:

- `id`: identificador único del producto  
- `title`: nombre del producto  
- `price`: precio  
- `category`: categoría  
- `image`: imagen del producto  

Desde `api.js` se filtran únicamente las categorías **men's clothing** y **women's clothing**, lo que garantiza que el catálogo esté enfocado solo en ropa y evita procesar productos innecesarios.

---

### Carrito de compras
El carrito se representa como un **arreglo de objetos**, donde cada objeto corresponde a un producto agregado:

	[
	{
		id: number,
		title: string,
		price: number,
		image: string,
		quantity: number
	}
	]

- El id se usa como clave única para identificar productos.
- quantity permite manejar múltiples unidades de un mismo producto sin duplicarlos.
- Solo se almacenan los datos necesarios para el carrito, optimizando el uso de memoria.

## Just. filtros y ordenamientos desde la usabilidad

### Buscador por texto

Se filtran los productos según el texto ingresado en el buscador, comparándolo con el título del producto.

**Justificación de usabilidad:**

- Permite encontrar productos de forma rápida.
- Reduce el tiempo de navegación.
- Es una funcionalidad esperada en cualquier e-commerce moderno.

### Ordenamientos

1. Precio mayor a menor
	- Dirigido a usuarios que buscan productos premium.
	- Facilita comparar artículos de mayor valor primero.

2. Precio menor a mayor
	- Beneficia a usuarios sensibles al precio.
	- Permite identificar opciones económicas rápidamente.

3. Productos nuevos
	- Se ordena por id descendente para simular novedades.
	- Ofrece una forma simple de mostrar productos recientes, aun sin fecha de creación.

### Filtros por categoría

Permiten mostrar productos por tipo (hombre, mujer o todos).

**Justificación de usabilidad:**

- Reduce la cantidad de productos visibles.
- Facilita la comparación entre artículos similares.
- Refleja la forma habitual en que los usuarios navegan tiendas online.