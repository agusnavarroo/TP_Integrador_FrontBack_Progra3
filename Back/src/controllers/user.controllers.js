/*===============================
	Controladores de usuario
===============================*/
import UserModels from "../models/user.models.js";
import bcrypt from "bcrypt";

export const createUserAdmin = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.render("post", {
                title: "Crear producto",
                error: "Todos los campos son obligatorios al crear un admin"
            });
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModels.createAdminUser(nombre, email, hashedPassword);

        return res.render("post", {
            title: "Crear producto",
            exito: "Usuario admin creado exitosamente"
        });

    } catch (error) {
        console.log("Error al crear usuario admin: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear usuario admin"
        });
    }
}