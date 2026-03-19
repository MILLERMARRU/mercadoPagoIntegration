// ══ Backend: Crea la preferencia de pago en MercadoPago ──────────────────────
import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

import { mercadopago } from "@/lib/mercadopago";
import { PRODUCT } from "@/lib/product";

export async function POST() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const externalReference = process.env.MP_EXTERNAL_REFERENCE;

  if (!appUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_APP_URL no está configurado" },
      { status: 500 }
    );
  }

  // Crear la preferencia con todos los requisitos del desafío
  const preference = await new Preference(mercadopago).create({
    body: {
      // ── Datos del producto ──────────────────────────────────────────────────
      items: [
        {
          id: PRODUCT.id,
          title: PRODUCT.title,
          description: PRODUCT.description,
          picture_url: PRODUCT.picture_url,
          quantity: PRODUCT.quantity,
          unit_price: PRODUCT.unit_price,
          category_id: PRODUCT.category_id,
        },
      ],

      // ── Métodos de pago ─────────────────────────────────────────────────────
      // Máximo 6 cuotas con tarjetas de crédito
      // Excluir pagos con tarjeta Visa
      payment_methods: {
        installments: 6,
        excluded_payment_methods: [{ id: "visa" }],
      },

      // ── URLs de retorno ─────────────────────────────────────────────────────
      back_urls: {
        success: `${appUrl}/success`,
        failure: `${appUrl}/failure`,
        pending: `${appUrl}/pending`,
      },
      auto_return: "approved",

      // ── Referencia externa (email del vendedor) ─────────────────────────────
      external_reference: externalReference,

      // ── URL de notificaciones Webhook ───────────────────────────────────────
      notification_url: `${appUrl}/api/webhook`,
    },
  });

  return NextResponse.json({
    preferenceId: preference.id,
    initPoint: preference.init_point,
  });
}
