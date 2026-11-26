import { join } from "node:path";

// Apunta a la raíz del proyecto (src/utils -> sube 2 niveles)

const __dirname = join(import.meta.dirname, "../../");

export { __dirname, join };