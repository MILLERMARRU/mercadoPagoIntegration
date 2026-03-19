// ══ Página principal: listado de producto + carrito ───────────────────────────
import { Cart } from "@/app/components/Cart";
import { PRODUCT } from "@/lib/product";

export default function HomePage() {
  return (
    <section className="grid gap-12 py-8 md:grid-cols-2 md:items-start">
      {/* ── Imagen del producto ── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PRODUCT.picture_url}
          alt={PRODUCT.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Detalle del producto ── */}
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-sky-500">
            Electrónica
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {PRODUCT.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {PRODUCT.description}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
            ${PRODUCT.unit_price.toFixed(2)}
          </span>
          <span className="text-sm text-zinc-500">USD</span>
        </div>

        {/* Badges de beneficios */}
        <ul className="flex flex-wrap gap-2 text-sm">
          {["Hasta 6 cuotas", "Envío gratis", "Garantía 1 año"].map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
            >
              {badge}
            </li>
          ))}
        </ul>

        {/* ID de producto */}
        <p className="text-xs text-zinc-400">
          Código de producto: <span className="font-mono">{PRODUCT.id}</span>
        </p>

        {/* Componente cliente: carrito + checkout */}
        <Cart product={PRODUCT} />
      </div>
    </section>
  );
}
