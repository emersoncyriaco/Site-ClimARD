import { business } from "../data";

export const waLink = (text = "") =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const defaultMessage = `Olá, ${business.name}! Vim pelo site e gostaria de um orçamento.`;

const fullDate = (d) =>
  new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" }).format(d);

// Mensagem do agendamento (negrito do WhatsApp com *)
export function buildBookingMessage(b, serviceLabel) {
  const lines = [
    `Olá, ${business.name}! Quero agendar um atendimento ❄️`,
    "",
    `*Serviço:* ${serviceLabel}`,
    b.problems.length ? `*Problema:* ${b.problems.join(", ")}` : null,
    `*Aparelho:* ${b.type} · ${b.btus === "Não sei" ? "BTUs não informado" : `${b.btus} BTUs`} · ${b.qty} ${b.qty > 1 ? "unidades" : "unidade"}`,
    `*Data:* ${fullDate(b.date)} · ${b.period}`,
    `*Nome:* ${b.name.trim()}`,
    `*Endereço/bairro:* ${b.address.trim()}`,
    b.notes.trim() ? `*Obs.:* ${b.notes.trim()}` : null,
    "",
    "_Enviado pelo site_",
  ];
  return lines.filter((l) => l !== null).join("\n");
}

// Dispara eventos de conversão se Google Analytics / Meta Pixel estiverem instalados
export function track(event, params = {}) {
  window.gtag?.("event", event, params);
  window.fbq?.("track", event === "agendamento_enviado" ? "Schedule" : "Contact", params);
  window.dataLayer?.push({ event, ...params });
}
