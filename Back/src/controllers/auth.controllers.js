/*===============================
	Controladores de autenticacion
===============================*/
import UserModels from "../models/user.models.js";
import bcrypt from "bcrypt";

///////////////////
// Vista login
export const vistaLogin = (req, res) => {
    res.render("login", {
        title: "Login Admin",
        about: "Introduzca sus credenciales"
    });
}

//////////////////////////
// Login usuario admin
export const loginUserAdmin = async (req, res) => {
    try {
        // Recibimos email y password del formulario login.ejs gracias a express.urlencoded
        const { email, password } = req.body;

        // Evitamos una consulta innecesaria a la BBDD
        if (!email || !password) {
            return res.render("login", {
                title: "Login Admin",
                about: "Introduzca sus credenciales",
                error: "Todos los campos son obligatorios"
            });
        }

        // Traemos solamente el usuario que tenga ese email
        const [rows] = await UserModels.selectAdminUser(email);

        // Si no existe el usuario
        if (rows.length === 0) {
            return res.render("login", {
                title: "Login Admin",
                about: "Introduzca sus credenciales",
                error: "Credenciales invalidas"
            });
        }

        const user = rows[0];

        // Comparamos el password escrito con el hash guardado en la BBDD
        const match = await bcrypt.compare(password, user.password);

        // Si el password no coincide
        if (!match) {
            return res.render("login", {
                title: "Login Admin",
                about: "Introduzca sus credenciales",
                error: "Credenciales invalidas"
            });
        }

        // Si coincide, guardamos el usuario en la sesion
        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        }

        // Guardada la sesion, redirigimos al dashboard
        return res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            message: "Error interno del servidor al hacer login"
        });
    }
}

//////////////////////////
// Logout admin
export const logoutUserAdmin = (req, res) => {

    // Destruimos la sesion existente
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion: ", err);
            return res.status(500).json({
                message: "Error al destruir la sesion"
            });
        }

        // Eliminada la sesion, redirigimos a login
        res.redirect("/login");
    });
}