const btnTema = document.getElementById("btn-tema");

const temaGuardado = localStorage.getItem("tema") || "light";

function aplicarTema(tema) {

    document.documentElement.setAttribute("data-theme", tema);

    btnTema.textContent = tema === "dark" ? "Modo claro" : "Modo oscuro";

}

btnTema.addEventListener("click", () => {

    const temaActual = document.documentElement.getAttribute("data-theme");
    const temaNuevo = temaActual === "dark" ? "light" : "dark";

    aplicarTema(temaNuevo);

    localStorage.setItem("tema", temaNuevo);

});

aplicarTema(temaGuardado);