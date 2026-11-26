/*======================
	Modelos de venta
======================*/

import connection from "../database/db.js";

const insertNewSale = (nombre_usuario, fecha, precio_total) => {
    const sql = "INSERT INTO ventas (nombre_usuario, fecha, precio_total) VALUES (?, ?, ?)";
    return connection.query(sql, [nombre_usuario, fecha, precio_total]);
}

const insertSaleProduct = (id_venta, id_producto, cantidad) => {
    const sql = "INSERT INTO ventas_productos (id_venta, id_producto, cantidad) VALUES (?, ?, ?)";
    return connection.query(sql, [id_venta, id_producto, cantidad]);
}

const selectAllSales = () => {
    const sql = "SELECT id, nombre_usuario, fecha, precio_total FROM ventas ORDER BY id DESC";
    return connection.query(sql);
}

const selectProductsBySale = (id_venta) => {
    const sql = `
        SELECT productos.id, productos.nombre, productos.precio, ventas_productos.cantidad
        FROM ventas_productos
        JOIN productos ON ventas_productos.id_producto = productos.id
        WHERE ventas_productos.id_venta = ?
    `;
    return connection.query(sql, [id_venta]);
}

export default {
    insertNewSale,
    insertSaleProduct,
    selectAllSales,
    selectProductsBySale
}