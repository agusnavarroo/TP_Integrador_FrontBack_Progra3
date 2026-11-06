/*==========================
	Modelos de producto
==========================*/
import connection from "../database/db.js";

/////////////////////////////
// Traer productos activos
const selectActiveProducts = () => {
    const sql = "SELECT id, nombre, precio, imagen FROM productos WHERE productos.activo = TRUE";
    return connection.query(sql);
}



/////////////////////////////
// Traer todos los productos
const selectAllProducts = () => {
    // Optimizacion 2: Solo devolvemos los campos necesarios, no todo
    const sql = "SELECT id, nombre, precio, imagen FROM productos";
    return connection.query(sql);
};



///////////////////////////
// Traer producto por id
const selectProductById = (id) => {
    // Optimizacion 3: Solo devolvemos los campos necesarios, no todo
    // Gracias a los ? (placeholders) nuestra consulta SQL es mas segura porque evitamos consultas vulnerables
    const sql = "SELECT id, nombre, precio, imagen, categoria, activo FROM productos WHERE productos.id = ?";
    return connection.query(sql, [id]);
}



///////////////////////////
// Crear nuevo producto
const insertNewProduct = (nombre, imagen, categoria, precio) => {

    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)"
    return connection.query(sql, [nombre, imagen, categoria, precio]);
}



///////////////////////////
// Actualizar producto
const updateProduct = (nombre, imagen, precio, categoria, activo, id) => {
    const sql = "UPDATE productos SET nombre = ?, imagen = ?, precio = ?, categoria = ?, activo = ? WHERE id = ?";

    return connection.query(sql, [nombre, imagen, precio, categoria, activo, id]);
}



///////////////////////////
// Eliminar producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    return connection.query(sql, [id]);
}



export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct,
    selectActiveProducts
}