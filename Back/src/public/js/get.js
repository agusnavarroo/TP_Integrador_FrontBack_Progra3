const contenedorProductos = document.getElementById("contenedor-productos");
const getIdProductForm = document.getElementById("getIdProductForm");

getIdProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = Number(event.target.idProd.value.trim());

    if (!idProd || idProd <= 0) {
        return mostrarError("Ingresa un id valido");
    }

    try {
        const response = await fetch(`/api/products/${idProd}`);
        const data = await response.json();

        if (!response.ok) {
            return mostrarError(data.message);
        }

        renderizarProducto(data.payload[0]);

    } catch (error) {
        console.error("Error al obtener producto: ", error.message);
        mostrarError("Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <ul class="lista-container">
            <li class="lista-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="lista-producto_img">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Precio: $${producto.precio}</p>
            </li>
        </ul>
    `;
}

function mostrarError(texto) {
    contenedorProductos.innerHTML = `<p class="mensaje error">${texto}</p>`;
}