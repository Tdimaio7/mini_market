import { Product } from "@shared/types";

export function getTopCheapestAvailable(products: Product[], top = 3): Product[] {
  return products
    .filter(product => product.isAvailable)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
}
