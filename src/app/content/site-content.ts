/**
 * Conteúdo editável da landing page da Clima Cold.
 *
 * ATENÇÃO: todo valor entre colchetes `[ ]` ou marcado com `placeholder: true`
 * é PROVISÓRIO e deve ser substituído por informação real e autorizada antes
 * da publicação. Não publique métricas, depoimentos ou nomes fictícios.
 * Consulte PLACEHOLDERS.md na raiz do projeto.
 */

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

export interface ServiceItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  /** Complemento da mensagem do WhatsApp: "...gostaria de conversar sobre {context}." */
  readonly context: string;
}

export interface ValueItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface ResultItem {
  readonly value: string;
  readonly label: string;
}

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  /** Caminho em `public/images/equipe/` (ex.: '/images/equipe/nome.webp'). `null` exibe o placeholder. */
  readonly photo: string | null;
  readonly photoAlt: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
}

export const COMPANY = {
  name: 'Clima Cold',
  legalName: '[RAZÃO SOCIAL DA CLIMA COLD]',
  description:
    'Soluções inteligentes em climatização para simplificar desafios e garantir o conforto do seu ambiente.',
  /** PROVISÓRIO — formato internacional, somente dígitos (país + DDD + número). */
  phone: '5581999999999',
  phoneLabel: '[(00) 00000-0000]',
  email: 'contato@exemplo.com.br',
  location: '[CIDADE E REGIÃO ATENDIDA]',
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/',
} as const;

export const WHATSAPP = {
  defaultMessage: 'Olá! Conheci a Clima Cold pelo site e gostaria de saber mais sobre os serviços.',
  contextMessage: (context: string) =>
    `Olá! Conheci a Clima Cold pelo site e gostaria de conversar sobre ${context}.`,
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'depoimentos', label: 'Depoimentos' },
];

export interface VideoSource {
  readonly src: string;
  readonly type: 'video/webm' | 'video/mp4';
}

export interface HeroVideo {
  /** Arquivos em `public/videos/`. Lista vazia exibe o fundo provisório animado. */
  readonly sources: readonly VideoSource[];
  /** Quadro exibido antes do carregamento e com movimento reduzido (ex.: '/images/hero-poster.webp'). */
  readonly poster: string | null;
}

export const HERO = {
  /**
   * Vídeo de fundo do hero (sem áudio, em loop). Exemplo:
   * sources: [
   *   { src: '/videos/hero.webm', type: 'video/webm' },
   *   { src: '/videos/hero.mp4', type: 'video/mp4' },
   * ],
   * poster: '/images/hero-poster.webp',
   */
  video: { sources: [], poster: null } as HeroVideo,
  eyebrow: 'Parceria que gera valor',
  title: 'O próximo passo do seu conforto começa aqui.',
  description: COMPANY.description,
  primaryCta: 'Fale com nossa equipe',
  secondaryCta: 'Conheça nossos serviços',
  trustNote: 'Atendimento direto com a nossa equipe pelo WhatsApp.',
  chips: [
    { icon: 'ph-snowflake', label: 'Instalação' },
    { icon: 'ph-wrench', label: 'Manutenção' },
    { icon: 'ph-shield-check', label: 'Suporte' },
  ],
} as const;

/** Palavras do letreiro animado abaixo do hero (provisório). */
export const MARQUEE: readonly string[] = [
  'Instalação',
  'Manutenção preventiva',
  'Manutenção corretiva',
  'Higienização',
  'Projetos sob medida',
  'Residencial',
  'Comercial',
  'Corporativo',
];

/** PROVISÓRIO — adaptar aos serviços reais da Clima Cold. */
export const SERVICES: readonly ServiceItem[] = [
  {
    icon: 'ph-snowflake',
    title: 'Instalação de climatização',
    description:
      'Dimensionamento e instalação de sistemas de ar-condicionado com acabamento limpo e foco em eficiência.',
    tag: 'Residencial e comercial',
    context: 'instalação de ar-condicionado',
  },
  {
    icon: 'ph-wrench',
    title: 'Manutenção preventiva e corretiva',
    description:
      'Rotinas de cuidado, limpeza e reparo para manter seus equipamentos funcionando com segurança e economia.',
    tag: 'Planos recorrentes',
    context: 'manutenção de ar-condicionado',
  },
  {
    icon: 'ph-sliders-horizontal',
    title: 'Soluções personalizadas',
    description:
      'Projetos sob medida para ambientes com necessidades específicas de conforto térmico e qualidade do ar.',
    tag: 'Projetos sob medida',
    context: 'um projeto personalizado de climatização',
  },
];

export const ABOUT = {
  title: 'Conforto térmico com compromisso de verdade.',
  /** Foto institucional em `public/images/` (ex.: '/images/sobre.webp'). `null` exibe o placeholder. */
  image: { src: null, alt: '[Descrição da foto institucional]' } as {
    readonly src: string | null;
    readonly alt: string;
  },
  badge: { icon: 'ph-seal-check', label: 'Desde [ANO]' },
  /** PROVISÓRIO — substituir pela história real da empresa. */
  paragraphs: [
    '[Conte aqui a história da Clima Cold: quando e como a empresa começou, quem são os fundadores e o que motivou a criação do negócio.]',
    '[Descreva o propósito da empresa e como ela se diferencia no atendimento aos clientes da região.]',
  ],
  values: [
    {
      icon: 'ph-handshake',
      title: 'Compromisso',
      description: 'Prazos claros, comunicação transparente e respeito ao seu espaço.',
    },
    {
      icon: 'ph-lightbulb',
      title: 'Inovação',
      description: 'Soluções atualizadas para mais eficiência e menor consumo.',
    },
    {
      icon: 'ph-users-three',
      title: 'Proximidade',
      description: 'Atendimento humano, do primeiro contato ao pós-serviço.',
    },
  ] satisfies readonly ValueItem[],
} as const;

/** PROVISÓRIO — substituir por dados verificáveis. NÃO inventar métricas. */
export const RESULTS: readonly ResultItem[] = [
  { value: '[000+]', label: 'Clientes atendidos' },
  { value: '[00+]', label: 'Projetos realizados' },
  { value: '[00 anos]', label: 'De experiência' },
];

/** PROVISÓRIO — obter autorização para publicar nomes e fotos. */
export const TEAM: readonly TeamMember[] = [
  { name: '[Nome do profissional]', role: '[Cargo / especialidade]', photo: null, photoAlt: '' },
  { name: '[Nome do profissional]', role: '[Cargo / especialidade]', photo: null, photoAlt: '' },
  { name: '[Nome do profissional]', role: '[Cargo / especialidade]', photo: null, photoAlt: '' },
];

/** PROVISÓRIO — usar apenas depoimentos reais e autorizados. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      '[Espaço reservado para um depoimento real e autorizado de cliente sobre a experiência com a Clima Cold.]',
    author: '[Nome do cliente]',
    company: '[Empresa / segmento]',
  },
  {
    quote:
      '[Espaço reservado para um segundo depoimento real e autorizado, de preferência de um segmento diferente.]',
    author: '[Nome do cliente]',
    company: '[Empresa / segmento]',
  },
];

export const FINAL_CTA = {
  eyebrow: 'Vamos conversar',
  title: 'Vamos tirar suas ideias do papel?',
  description: 'Conte o que você precisa e receba o atendimento da nossa equipe pelo WhatsApp.',
  button: 'Chamar no WhatsApp',
  context: 'um orçamento para o meu ambiente',
} as const;
