/*==========================
	Modelos de producto
==========================*/

import connection from "../database/db.js";

const selectActiveProducts = () => {
    const sql = "SELECT id, nombre, precio, imagen, categoria FROM productos WHERE productos.activo = TRUE";
    return connection.query(sql);
}


const selectAllProducts = () => {

    const sql = "SELECT id, nombre, precio, imagen, categoria, activo FROM productos";
    return connection.query(sql);
};

const selectProductById = (id) => {

    const sql = "SELECT id, nombre, precio, imagen, categoria, activo FROM productos WHERE productos.id = ?";
    return connection.query(sql, [id]);
}

const insertNewProduct = (nombre, imagen, categoria, precio) => {

    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)"
    return connection.query(sql, [nombre, imagen, categoria, precio]);
}

const updateProduct = (nombre, imagen, precio, categoria, activo, id) => {
    const sql = "UPDATE productos SET nombre = ?, imagen = ?, precio = ?, categoria = ?, activo = ? WHERE id = ?";

    return connection.query(sql, [nombre, imagen, precio, categoria, activo, id]);
}

const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    return connection.query(sql, [id]);
}

const updateProductStatus = (activo, id) => {
    const sql = "UPDATE productos SET activo = ? WHERE id = ?";
    return connection.query(sql, [activo, id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct,
    selectActiveProducts,
    updateProductStatus
}