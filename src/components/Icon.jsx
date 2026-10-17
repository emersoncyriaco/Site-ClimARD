/*
  Set de ícones próprio da Climard, em estilo duotone:
  camada de fundo translúcida + detalhes sólidos.
  - Ícones do ramo (ar-condicionado, ferramentas) usam grade 32×32.
  - Ícones de interface usam grade 24×24.
*/
const B = { fill: "currentColor", stroke: "none", opacity: 0.22 }; // camada de fundo
const F = { fill: "currentColor", stroke: "none" }; // preenchimento sólido

// Aparelho split (base de vários ícones)
const Split = () => (
  <>
    <rect x="3" y="5" width="26" height="12" rx="3.5" {...B} />
    <rect x="3" y="5" width="26" height="12" rx="3.5" />
    <path d="M8 13.5h16" />
    <circle cx="24.5" cy="9" r="1.2" {...F} />
  </>
);

const domain = {
  // Conserto: split + chave de boca
  "ac-repair": (
    <>
      <Split />
      <circle cx="22" cy="23.4" r="3.6" {...B} />
      <path d="M21.4 19.7A3.6 3.6 0 1 0 25.5 24" strokeWidth="2.6" />
      <path d="M19.5 25.9 13.5 31" strokeWidth="2.8" />
    </>
  ),
  // Higienização: split + brilho
  "ac-clean": (
    <>
      <Split />
      <path d="M15 20.5c.5 2.6 1.9 4 4.5 4.5-2.6.5-4 1.9-4.5 4.5-.5-2.6-1.9-4-4.5-4.5 2.6-.5 4-1.9 4.5-4.5Z" {...F} />
      <path d="M23.5 20.2c.2 1 .8 1.6 1.8 1.8-1 .2-1.6.8-1.8 1.8-.2-1-.8-1.6-1.8-1.8 1-.2 1.6-.8 1.8-1.8Z" {...F} opacity="0.6" />
    </>
  ),
  // Pingando água: split + gotas
  "ac-drip": (
    <>
      <Split />
      <path d="M12 20.3s-2.6 3.1-2.6 4.8a2.6 2.6 0 0 0 5.2 0c0-1.7-2.6-4.8-2.6-4.8Z" {...F} />
      <path d="M20 22.8s-1.9 2.3-1.9 3.5a1.9 1.9 0 0 0 3.8 0c0-1.2-1.9-3.5-1.9-3.5Z" {...F} opacity="0.55" />
    </>
  ),
  // Barulho: split + onda de vibração
  "ac-noise": (
    <>
      <Split />
      <path d="M6 25.5c1.6-2.6 2.9-2.6 4.5 0s2.9 2.6 4.5 0 2.9-2.6 4.5 0 2.9 2.6 4.5 0" strokeWidth="2.2" />
      <path d="M27 22.5v6" opacity="0.5" />
    </>
  ),
  // Não gela: termômetro com mercúrio alto
  thermo: (
    <>
      <path d="M12.5 7.5a3.5 3.5 0 0 1 7 0v12.1a6 6 0 1 1-7 0Z" {...B} />
      <path d="M12.5 7.5a3.5 3.5 0 0 1 7 0v12.1a6 6 0 1 1-7 0Z" />
      <circle cx="16" cy="24.5" r="2.8" {...F} />
      <path d="M16 22V9" strokeWidth="2.6" />
      <path d="M23 9h3M23 13h3M23 17h2" opacity="0.6" />
    </>
  ),
  // Cheiro ruim: odor subindo
  odor: (
    <>
      <ellipse cx="16" cy="27" rx="11" ry="3" {...B} />
      <path d="M10 24c-2.2-3 2.2-4.8 0-8s2.2-5 0-8" />
      <path d="M16 24c-2.2-3 2.2-4.8 0-8s2.2-5 0-8" strokeWidth="2.4" />
      <path d="M22 24c-2.2-3 2.2-4.8 0-8s2.2-5 0-8" opacity="0.55" />
    </>
  ),
  // Liga e desliga
  power: (
    <>
      <circle cx="16" cy="17" r="12" {...B} />
      <path d="M10.6 10.3a8.5 8.5 0 1 0 10.8 0" strokeWidth="2.4" />
      <path d="M16 6v10" strokeWidth="2.6" />
    </>
  ),
  // Conta de luz alta: recibo + raio
  bill: (
    <>
      <path d="M7 4h18v24l-3-2-3 2-3-2-3 2-3-2-3 2Z" {...B} />
      <path d="M7 4h18v24l-3-2-3 2-3-2-3 2-3-2-3 2Z" />
      <path d="M11 9.5h10M11 13.5h6" opacity="0.6" />
      <path d="M18.6 15.5 14.8 21h3l-1.2 4.5 4.2-5.6h-3Z" {...F} />
    </>
  ),
  // Garantia / manutenção: escudo
  "shield-check": (
    <>
      <path d="M16 3.5 26 7v7.7c0 6.5-4.3 11.4-10 13.8C10.3 26.1 6 21.2 6 14.7V7Z" {...B} />
      <path d="M16 3.5 26 7v7.7c0 6.5-4.3 11.4-10 13.8C10.3 26.1 6 21.2 6 14.7V7Z" />
      <path d="m11.5 15.8 3.2 3.2 6-6.4" strokeWidth="2.6" />
    </>
  ),
  // Manifold: manômetro com mangueira
  gauge: (
    <>
      <circle cx="16" cy="14" r="10" {...B} />
      <circle cx="16" cy="14" r="10" />
      <path d="M9.5 14h1.8M20.7 14h1.8M16 7.5v1.8M11.4 9.4l1.3 1.3M20.6 9.4l-1.3 1.3" opacity="0.6" />
      <path d="m16 14 4.6-4.4" strokeWidth="2.4" />
      <circle cx="16" cy="14" r="2" {...F} />
      <path d="M16 24v3.5M11.5 28.5h9" strokeWidth="2.2" />
    </>
  ),
  // Capacitor
  capacitor: (
    <>
      <rect x="9" y="8" width="14" height="20" rx="3.5" {...B} />
      <rect x="9" y="8" width="14" height="20" rx="3.5" />
      <path d="M9 13h14" />
      <path d="M13 8V3.5M19 8V3.5" strokeWidth="2.4" />
      <path d="M16 17v6M13 20h6" strokeWidth="2.2" />
    </>
  ),
  // Alicate amperímetro
  clamp: (
    <>
      <path d="M11 14.5a6.2 6.2 0 1 1 10 0" strokeWidth="2.4" />
      <rect x="9.5" y="14" width="13" height="15" rx="3" {...B} />
      <rect x="9.5" y="14" width="13" height="15" rx="3" />
      <rect x="12.5" y="17" width="7" height="4.2" rx="1" {...F} opacity="0.65" />
      <circle cx="16" cy="25" r="1.7" {...F} />
    </>
  ),
  // Termômetro de sonda (temperatura de saída)
  probe: (
    <>
      <rect x="4" y="4" width="14" height="19" rx="3.5" {...B} />
      <rect x="4" y="4" width="14" height="19" rx="3.5" />
      <rect x="7" y="7.5" width="8" height="5" rx="1.2" {...F} opacity="0.65" />
      <circle cx="11" cy="18" r="1.8" {...F} />
      <path d="M18 18.5 27.5 28" strokeWidth="2.4" />
      <circle cx="27.6" cy="28.1" r="1.5" {...F} />
    </>
  ),
  // Casa climatizada (receber o técnico)
  "home-cool": (
    <>
      <path d="M4.5 14.5 16 5l11.5 9.5V27a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 27Z" {...B} />
      <path d="M4.5 14.5 16 5l11.5 9.5V27a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 27Z" />
      <path d="M16 15v9M12.1 17.3l7.8 4.4M19.9 17.3l-7.8 4.4" strokeWidth="2.2" />
    </>
  ),
};

const ui = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3.5" {...B} />
      <path d="M3 8.5A3.5 3.5 0 0 1 6.5 5h11A3.5 3.5 0 0 1 21 8.5V10H3Z" {...F} />
      <rect x="3" y="5" width="18" height="16" rx="3.5" />
      <path d="M8 3v3.5M16 3v3.5" strokeWidth="2.2" />
      <rect x="7" y="13" width="3" height="3" rx="0.8" {...F} />
      <rect x="11" y="13" width="3" height="3" rx="0.8" {...F} opacity="0.45" />
      <rect x="15" y="13" width="3" height="3" rx="0.8" {...F} opacity="0.45" />
    </>
  ),
  // Símbolo oficial do WhatsApp
  whatsapp: (
    <path
      {...F}
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42"
    />
  ),
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" {...B} />
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.3" {...F} />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" {...B} />
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.5V12l3.8 2.3" strokeWidth="2.2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7.5-6.3 7.5-12.3a7.5 7.5 0 0 0-15 0C4.5 15.7 12 22 12 22Z" {...B} />
      <path d="M12 22s7.5-6.3 7.5-12.3a7.5 7.5 0 0 0-15 0C4.5 15.7 12 22 12 22Z" />
      <circle cx="12" cy="9.7" r="2.8" {...F} />
    </>
  ),
  check: <path d="m4.5 12.5 4.8 4.8L19.5 7" strokeWidth="2.6" />,
  arrow: <path d="M4 12h15.5M13.5 6l6 6-6 6" strokeWidth="2.2" />,
  back: <path d="M20 12H4.5M10.5 6l-6 6 6 6" strokeWidth="2.2" />,
  plus: <path d="M12 5v14M5 12h14" strokeWidth="2.4" />,
  minus: <path d="M5 12h14" strokeWidth="2.4" />,
  drag: <path d="M9 6.5 3.5 12 9 17.5M15 6.5l5.5 5.5-5.5 5.5" strokeWidth="2.4" />,
  play: <path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l12-7.2a1 1 0 0 0 0-1.72l-12-7.2A1 1 0 0 0 7 4.8Z" {...F} />,
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" {...B} />
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="9" cy="9" r="2" {...F} />
      <path d="m21 15.5-4.3-4.3a1.5 1.5 0 0 0-2.1 0L5 20.8" />
    </>
  ),
  star: <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9Z" {...F} />,
};

// Nomes antigos continuam funcionando
const aliases = { chat: "whatsapp", shield: "shield-check" };

export default function Icon({ name, size = 20, stroke, className = "" }) {
  const key = aliases[name] ?? name;
  const isDomain = key in domain;
  const body = isDomain ? domain[key] : ui[key];
  // ícones do ramo têm mais detalhe: um pouco maiores na mesma caixa
  const px = isDomain ? Math.round(size * 1.35) : size;

  return (
    <svg
      className={`icon ${className}`}
      width={px}
      height={px}
      viewBox={isDomain ? "0 0 32 32" : "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke ?? (isDomain ? 2 : 1.9)}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {body}
    </svg>
  );
}
