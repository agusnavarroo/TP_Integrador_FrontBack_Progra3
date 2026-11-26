/*=======================
	Rutas de venta
=======================*/

import { Router } from "express";
import { createSale, getAllSales } from "../controllers/sale.controllers.js";
import { validateSale, requireLogin } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", requireLogin, getAllSales);
router.post("/", validateSale, createSale);

export default router;