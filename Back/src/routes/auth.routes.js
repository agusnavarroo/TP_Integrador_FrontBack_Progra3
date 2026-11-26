/*============================
	Rutas de autenticacion
============================*/
import { Router } from "express";
import { loginUserAdmin, logoutUserAdmin, vistaLogin } from "../controllers/auth.controllers.js";

const router = Router();

///////////////////////
// Redirigimos a login desde la ruta raiz "/"
router.get("/", (req, res) => {
    res.redirect("/login");
});



///////////////////////
// Vista del login
router.get("/login", vistaLogin);



//////////////////////////
// Funcionalidad login
router.post("/login", loginUserAdmin);



//////////////////////////
// Funcionalidad logout
router.post("/logout", logoutUserAdmin);



export default router;