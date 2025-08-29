import Image from "next/image";
import { Product } from "@shared/types";
import styles from "@styles/products.module.css";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className={styles.cardName}>{product.name}</div>
      <div className={styles.cardPrice}>${product.price.toFixed(2)}</div>
      <span className={`${styles.cardBadge} ${product.isAvailable ? styles.inStock : styles.outStock}`}>
        {product.isAvailable ? "En stock" : "Sin stock"}
      </span>
    </div>
  );
}
