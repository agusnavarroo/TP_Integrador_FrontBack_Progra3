const contenedorProductos = document.getElementById("contenedor-productos");
const createProductForm = document.getElementById("createProductForm");

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

createProductForm.addEventListener("submit", async event => {
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
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formObj)
        });

        const data = await response.json();

        if (!response.ok) {
            return mostrarMensaje("error", data.message);
        }

        mostrarMensaje("exito", `${data.message} con id ${data.productId}`);

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error al enviar los datos");
    }
});