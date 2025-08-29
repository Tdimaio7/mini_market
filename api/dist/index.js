import express from "express";
import cors from "cors";
import productsRouter from "./products.router.js"; // 👈 ojo: extensión .js al importar entre archivos TS en ESM
const app = express();
app.use(cors());
app.use(express.json());
// Rutas de tu API
app.use("/api/products", productsRouter);
// ✅ Ruta raíz para probar que el servidor funciona
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});
const PORT = 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
