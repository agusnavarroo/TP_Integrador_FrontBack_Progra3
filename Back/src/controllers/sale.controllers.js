/*===========================
	Controladores de venta
===========================*/
import SaleModels from "../models/sale.models.js";

export const createSale = async (req, res) => {

    try {
        const { nombre_usuario, fecha, precio_total, productos } = req.body;

        const [result] = await SaleModels.insertNewSale(nombre_usuario, fecha, precio_total);
        const idVenta = result.insertId;

        for (const producto of productos) {
            await SaleModels.insertSaleProduct(idVenta, producto.id_producto, producto.cantidad);
        }

        res.status(201).json({
            message: "Venta registrada con exito",
            saleId: idVenta
        });

    } catch (error) {
        console.log("Error registrando venta: ", error);

        res.status(500).json({
            message: "Error interno del servidor al registrar la venta"
        });
    }
}

export const getAllSales = async (req, res) => {
    try {
        const [ventas] = await SaleModels.selectAllSales();

        if (ventas.length === 0) {
            return res.status(404).json({
                message: "No se encontraron ventas"
            });
        }

        for (const venta of ventas) {
            const [productos] = await SaleModels.selectProductsBySale(venta.id);
            venta.productos = productos;
        }

        res.status(200).json({
            payload: ventas
        });

    } catch (error) {
        console.log("Error obteniendo ventas: ", error);

        res.status(500).json({
            message: "Error interno del servidor al obtener las ventas"
        });
    }
}