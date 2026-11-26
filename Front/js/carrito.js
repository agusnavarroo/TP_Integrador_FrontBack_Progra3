const API_URL = "http://localhost:3000";

const nombreCliente = sessionStorage.getItem("nombreCliente");

const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCarrito = document.getElementById("total-carrito");
const mensajeCarrito = document.getElementById("mensaje-carrito");
const btnConfirmar = document.getElementById("btn-confirmar");
const modalConfirmar = document.getElementById("modal-confirmar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnAceptar = document.getElementById("btn-aceptar");

function leerCarrito() {

    const guardado = sessionStorage.getItem("carrito");

    return guardado ? JSON.parse(guardado) : [];

}

function guardarCarrito(carrito) {

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

}

function calcularTotal(carrito) {

    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    return total;

}

function cambiarCantidad(id, cambio) {

    let carrito = leerCarrito();
    const existente = carrito.find(item => item.id_producto === id);

    existente.cantidad += cambio;

    if (existente.cantidad <= 0) {
        carrito = carrito.filter(item => item.id_producto !== id);
    }

    guardarCarrito(carrito);
    mostrarCarrito();

}

function eliminarProducto(id) {

    const carrito = leerCarrito().filter(item => item.id_producto !== id);

    guardarCarrito(carrito);
    mostrarCarrito();

}

function crearItem(item) {

    return `
        <div class="carrito-item">
            <img src="${API_URL}${item.imagen}" alt="${item.nombre}">
            <div class="carrito-info">
                <h4>${item.nombre}</h4>
                <p>$ ${item.precio} c/u</p>
            </div>
            <div class="carrito-controles">
                <button class="btn-cantidad btn-menos" data-id="${item.id_producto}">-</button>
                <span class="cantidad">${item.cantidad}</span>
                <button class="btn-cantidad btn-mas" data-id="${item.id_producto}">+</button>
                <button class="btn-eliminar" data-id="${item.id_producto}">Eliminar</button>
            </div>
        </div>
    `;

}

function mostrarCarrito() {

    const carrito = leerCarrito();

    if (carrito.length === 0) {

        contenedorCarrito.innerHTML = "<p>El carrito esta vacio</p>";
        totalCarrito.textContent = 0;
        return;

    }

    contenedorCarrito.innerHTML = carrito.map(crearItem).join("");
    totalCarrito.textContent = calcularTotal(carrito);

    document.querySelectorAll(".btn-menos").forEach(boton => {
        boton.addEventListener("click", () => cambiarCantidad(Number(boton.dataset.id), -1));
    });

    document.querySelectorAll(".btn-mas").forEach(boton => {
        boton.addEventListener("click", () => cambiarCantidad(Number(boton.dataset.id), 1));
    });

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", () => eliminarProducto(Number(boton.dataset.id)));
    });

}

btnConfirmar.addEventListener("click", () => {

    if (leerCarrito().length === 0) {

        mensajeCarrito.textContent = "El carrito esta vacio";
        return;

    }

    mensajeCarrito.textContent = "";
    modalConfirmar.showModal();

});

btnCancelar.addEventListener("click", () => {

    modalConfirmar.close();

});

btnAceptar.addEventListener("click", async () => {

    const carrito = leerCarrito();
    const total = calcularTotal(carrito);

    // Fecha y hora de Argentina con formato: 2026-11-26 14:00:00
    const fecha = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "America/Argentina/Buenos_Aires",
        dateStyle: "short",
        timeStyle: "medium"
    }).format(new Date());

    const venta = {
        nombre_usuario: nombreCliente,
        fecha: fecha,
        precio_total: total,
        productos: carrito.map(item => ({
            id_producto: item.id_producto,
            cantidad: item.cantidad
        }))
    };

    try {

        const response = await fetch(`${API_URL}/api/sales`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(venta)
        });

        const data = await response.json();

        if (!response.ok) {

            modalConfirmar.close();
            mensajeCarrito.textContent = data.message;
            return;

        }

        const ticket = {
            idVenta: data.saleId,
            nombre: nombreCliente,
            fecha: fecha,
            productos: carrito,
            total: total
        };

        sessionStorage.setItem("ticket", JSON.stringify(ticket));
        sessionStorage.removeItem("carrito");

        window.location.href = "./ticket.html";

    } catch (error) {

        console.error("Error al registrar la venta: ", error);
        modalConfirmar.close();
        mensajeCarrito.textContent = "Error de conexion con el servidor";

    }

});

if (!nombreCliente) {

    window.location.href = "./index.html";

} else {

    mostrarCarrito();

}