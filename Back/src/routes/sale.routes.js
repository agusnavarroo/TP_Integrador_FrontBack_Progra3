/*=======================
	Rutas de venta
=======================*/
import { Router } from "express";
import { createSale, getAllSales } from "../controllers/sale.controllers.js";
import { validateSale, requireLogin } from "../middlewares/middlewares.js";

const router = Router();

///////////////////
// GET sales -> Listar ventas con sus productos (solo admin)
router.get("/", requireLogin, getAllSales);

///////////////////
// POST sale -> Registrar venta
router.post("/", validateSale, createSale);



export default router;