import { Router } from "express";
import products from "./data/products.json" with { type: "json" };
const router = Router();
// GET list with filters
router.get("/", (req, res) => {
    let result = products;
    const { search, sort, order = "asc", page = "1", limit = "10", available } = req.query;
    if (search) {
        result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (available) {
        result = result.filter(p => p.isAvailable === (available === "true"));
    }
    if (sort) {
        result = result.sort((a, b) => {
            const dir = order === "desc" ? -1 : 1;
            if (sort === "price")
                return (a.price - b.price) * dir;
            if (sort === "name")
                return a.name.localeCompare(b.name) * dir;
            return 0;
        });
    }
    const start = (parseInt(page) - 1) * parseInt(limit);
    result = result.slice(start, start + parseInt(limit));
    res.json(result);
});
// GET by id
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product)
        return res.status(404).json({ message: "Not found" });
    res.json(product);
});
export default router;
