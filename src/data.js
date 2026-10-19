// =========================================================
// CLIMA RD: todo o conteúdo do site fica aqui.
// Itens marcados com ⚠️ precisam ser confirmados com o cliente.
// =========================================================

export const business = {
  name: "Clima RD",
  whatsapp: "5581983188776", // 55 + DDD + número
  phoneDisplay: "(81) 98318-8776",
  region: "Olinda",
  hours: "Segunda a sábado, das 8h30 às 12h e das 14h às 17h", // ⚠️ dias da semana a confirmar
  instagram: { handle: "@_climard", href: "https://www.instagram.com/_climard/" },
  technician: "Jamerson Freitas", // ⚠️
  workingDays: [1, 2, 3, 4, 5, 6], // ⚠️ dias que aparecem no agendamento (0 = domingo)
  periods: ["Manhã · das 8h30 às 12h", "Tarde · das 14h às 17h"],
  credit: { label: "Site por Emerson Cyriaco", href: "https://portifolio-ten-teal.vercel.app/" },
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

// Serviços oferecidos no agendamento e nos dados estruturados do rodapé
export const services = [
  { id: "conserto", title: "Conserto" },
  { id: "manutencao", title: "Manutenção preventiva" },
  { id: "higienizacao", title: "Higienização completa" },
  { id: "gas", title: "Ajustes e carga de gás" },
];

// Equipamentos de diagnóstico
export const tools = [
  { icon: "capacitor", name: "Capacitor", desc: "A medição mostra se a peça está fraca antes que ela danifique o compressor." },
  { icon: "gauge", name: "Pressão do gás", desc: "Com o manifold digital, a recarga é feita somente quando necessária e na quantidade certa." },
  { icon: "clamp", name: "Corrente elétrica", desc: "O alicate amperímetro confere o consumo real e a saúde do compressor." },
  { icon: "probe", name: "Temperatura de saída", desc: "Comprova, com números, que o aparelho voltou a gelar como deve." },
];

// Marcas e agendamento já têm seções próprias: o FAQ não repete esses assuntos
export const faq = [
  { q: "Quanto custa a visita?", a: "O valor depende do serviço. Você recebe o orçamento antes de qualquer reparo, sem compromisso." }, // ⚠️
  { q: "Quais regiões vocês atendem?", a: `Atendemos ${business.region}. Em caso de dúvida sobre o seu bairro, fale conosco pelo WhatsApp.` },
  { q: "Com que frequência devo fazer a manutenção?", a: "Em uso residencial, o ideal é fazê-la a cada seis meses; em estabelecimentos comerciais ou em uso intenso, a cada três meses." },
  { q: "O serviço tem garantia?", a: "Sim. Todos os serviços têm garantia, e os detalhes são informados no orçamento." }, // ⚠️
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
