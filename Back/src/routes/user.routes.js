/*=======================
	Rutas de usuario
=======================*/
import { Router } from "express";
import { createUserAdmin } from "../controllers/user.controllers.js";

const router = Router();

///////////////////
// POST user -> Crear usuario admin
router.post("/", createUserAdmin);



export default router;