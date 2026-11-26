/*==========================
	Modelos de usuario
==========================*/

import connection from "../database/db.js";


const selectAdminUser = (email) => {

    const sql = "SELECT id, nombre, email, password, es_admin FROM usuarios WHERE email = ?";
    return connection.query(sql, [email]);
}

const createAdminUser = (nombre, email, password) => {
    
    const sql = "INSERT INTO usuarios (nombre, email, password, es_admin) VALUES (?, ?, ?, TRUE)";
    return connection.query(sql, [nombre, email, password]);
}

export default {
    selectAdminUser,
    createAdminUser
}