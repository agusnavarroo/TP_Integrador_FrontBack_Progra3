const contenedorProductos = document.getElementById("contenedor-productos");
const getIdProductForm = document.getElementById("getIdProductForm");

getIdProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = Number(event.target.idProd.value.trim());

    if (!idProd || idProd <= 0) {
        return mostrarMensaje("error", "Ingresa un id valido");
    }

    try {
        const response = await fetch(`/api/products/${idProd}`);
        const data = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        renderizarProducto(data.payload[0]);

    } catch (error) {
        console.error("Error al obtener producto: ", error.message);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <ul class="lista-container">
            <li class="lista-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="lista-producto_img">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Precio: $${producto.precio}</p>
                <p><button id="deleteProduct-button">Eliminar producto</button></p>
            </li>
        </ul>
    `;

    document.getElementById("deleteProduct-button").addEventListener("click", () => {
        if (confirm("Queres eliminar este producto?")) {
            eliminarProducto(producto.id);
        } else {
            alert("Eliminacion cancelada");
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", result.message);
        }

        mostrarMensaje("exito", result.message);

    } catch (error) {
        console.error("Error en la solicitud DELETE: ", error);
        alert("Ocurrio un error al eliminar un producto");
    }
}

function mostrarMensaje(estado, texto) {
    contenedorProductos.innerHTML = `<p class="mensaje ${estado}">${texto}</p>`;
}