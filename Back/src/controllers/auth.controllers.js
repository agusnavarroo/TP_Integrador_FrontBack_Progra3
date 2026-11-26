/*===============================
	Controladores de autenticacion
===============================*/

import UserModels from "../models/user.models.js";
import bcrypt from "bcrypt";

export const vistaLogin = (req, res) => {
    res.render("login", {
        title: "Login Admin",
        about: "Introduzca sus credenciales"
    });
}

export const loginUserAdmin = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login Admin",
                about: "Introduzca sus credenciales",
                error: "Todos los campos son obligatorios"
            });
        }

        const [rows] = await UserModels.selectAdminUser(email);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login Admin",
                about: "Introduzca sus credenciales",
                error: "Credenciales invalidas"
            });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
    
        if (!match) {
            return res.render("login", {
                title: "Login Admin",
                about: "Introduzca sus credenciales",
                error: "Credenciales invalidas"
            });
        }

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        }

        return res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            message: "Error interno del servidor al hacer login"
        });
    }
}


export const logoutUserAdmin = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion: ", err);
            return res.status(500).json({
                message: "Error al destruir la sesion"
            });
        }
        
        res.redirect("/login");
    });
}