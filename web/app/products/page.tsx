"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@lib/api";
import ProductCard from "@components/ProductCard";
import { Product } from "@shared/types";
import { getTopCheapestAvailable } from "@lib/utils";
import styles from "@styles/products.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"price" | "name">("price");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [available, setAvailable] = useState<"all" | "true" | "false">("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(100); 
  const [showTop, setShowTop] = useState(false); 

  useEffect(() => {
    const load = async () => {
      const query = new URLSearchParams({
        search,
        sort,
        order,
        available: available === "all" ? "" : available,
        page: page.toString(),
        limit: limit.toString()
      }).toString();

      const data: Product[] = await fetchProducts(`?${query}`);
      setProducts(data);
    };
    load();
  }, [search, sort, order, available, page, limit]);

  // Calcular top 3 de toda la lista de productos
  const topCheapest = getTopCheapestAvailable(products, 3);

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Controles */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <select
          aria-label="Ordenar por"
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSort(e.target.value as "price" | "name")
          }
          className="border px-2 py-1 rounded"
        >
          <option value="price">Precio</option>
          <option value="name">Nombre</option>
        </select>

        <select
          aria-label="Ordenar dirección"
          value={order}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setOrder(e.target.value as "asc" | "desc")
          }
          className="border px-2 py-1 rounded"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select
          aria-label="Filtrar disponibilidad"
          value={available}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setAvailable(e.target.value as "all" | "true" | "false")
          }
          className="border px-2 py-1 rounded"
        >
          <option value="all">Todos</option>
          <option value="true">En stock</option>
          <option value="false">Sin stock</option>
        </select>
      </div>

      {/* Botón Top 3 */}
      <button
        onClick={() => setShowTop(!showTop)}
        className={styles.topButton}
      >
        {showTop ? "Ocultar 3 productos más baratos" : "Mostrar 3 productos más baratos"}
      </button>

      {showTop && (
        <div className={styles.grid}>
          {topCheapest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Todos los productos */}
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación */}
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</button>
        <span>{page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
