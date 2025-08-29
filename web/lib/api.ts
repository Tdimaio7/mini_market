import { Product } from "../../shared/types.js"; 

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export async function fetchProducts(query: string = ""): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/products${query}`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}
