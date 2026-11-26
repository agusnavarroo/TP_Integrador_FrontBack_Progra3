/*===============================
	Controladores de usuario
===============================*/
import UserModels from "../models/user.models.js";
import bcrypt from "bcrypt";

///////////////////
// Crear usuario admin
export const createUserAdmin = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Si falta algun campo, lo mostramos en la vista en un parrafo de error
        if (!nombre || !email || !password) {
            return res.render("post", {
                title: "Crear producto",
                error: "Todos los campos son obligatorios al crear un admin"
            });
        }

        // Rondas de sal: cantidad de veces que se aleatorizan los caracteres al hashear
        const saltRounds = 10;

        // Ciframos (hasheamos) el password recibido
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