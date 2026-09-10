export const GYM_WHATSAPP = "5492262664679";

export interface SocioData {
  full_name: string;
  email: string;
  phone: string;
  dni: string;
}

export interface PlanInfo {
  name: string;
  price: string;
  priceNum: number;
}

/** Datos del socio, para que quien renueva todos los meses no vuelva a cargarlos. */
const SOCIO_KEY = "oxigeno_socio";
/** Contexto del pago en curso: sobrevive al salto a Mercado Pago y vuelve con el usuario. */
const PENDING_KEY = "oxigeno_pago_pendiente";

export interface PendingPayment extends SocioData {
  plan: string;
  plan_price: number;
  member_id?: string;
  is_renewal: boolean;
  ts: number;
}

const safeParse = <T,>(raw: string | null): T | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const loadSocio = (): SocioData | null =>
  safeParse<SocioData>(localStorage.getItem(SOCIO_KEY));

export const saveSocio = (data: SocioData) => {
  try {
    localStorage.setItem(SOCIO_KEY, JSON.stringify(data));
  } catch {
    /* modo privado o storage lleno: seguir sin recordar */
  }
};

export const clearSocio = () => localStorage.removeItem(SOCIO_KEY);

export const savePending = (p: PendingPayment) => {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(p));
  } catch {
    /* si no se puede guardar, la pantalla de retorno cae al modo sin datos */
  }
};

export const loadPending = (): PendingPayment | null => {
  const p = safeParse<PendingPayment>(localStorage.getItem(PENDING_KEY));
  if (!p) return null;
  // Un pago viejo no debería reclamar una vuelta de Mercado Pago de hoy
  if (Date.now() - p.ts > 6 * 60 * 60 * 1000) {
    localStorage.removeItem(PENDING_KEY);
    return null;
  }
  return p;
};

export const clearPending = () => localStorage.removeItem(PENDING_KEY);

export const isClase = (planName: string) =>
  planName.toUpperCase().startsWith("CLASE");

export const planUnit = (planName: string) => (isClase(planName) ? "clase" : "mes");

/* ---------- Validación ---------- */

export const validateSocio = (d: SocioData, requireAll: boolean) => {
  const errors: Partial<Record<keyof SocioData, string>> = {};

  if (!d.full_name.trim()) errors.full_name = "Necesitamos tu nombre y apellido";
  else if (d.full_name.trim().length < 3) errors.full_name = "Escribí nombre y apellido";

  const dni = d.dni.replace(/\D/g, "");
  if (!dni) errors.dni = "Necesitamos tu DNI";
  else if (dni.length < 7 || dni.length > 8) errors.dni = "El DNI tiene 7 u 8 números";

  if (requireAll) {
    if (!d.email.trim()) errors.email = "Necesitamos tu email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
      errors.email = "Revisá el email, parece incompleto";

    const phone = d.phone.replace(/\D/g, "");
    if (phone && (phone.length < 8 || phone.length > 15))
      errors.phone = "Revisá el teléfono";
  }

  return errors;
};

/* ---------- Mensaje de alta para el gimnasio ---------- */

const fmtMoney = (n: number) => "$" + n.toLocaleString("es-AR");

/**
 * Mensaje que el socio le manda al gimnasio después de pagar.
 * Trae todo lo necesario para darlo de alta en el sistema de membresías del gym.
 */
export const buildWhatsAppMessage = (
  p: PendingPayment,
  paymentId?: string | null,
) => {
  const hoy = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const lines = [
    p.is_renewal
      ? "*RENOVACIÓN — Oxígeno Gym*"
      : "*ALTA DE SOCIO — Oxígeno Gym*",
    "",
    `Nombre: ${p.full_name}`,
    `DNI: ${p.dni}`,
  ];

  if (!p.is_renewal) {
    lines.push(`Email: ${p.email}`);
    lines.push(`Teléfono: ${p.phone || "—"}`);
  }

  lines.push(
    "",
    `Plan: ${p.plan}`,
    `Importe: ${fmtMoney(p.plan_price)} por ${planUnit(p.plan)}`,
    `Fecha de pago: ${hoy}`,
    "Medio: Mercado Pago",
  );

  if (paymentId) lines.push(`N° de operación: ${paymentId}`);
  if (p.member_id) lines.push(`Referencia: ${p.member_id}`);

  lines.push("", "Pago confirmado. ¿Me confirman el alta?");

  return lines.join("\n");
};

export const whatsAppLink = (message: string) =>
  `https://wa.me/${GYM_WHATSAPP}?text=${encodeURIComponent(message)}`;
