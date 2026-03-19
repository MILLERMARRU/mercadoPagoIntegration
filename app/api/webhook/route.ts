// ══ Backend: Webhook para recibir notificaciones de MercadoPago ───────────────
import { Payment } from "mercadopago";

import { mercadopago } from "@/lib/mercadopago";

// Tipo de notificación que envía MercadoPago vía HTTP POST
interface WebhookNotification {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
}

export async function POST(request: Request) {
  const body: WebhookNotification = await request.json();

  console.log("[Webhook] Notificación recibida:", {
    action: body.action,
    type: body.type,
    dataId: body.data?.id,
  });

  // Solo procesamos eventos de pago
  if (body.type !== "payment") {
    return new Response(null, { status: 200 });
  }

  // Obtenemos los detalles del pago desde MercadoPago
  const payment = await new Payment(mercadopago).get({ id: body.data.id });

  console.log("[Webhook] Pago procesado:", {
    id: payment.id,
    status: payment.status,
    status_detail: payment.status_detail,
    external_reference: payment.external_reference,
    amount: payment.transaction_amount,
  });

  // Lógica según el estado del pago
  switch (payment.status) {
    case "approved":
      console.log("[Webhook] ✅ Pago aprobado - ID:", payment.id);
      // TODO: aquí puedes activar la orden, enviar email, etc.
      break;
    case "pending":
      console.log("[Webhook] ⏳ Pago pendiente - ID:", payment.id);
      break;
    case "rejected":
      console.log("[Webhook] ❌ Pago rechazado - ID:", payment.id);
      break;
    default:
      console.log("[Webhook] Estado desconocido:", payment.status);
  }

  // Respondemos 200 para confirmar que recibimos la notificación
  return new Response(null, { status: 200 });
}
