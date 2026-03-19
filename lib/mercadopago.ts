// ══ Configuración del cliente MercadoPago (servidor) ─────────────────────────
import { MercadoPagoConfig } from "mercadopago";

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("MP_ACCESS_TOKEN no está configurado en las variables de entorno");
}

// Instancia única del cliente MercadoPago con Integrator ID
export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: {
    integratorId: "dev_24c65fb163bf11ea96500242ac130004",
  },
});
