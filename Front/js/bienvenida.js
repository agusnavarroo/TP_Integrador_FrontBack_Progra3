const bienvenidaForm = document.getElementById("bienvenidaForm");
const mensajeBienvenida = document.getElementById("mensaje-bienvenida");

bienvenidaForm.addEventListener("submit", event => {

    event.preventDefault();

    const nombre = event.target.nombre.value.trim();


    if (nombre.length < 2) {

        mensajeBienvenida.textContent = "El nombre debe tener al menos 2 caracteres";
        return;

    }

    sessionStorage.setItem("nombreCliente", nombre);

    window.location.href = "./productos.html";

});