// Este sera nuestro archivo de barril que centraliza o "arrastra" todas las rutas. Importa las rutas con un nombre y las exporta con el mismo nombre

import productRoutes from "./product.routes.js";
import authRoutes from "./auth.routes.js";
import viewRoutes from "./view.routes.js";
import userRoutes from "./user.routes.js";
import saleRoutes from "./sale.routes.js";


// Exportamos todas las rutas
export {
    productRoutes,
    viewRoutes,
    authRoutes,
    userRoutes,
    saleRoutes
}