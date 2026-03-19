"use client";
// ══ Frontend: Carrito de compras con integración MercadoPago SDK ──────────────

import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import type { Product } from "@/lib/product";

// Inicializar MercadoPago con la public key (solo se ejecuta una vez)
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
  locale: "es-PE",
});

interface CartItem extends Product {
  cartQuantity: number;
}

interface CartProps {
  product: Product;
}

export function Cart({ product }: CartProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Agrega el producto al carrito (o incrementa cantidad)
  const addToCart = () => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
    // Resetear preferencia al modificar el carrito
    setPreferenceId(null);
    setError(null);
  };

  // Elimina el producto del carrito
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setPreferenceId(null);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.unit_price * item.cartQuantity,
    0
  );

  // Llama al backend para crear la preferencia de pago
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", { method: "POST" });

      if (!res.ok) {
        throw new Error("Error al crear la preferencia de pago");
      }

      const data: { preferenceId: string; initPoint: string } = await res.json();
      setPreferenceId(data.preferenceId);
    } catch (err) {
      setError("No se pudo iniciar el checkout. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Botón agregar al carrito */}
      <button
        onClick={addToCart}
        className="w-full rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-600 active:scale-95"
      >
        Agregar al carrito
      </button>

      {/* Carrito */}
      {cart.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Carrito de compras
          </h2>

          <ul className="flex flex-col gap-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.picture_url}
                    alt={item.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      x{item.cartQuantity} · ${item.unit_price} c/u
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-zinc-200 dark:border-zinc-700" />

          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Total
            </span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              ${total.toFixed(2)}
            </span>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          <div className="mt-4">
            {preferenceId ? (
              // SDK de MercadoPago renderiza el botón oficial de pago
              <Wallet initialization={{ preferenceId }} />
            ) : (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full rounded-full bg-[#009EE3] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#007eb4] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Cargando..." : "Pagar con MercadoPago"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
