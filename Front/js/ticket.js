const contenedorTicket = document.getElementById("contenedor-ticket");
const mensajeTicket = document.getElementById("mensaje-ticket");
const btnPdf = document.getElementById("btn-pdf");
const btnSalir = document.getElementById("btn-salir");

const guardado = sessionStorage.getItem("ticket");
const ticket = guardado ? JSON.parse(guardado) : null;

function mostrarTicket() {

    let lineas = "";

    ticket.productos.forEach(item => {

        lineas += `
            <div class="ticket-linea">
                <span>${item.nombre} x${item.cantidad}</span>
                <span>$ ${item.precio * item.cantidad}</span>
            </div>
        `;

    });

    contenedorTicket.innerHTML = `
        <p class="ticket-empresa">Ferreteria Fertin</p>
        <p class="ticket-datos">Ticket Nro: ${ticket.idVenta}</p>
        <p class="ticket-datos">Cliente: ${ticket.nombre}</p>
        <p class="ticket-datos">Fecha: ${ticket.fecha}</p>
        ${lineas}
        <div class="ticket-total">
            <span>Total</span>
            <span>$ ${ticket.total}</span>
        </div>
    `;

}

btnPdf.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Ferreteria Fertin", 10, 15);

    doc.setFontSize(11);
    doc.text(`Ticket Nro: ${ticket.idVenta}`, 10, 25);
    doc.text(`Cliente: ${ticket.nombre}`, 10, 32);
    doc.text(`Fecha: ${ticket.fecha}`, 10, 39);

    let y = 52;

    ticket.productos.forEach(item => {

        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.text(`${item.nombre} x${item.cantidad}`, 10, y);
        doc.text(`$ ${item.precio * item.cantidad}`, 160, y);

        y += 8;

    });

    doc.setFontSize(13);
    doc.text(`Total: $ ${ticket.total}`, 10, y + 6);

    doc.save(`ticket-${ticket.idVenta}.pdf`);

});

btnSalir.addEventListener("click", () => {

    sessionStorage.clear();

    window.location.href = "./index.html";

});

if (!ticket) {

    window.location.href = "./index.html";

} else {

    mostrarTicket();

}