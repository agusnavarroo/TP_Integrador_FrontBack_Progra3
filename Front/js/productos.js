const API_URL = "http://localhost:3000";

const nombreCliente = sessionStorage.getItem("nombreCliente");

const spanNombre = document.getElementById("nombre-cliente");
const spanCantidad = document.getElementById("cantidad-carrito");
const contenedorHerramientas = document.getElementById("contenedor-herramientas");
const contenedorFijaciones = document.getElementById("contenedor-fijaciones");
const mensajeProductos = document.getElementById("mensaje-productos");

let productos = [];

function leerCarrito() {

    const guardado = sessionStorage.getItem("carrito");

    return guardado ? JSON.parse(guardado) : [];

}

function guardarCarrito(carrito) {

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

}

function actualizarContador() {

    const carrito = leerCarrito();
    let total = 0;

    carrito.forEach(item => {
        total += item.cantidad;
    });

    spanCantidad.textContent = total;

}

function agregarAlCarrito(id) {

    const producto = productos.find(prod => prod.id === id);
    const carrito = leerCarrito();
    const existente = carrito.find(item => item.id_producto === id);

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            id_producto: producto.id,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            imagen: producto.imagen,
            cantidad: 1
        });

    }

    guardarCarrito(carrito);
    actualizarContador();

}

function quitarDelCarrito(id) {

    let carrito = leerCarrito();
    const existente = carrito.find(item => item.id_producto === id);

    if (!existente) {
        return;
    }

    existente.cantidad--;

    if (existente.cantidad === 0) {
        carrito = carrito.filter(item => item.id_producto !== id);
    }

    guardarCarrito(carrito);
    actualizarContador();

}

function crearCard(producto) {

    return `
        <div class="card-producto">
            <img class="card-img" src="${API_URL}${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p class="card-precio">$ ${producto.precio}</p>
            <div class="card-botones">
                <button class="btn-quitar" data-id="${producto.id}">Quitar</button>
                <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        </div>
    `;

}

function mostrarProductos() {

    const herramientas = productos.filter(prod => prod.categoria === "Herramientas");
    const fijaciones = productos.filter(prod => prod.categoria === "Fijaciones");

    contenedorHerramientas.innerHTML = herramientas.map(crearCard).join("");
    contenedorFijaciones.innerHTML = fijaciones.map(crearCard).join("");

    document.querySelectorAll(".btn-agregar").forEach(boton => {
        boton.addEventListener("click", () => agregarAlCarrito(Number(boton.dataset.id)));
    });

    document.querySelectorAll(".btn-quitar").forEach(boton => {
        boton.addEventListener("click", () => quitarDelCarrito(Number(boton.dataset.id)));
    });

}

async function cargarProductos() {

    try {

        const response = await fetch(`${API_URL}/api/products/active`);
        const data = await response.json();

        if (!response.ok) {
            mensajeProductos.textContent = data.message;
            return;
        }

        productos = data.payload;
        mostrarProductos();

    } catch (error) {

        console.error("Error al cargar productos: ", error);
        mensajeProductos.textContent = "Error de conexion con el servidor";

    }

}

if (!nombreCliente) {

    window.location.href = "./index.html";

} else {

    spanNombre.textContent = nombreCliente;
    actualizarContador();
    cargarProductos();

}