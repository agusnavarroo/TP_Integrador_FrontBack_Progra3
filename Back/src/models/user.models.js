/*==========================
	Modelos de usuario
==========================*/
import connection from "../database/db.js";

/////////////////////////////
// Traer usuario admin por email
const selectAdminUser = (email) => {
    // Traemos solo los campos necesarios. El password que viene de la BBDD es el hash, no la contraseña real
    // Gracias a los ? (placeholders) evitamos consultas vulnerables
    const sql = "SELECT id, nombre, email, password, es_admin FROM usuarios WHERE email = ?";
    return connection.query(sql, [email]);
}

/////////////////////////////
// Crear usuario admin
const createAdminUser = (nombre, email, password) => {
    // El password que llega aca ya es el hash. Marcamos es_admin = TRUE porque este alta es de un admin
    const sql = "INSERT INTO usuarios (nombre, email, password, es_admin) VALUES (?, ?, ?, TRUE)";
    return connection.query(sql, [nombre, email, password]);
}

export default {
    selectAdminUser,
    createAdminUser
}