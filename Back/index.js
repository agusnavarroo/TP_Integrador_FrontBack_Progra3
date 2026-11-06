/*=====================
	Importaciones
=====================*/
import express from "express"; // Importamos express
import cors from "cors"; // Importamos cors para permitir las solicitudes del front
import environments from "./src/config/environments.js"; // Variables de entorno (puerto, datos de la BBDD)
import { productRoutes } from "./src/routes/index.js"; // Rutas de producto desde el archivo barril (export con nombre, por eso las llaves)
import { loggerUrl } from "./src/middlewares/middlewares.js"; // Middleware logger (reemplaza al que estaba escrito aca adentro)

const app = express(); // Creamos una instancia de aplicacion de express en app
const PORT = environments.port;

/*=====================
	Middlewares -> Funciones que se ejecutan entre la req y la res
=====================*/
// Importante: van ANTES de las rutas, porque se ejecutan en el orden en que los escribimos
app.use(cors()); // Permite todas las solicitudes (evita el error de CORS en el front)
app.use(loggerUrl); // Muestra por consola cada solicitud (sin parentesis: le pasamos la funcion, no la ejecutamos)
app.use(express.json()); // Parsea el JSON recibido en el body y lo deja en req.body



/*=====================
	Rutas
=====================*/
app.get("/", (req, res) => {
	res.send("Hola mundo desde un servidor de Express.js");
});

// Montamos las rutas de producto con el prefijo /api/products
// Ej: router.get("/") -> GET /api/products
//     router.get("/:id") -> GET /api/products/:id
app.use("/api/products", productRoutes);



/* Vistas EJS -> mas adelante
*/



/*=====================
	Servidor
=====================*/
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});