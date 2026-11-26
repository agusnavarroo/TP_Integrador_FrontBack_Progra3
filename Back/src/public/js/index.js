const botonesEstado = document.querySelectorAll(".btn-estado");

botonesEstado.forEach(boton => {

    boton.addEventListener("click", async () => {

        // Leemos los datos que dejamos escritos en el boton desde el EJS
        const id = boton.dataset.id;
        const estaActivo = boton.dataset.activo === "1";

        // Si esta activo lo desactivamos, y si esta desactivado lo reactivamos
        const nuevoEstado = !estaActivo;

        const confirmacion = confirm(nuevoEstado ? "Queres reactivar este producto?" : "Queres desactivar este producto?");

        if (!confirmacion) {
            return;
        }

        try {
            const response = await fetch(`/api/products/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ activo: nuevoEstado })
            });

            const result = await response.json();

            if (!response.ok) {
                return alert(result.message);
            }

            // Recargamos la principal para ver el cambio
            window.location.href = "/dashboard/principal";

        } catch (error) {
            console.error("Error al cambiar el estado: ", error);
            alert("Error al cambiar el estado del producto");
        }
    });
});