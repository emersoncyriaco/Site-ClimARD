// =========================================================
// CLIMA RD: todo o conteúdo do site fica aqui.
// Itens marcados com ⚠️ precisam ser confirmados com o cliente.
// =========================================================

export const business = {
  name: "Clima RD",
  whatsapp: "5500000000000", // ⚠️ 55 + DDD + número
  phoneDisplay: "(00) 00000-0000", // ⚠️
  region: "Sua cidade e região", // ⚠️ ex.: "Campinas e região"
  hours: "Seg a Sáb · 8h às 18h", // ⚠️
  instagram: "#", // ⚠️ link do Instagram
  technician: "Jamerson Freitas", // ⚠️
  workingDays: [1, 2, 3, 4, 5, 6], // dias que aparecem no agendamento (0 = domingo)
  periods: ["Manhã · 8h às 12h", "Tarde · 13h às 18h"],
  credit: { label: "Site por Emerson Cyriaco", href: "#" },
};

// Fotos e vídeos ficam em public/media/. Enquanto o arquivo não existir,
// o site mostra um placeholder com o nome do arquivo esperado.
export const media = {
  logo: "/media/logo-web.png",
  heroVideo: "/media/hero.mp4", // vídeo de fundo do topo (curto, sem som, até ~5 MB)
  technician: "/media/tecnico.jpg", // foto do técnico trabalhando (vertical)
  tools: "/media/ferramentas.jpg", // foto das ferramentas / medição (vertical ou quadrada)
  before: "/media/antes.jpg", // aparelho sujo
  after: "/media/depois.jpg", // mesmo aparelho limpo (mesmo enquadramento!)
  gallery: [
    { type: "video", src: "/media/trabalho-1.mp4", poster: "/media/trabalho-1.jpg", caption: "Higienização completa" },
    { type: "image", src: "/media/trabalho-2.jpg", caption: "Medição do capacitor" },
    { type: "video", src: "/media/trabalho-3.mp4", poster: "/media/trabalho-3.jpg", caption: "Limpeza da condensadora" },
    { type: "image", src: "/media/trabalho-4.jpg", caption: "Evaporadora limpa" },
    { type: "video", src: "/media/trabalho-5.mp4", poster: "/media/trabalho-5.jpg", caption: "Carga de gás" },
    { type: "image", src: "/media/trabalho-6.jpg", caption: "Serviço finalizado" },
  ],
};

export const brands = ["Samsung", "LG", "Midea", "Gree", "Elgin", "Daikin", "Fujitsu", "Springer", "Consul", "Philco", "Electrolux", "Carrier"];

export const services = [
  {
    id: "conserto",
    icon: "ac-repair",
    title: "Conserto e reparo",
    desc: "Não gela, não liga ou faz barulho? Encontramos a causa e resolvemos.",
    includes: ["Diagnóstico completo", "Troca de capacitor, sensor ou placa", "Teste final de funcionamento"],
  },
  {
    id: "manutencao",
    icon: "shield-check",
    title: "Manutenção preventiva",
    desc: "Revisão completa que evita quebras e mantém a conta de luz baixa.",
    includes: ["Limpeza dos filtros", "Verificação elétrica", "Medição de pressão e temperatura"],
  },
  {
    id: "higienizacao",
    icon: "ac-clean",
    title: "Higienização completa",
    desc: "Limpeza profunda que elimina fungos, bactérias e mau cheiro.",
    includes: ["Evaporadora e condensadora", "Bactericida e antifúngico", "Desobstrução do dreno"],
  },
  {
    id: "gas",
    icon: "gauge",
    title: "Ajustes e carga de gás",
    desc: "Pressão medida, vazamento encontrado e gás na quantidade certa.",
    includes: ["Teste de vazamento", "Carga de gás na medida", "Ajuste de funcionamento"],
  },
];

// Sintomas: clicar leva ao agendamento já preenchido
export const problems = [
  { icon: "thermo", title: "Não está gelando", hint: "Pode ser gás, capacitor ou filtro sujo.", service: "conserto" },
  { icon: "ac-drip", title: "Pingando água", hint: "Dreno entupido ou instalação desnivelada.", service: "conserto" },
  { icon: "ac-noise", title: "Barulho estranho", hint: "Peça solta, ventilador ou compressor.", service: "conserto" },
  { icon: "odor", title: "Cheiro ruim", hint: "Fungos e bactérias acumulados.", service: "higienizacao" },
  { icon: "power", title: "Liga e desliga sozinho", hint: "Sensor, placa ou capacitor com defeito.", service: "conserto" },
  { icon: "bill", title: "Conta de luz alta", hint: "Aparelho sujo trabalha dobrado.", service: "manutencao" },
];

// Equipamentos de diagnóstico
export const tools = [
  { icon: "capacitor", name: "Medição de capacitor", desc: "Mostra se a peça está fraca antes que ela danifique o compressor." },
  { icon: "gauge", name: "Pressão do gás", desc: "Manifold digital: recarga só quando é necessário, na quantidade certa." },
  { icon: "clamp", name: "Corrente elétrica", desc: "Alicate amperímetro confere o consumo real e a saúde do compressor." },
  { icon: "probe", name: "Temperatura de saída", desc: "Comprova, com números, que o ar voltou a gelar como deve." },
];

export const steps = [
  { title: "Agende pelo site", text: "Escolha o serviço, o dia e o período. Leva menos de 1 minuto." },
  { title: "Confirme no WhatsApp", text: "A mensagem já vai pronta. É só tocar em enviar e o técnico confirma." },
  { title: "Receba o técnico", text: "Diagnóstico, serviço e teste final no horário combinado." },
];

export const faq = [
  { q: "Quanto custa a visita?", a: "Depende do serviço. Você recebe o orçamento antes de qualquer reparo, sem compromisso." }, // ⚠️
  { q: "Quais regiões vocês atendem?", a: `Atendemos ${business.region}. Se tiver dúvida sobre o seu bairro, chame no WhatsApp.` },
  { q: "De quanto em quanto tempo devo fazer manutenção?", a: "Em uso residencial, o ideal é a cada 6 meses. Em comércio ou uso intenso, a cada 3 meses." },
  { q: "O serviço tem garantia?", a: "Sim. Todos os serviços têm garantia, e os detalhes são informados no orçamento." }, // ⚠️
  { q: "Atendem quais marcas?", a: `Todas as marcas: ${brands.slice(0, 8).join(", ")} e outras.` },
  { q: "Como funciona o agendamento pelo site?", a: "Você escolhe o serviço, o aparelho, o dia e o período. O site monta a mensagem e abre o WhatsApp para você confirmar com o técnico." },
];

// Opções do agendamento
export const booking = {
  services: [...services.map((s) => ({ id: s.id, label: s.title })), { id: "diagnostico", label: "Não sei, quero um diagnóstico" }],
  problems: ["Não gela", "Pingando água", "Barulho", "Cheiro ruim", "Liga e desliga", "Não liga", "Conta de luz alta", "Outro"],
  types: ["Split Hi-Wall", "Janela", "Piso-teto", "Cassete", "Portátil", "Outro"],
  btus: ["9.000", "12.000", "18.000", "24.000", "30.000+", "Não sei"],
};

// Depoimentos: use só avaliações REAIS (ex.: Google). A seção fica oculta enquanto a lista estiver vazia.
// Formato: { name: "Maria S.", place: "Centro", text: "...", stars: 5 }
export const testimonials = [];
