import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaModificar, vistaProductos } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.get("/principal", requireLogin, vistaProductos);
router.get("/consultar", requireLogin, vistaConsultar);
router.get("/crear", requireLogin, vistaCrear);
router.get("/modificar", requireLogin, vistaModificar);
router.get("/eliminar", requireLogin, vistaEliminar);

export default router;