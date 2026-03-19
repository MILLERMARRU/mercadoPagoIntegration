// ══ Página de pago pendiente ───────────────────────────────────────────────────
import Link from "next/link";

export default function PendingPage({
  searchParams,
}: {
  searchParams: { payment_id?: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-4xl dark:bg-yellow-900">
        ⏳
      </div>

      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Pago pendiente
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Tu pago está siendo procesado. Te notificaremos cuando se confirme.
        </p>
      </div>

      {searchParams.payment_id && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">ID de pago</p>
          <p className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {searchParams.payment_id}
          </p>
        </div>
      )}

      <Link
        href="/"
        className="rounded-full bg-sky-500 px-8 py-3 font-semibold text-white transition hover:bg-sky-600"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
