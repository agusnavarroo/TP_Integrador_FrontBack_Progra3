/*=======================
	Rutas de producto
=======================*/

import { Router } from "express";
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getActiveProducts, getAllProducts, getProductById, modifyProduct, removeProduct, changeProductStatus } from "../controllers/product.controllers.js";

const router = Router();

router.get("/active", getActiveProducts);
router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validateProduct, createProduct);
router.put("/", validateProduct, modifyProduct);
router.delete("/:id", validateId, removeProduct);
router.put("/:id/status", validateId, changeProductStatus);

export default router;