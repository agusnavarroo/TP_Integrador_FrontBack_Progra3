import ProductModels from "../models/product.models.js";

export const vistaProductos = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();

        const grupos = [
            { titulo: "Herramientas", productos: rows.filter(producto => producto.categoria === "Herramientas") },
            { titulo: "Fijaciones", productos: rows.filter(producto => producto.categoria === "Fijaciones") }
        ];

        res.render("index", {
            title: "Ferretería Fertin - Principal",
            grupos: grupos
        });
    } catch (error) {
        console.log("Error cargando la vista principal: ", error);
        res.status(500).send("Error al cargar los productos");
    }
};

export const vistaConsultar = (req, res) => res.render("get", { title: "Obtener producto" });
export const vistaCrear = (req, res) => res.render("post", { title: "Crear producto" });
export const vistaEliminar = (req, res) => res.render("delete", { title: "Eliminar producto" });


export const vistaModificar = (req, res) => {

    const idProducto = req.query.id || "";

    res.render("put", {
        title: "Modificar producto",
        idProducto: idProducto
    });
};