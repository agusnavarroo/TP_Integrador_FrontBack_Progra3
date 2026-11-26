/*===============================
	Controladores de producto
===============================*/

import ProductModels from "../models/product.models.js";

export const getActiveProducts = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectActiveProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No hay productos activos"
            });
        }


        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log("Error obteniendo productos activos: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener productos activos"
        });
    }
}

export const getAllProducts = async (req, res) => {

    try {
        
        const [rows, tables] = await ProductModels.selectAllProducts();


        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows,
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);


        res.status(500).json({
            message: "Error interno del servidor al obtener productos"
        });
    }
}

export const getProductById = async (req, res) => {

    try {

        const [rows] = await ProductModels.selectProductById(req.id);


        if (!rows.length) { 
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener producto por id"
        });
    }
}

export const createProduct = async (req, res) => {

    try {
        const { categoria, imagen, nombre, precio } = req.body;

        const [rows] = await ProductModels.insertNewProduct(nombre, imagen, categoria, precio);


        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.log("Error creando producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear un producto"
        });
    }
}

export const modifyProduct = async (req, res) => {

    try {
        const { id, nombre, imagen, precio, categoria, activo } = req.body;

        const [result] = await ProductModels.updateProduct(nombre, imagen, precio, categoria, activo, id);

        console.log(result);

        if (result.changedRows === 0) {
            return res.status(404).json({
                message: `No se actualizo el producto`
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} actualizado correctamente`
        });


    } catch (error) {
        console.log("Error modificando producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al modificar un producto"
        });
    }
}

export const removeProduct = async (req, res) => {

    try {
        
        await ProductModels.deleteProduct(req.id);

        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });

    } catch (error) {
        console.log("Error eliminando producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al eliminar producto"
        });
    }
}

export const changeProductStatus = async (req, res) => {
    try {
        const id = req.id;
        const { activo } = req.body;

        if (typeof activo !== "boolean") {
            return res.status(400).json({
                message: "El campo activo debe ser true o false"
            });
        }

        const [result] = await ProductModels.updateProductStatus(activo, id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No existe un producto con ese id"
            });
        }

        res.status(200).json({
            message: activo ? "Producto reactivado con exito" : "Producto desactivado con exito"
        });

    } catch (error) {
        console.log("Error cambiando el estado del producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor al cambiar el estado del producto"
        });
    }
}