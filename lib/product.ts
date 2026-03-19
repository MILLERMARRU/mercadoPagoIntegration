// ══ Definición del producto de la tienda ─────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  unit_price: number;
  quantity: number;
  category_id: string;
}

// Producto único de la tienda
export const PRODUCT: Product = {
  id: "1234",
  title: "Smartphone Pro X",
  description: "Dispositivo de tienda móvil de comercio electrónico",
  picture_url:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
  unit_price: 100,
  quantity: 1,
  category_id: "electronics",
};
