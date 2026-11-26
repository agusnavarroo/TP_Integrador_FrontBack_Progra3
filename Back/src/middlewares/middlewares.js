/*=====================
	Middlewares
=====================*/

// Funciones que se ejecutan entre la req y la res


const loggerUrl = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next();
}



const validateId = (req, res, next) => {
	const id = Number(req.params.id); // Pasamos a number el id del parametro

	// Si el id no es un numero entero o es <= 0
	if (!Number.isInteger(id) || id <= 0) {
		return res.status(404).json({
			message: "El id debe ser un numero entero positivo"
		})
	}

	req.id = id;
	next();
}


const validateProduct = (req, res, next) => {
	const categoriasValidas = ["Herramientas", "Fijaciones"];

	const { nombre, imagen, precio, categoria } = req.body;
	const errores = [];

	if (!nombre || !imagen || !precio || !categoria) {
		errores.push("Faltan campos requeridos");
	}

	if (typeof nombre !== "string" || nombre.trim().length < 2) {
		errores.push("El nombre debe tener al menos 2 caracteres");
	}

	if (typeof precio !== "number" || precio <= 0) {
		errores.push("El precio debe ser un numero mayor a 0");
	}

	if (!categoriasValidas.includes(categoria)) {
		errores.push("Categoria invalida");
	}

	if (errores.length > 0) {
		console.log(errores);
		return res.status(400).json({
			message: "Datos invalidos",
			listaErrores: errores
		});
	}

	next();
}

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

	next();
}

const validateSale = (req, res, next) => {
	const { nombre_usuario, fecha, precio_total, productos } = req.body;
	const errores = [];

	if (typeof nombre_usuario !== "string" || nombre_usuario.trim().length < 2) {
		errores.push("El nombre del usuario debe tener al menos 2 caracteres");
	}

	if (typeof fecha !== "string" || fecha.trim().length === 0) {
		errores.push("La fecha es obligatoria");
	}

	if (typeof precio_total !== "number" || precio_total <= 0) {
		errores.push("El precio total debe ser un numero mayor a 0");
	}

	if (!Array.isArray(productos) || productos.length === 0) {
		errores.push("La venta debe tener al menos un producto");

	} else {
		productos.forEach(producto => {
			if (!Number.isInteger(producto.id_producto) || producto.id_producto <= 0) {
				errores.push("Hay un producto con id invalido");
			}

			if (!Number.isInteger(producto.cantidad) || producto.cantidad <= 0) {
				errores.push("Hay un producto con cantidad invalida");
			}
		});
	}

	if (errores.length > 0) {
		console.log(errores);
		return res.status(400).json({
			message: "Datos invalidos",
			listaErrores: errores
		});
	}

	next();
}

export {
    loggerUrl,
    validateId,
    validateProduct,
    validateSale,
	requireLogin
}