/*============================
	Rutas de autenticacion
============================*/

import { Router } from "express";
import { loginUserAdmin, logoutUserAdmin, vistaLogin } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/login", vistaLogin);
router.post("/login", loginUserAdmin);
router.post("/logout", logoutUserAdmin);

export default router;