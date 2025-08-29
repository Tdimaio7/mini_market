import express from "express";
import cors from "cors";
import productsRouter from "./products.router.js";
import connectDB from "./db.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to DB:", err);
});
