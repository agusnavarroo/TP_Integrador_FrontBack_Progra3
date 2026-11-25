import ProductModels from "../models/product.models.js";

export const vistaProductos = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();
        res.render("index", {
            title: "Ferretería Fertin - Principal",
            listaProductos: rows
        });
    } catch (error) {
        console.log("Error cargando la vista principal: ", error);
        res.status(500).send("Error al cargar los productos");
    }
};

export const vistaConsultar = (req, res) => res.render("get", { title: "Obtener producto" });
export const vistaCrear = (req, res) => res.render("post", { title: "Crear producto" });
export const vistaModificar = (req, res) => res.render("put", { title: "Modificar producto" });
export const vistaEliminar = (req, res) => res.render("delete", { title: "Eliminar producto" });