/*=====================
	Importaciones
=====================*/
import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/config/environments.js";
import { loggerUrl } from "./src/middlewares/middlewares.js";
import { productRoutes, viewRoutes, authRoutes, userRoutes, saleRoutes } from "./src/routes/index.js";
import { __dirname, join } from "./src/utils/index.js";

const { port, sessionKey } = environments;
const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "src/public")));

app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false
}));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/dashboard", viewRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});