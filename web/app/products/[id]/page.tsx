import Image from "next/image";
import { fetchProductById } from "@lib/api";
import { Product } from "@shared/types";

type ProductDetailProps = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  let product: Product | null = null;

  try {
    product = await fetchProductById(params.id);
  } catch (error) {
    console.error("Producto no encontrado", error);
    return (
      <div className="container text-center">
        <h2 className="text-xl font-bold">Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Imagen del producto */}
        <div className="cardImage">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Información */}
        <h1 className="cardName" style={{ fontSize: "20px" }}>
          {product.name}
        </h1>
        <p className="cardPrice">${product.price.toFixed(2)}</p>

        {/* Badge de stock */}
        <span
          className={`cardBadge ${product.isAvailable ? "inStock" : "outStock"}`}
        >
          {product.isAvailable ? "En stock" : "Sin stock"}
        </span>

        {/* Categoría */}
        <p style={{ marginTop: "12px", color: "#374151" }}>
          Categoría:{" "}
          <span style={{ fontWeight: "600", textTransform: "capitalize" }}>
            {product.category}
          </span>
        </p>

        {/* Botón */}
        <button className="topButton" style={{ marginTop: "20px" }}>
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
}

