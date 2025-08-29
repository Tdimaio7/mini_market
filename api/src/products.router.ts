import { Router } from "express";
import Product  from "./models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  const { search, sort, order, available, page = "1", limit = "10" } = req.query;

  const query: any = {};
  if (search) query.name = { $regex: search, $options: "i" };
  if (available === "true") query.isAvailable = true;
  if (available === "false") query.isAvailable = false;

  let productsQuery = Product.find(query);

  if (sort) {
    const sortObj: any = {};
    sortObj[sort as string] = order === "desc" ? -1 : 1;
    productsQuery = productsQuery.sort(sortObj);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  productsQuery = productsQuery.skip((pageNumber - 1) * limitNumber).limit(limitNumber);

  const products = await productsQuery.exec();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

export default router;
