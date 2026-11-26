const contenedorProductos = document.getElementById("contenedor-productos");
const getIdProductForm = document.getElementById("getIdProductForm");

function validarFormulario(data) {
    const errores = [];

    if (!data.nombre || data.nombre.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!data.precio || data.precio < 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!data.categoria) {
        errores.push("Debe seleccionar una categoria");
    }

    return errores;
}

function mostrarListaErrores(array) {
    let html = "<div class='errores-container'>";
    array.forEach(error => {
        html += `<p class="mensaje error">${error}</p>`;
    });
    html += "</div>";
    contenedorProductos.innerHTML = html;
}

function mostrarMensaje(estado, texto) {
    contenedorProductos.innerHTML = `<p class="mensaje ${estado}">${texto}</p>`;
}

getIdProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

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
                <p><button id="updateProduct-button">Actualizar producto</button></p>
            </li>
        </ul>
    `;

    document.getElementById("updateProduct-button").addEventListener("click", () => {
        if (confirm("Queres actualizar este producto?")) {
            mostrarFormProducto(producto);
        } else {
            alert("Actualizacion cancelada");
        }
    });
}

function mostrarFormProducto(producto) {
    contenedorProductos.innerHTML = `
        <section class="updateProduct-container">
            <h2>Actualizar producto</h2>

            <form id="updateProductForm">
                <input type="hidden" name="id" value="${producto.id}">

                <label for="categoryProd">Categoria</label>
                <select name="categoria" id="categoryProd" required>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Fijaciones">Fijaciones</option>
                </select>

                <label for="imageProd">Imagen</label>
                <input type="text" name="imagen" id="imageProd" value="${producto.imagen}" required>

                <label for="nameProd">Nombre</label>
                <input type="text" name="nombre" id="nameProd" value="${producto.nombre}" required>

                <label for="priceProd">Precio</label>
                <input type="number" name="precio" id="priceProd" value="${producto.precio}" required>

                <label for="activeProd">Activo</label>
                <select name="activo" id="activeProd" required>
                    <option value="1">Activado</option>
                    <option value="0">Desactivado</option>
                </select>

                <input type="submit" value="Actualizar producto">
            </form>
        </section>
    `;

    document.getElementById("categoryProd").value = producto.categoria;
    document.getElementById("activeProd").value = producto.activo;

    document.getElementById("updateProductForm").addEventListener("submit", actualizarProducto);
}

async function actualizarProducto(event) {
    event.preventDefault();

    const formObj = Object.fromEntries(new FormData(event.target).entries());

    formObj.precio = Number(formObj.precio);
    formObj.nombre = formObj.nombre.trim();

    const errores = validarFormulario(formObj);

    if (errores.length > 0) {
        return mostrarListaErrores(errores);
    }

    try {
        const response = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObj)
        });

        const result = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", result.message);
        }

        mostrarMensaje("exito", result.message);

    } catch (error) {
        console.error("Error en la actualizacion del producto: ", error);
        mostrarMensaje("error", "Error al actualizar el producto");
    }
}

const idInicial = document.getElementById("idInicial").value;

async function cargarProductoInicial(id) {
    try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        mostrarFormProducto(data.payload[0]);

    } catch (error) {
        console.error("Error al obtener producto: ", error.message);
        mostrarMensaje("error", "Error de conexion con el servidor");
    }
}

if (idInicial) {
    cargarProductoInicial(idInicial);
}