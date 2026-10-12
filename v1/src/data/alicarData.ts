import { ChatRole, ProductItem, QuickPrompt } from '../types/chat';

export const ALICAR_STORE_INFO = {
  name: 'Alicar TIENDA',
  mascot: 'Alicat 🐱',
  tagline: 'Todo para hacer, aprender y emprender en repostería',
  website: 'https://yoinnerm.github.io/',
  shipping: 'Envíos a todo el territorio nacional de Venezuela (MRW, Zoom, Tealca, Domesa)',
  payments: [
    { name: 'Cashea', desc: 'Paga en cuotas sin interés', icon: '💳' },
    { name: 'Pago Móvil', desc: 'A tasa oficial BCV', icon: '📱' },
    { name: 'Transferencia Bancaria', desc: 'Banesco, Mercantil, BDV', icon: '🏦' },
    { name: 'Binance Pay / USDT', desc: 'Cripto sin comisiones', icon: '🪙' },
    { name: 'Efectivo USD / Zelle', desc: 'Divisas según disponibilidad', icon: '💵' },
  ],
};

export const CHAT_ROLES: ChatRole[] = [
  {
    id: 'alicat_official',
    name: 'Alicat Repostero (Oficial)',
    badge: 'Mascota Oficial',
    avatar: '🐱',
    description: 'El cariñoso y dulce gato repostero de Alicar Tienda. Responde dudas de la tienda, productos, recetas y consejos prácticos con calidez.',
    recommendedModel: 'gemini-3.8-flash',
    colorScheme: {
      bg: 'bg-pink-50',
      text: 'text-pink-900',
      border: 'border-pink-200',
      accent: '#ec4899',
    },
    systemInstruction: `Eres 'Alicat 🐱', el gato repostero y asistente virtual oficial de 'Alicar TIENDA' (https://yoinnerm.github.io/).
Tu lema es: "Todo para hacer, aprender y emprender en repostería 💗".

TU PERSONALIDAD:
- Cariñoso, dulce, divertido, empático y experto repostero.
- Usas expresiones alegres y emojis temáticos (🐱, 🧁, 🎂, 💗, ✨, 🥄, 📦).
- Conoces todos los productos, kits, cursos y políticas de Alicar Tienda.
- Ayudas a los clientes a elegir los mejores insumos y herramientas según su nivel.
- Envíos: A toda Venezuela (MRW, Zoom, Tealca, Domesa).
- Pagos: Cashea, Pago Móvil (tasa BCV), Transferencia, Binance USDT, Dólares en efectivo.
- Sé claro, conciso y muy servicial.`,
  },
  {
    id: 'business_advisor',
    name: 'Asesor de Emprendimiento',
    badge: 'Negocios & Costos',
    avatar: '💼',
    description: 'Especialista en costeo de recetas, márgenes de ganancia, packaging adecuado y kits para iniciar un negocio de repostería rentable.',
    recommendedModel: 'gemini-3.8-flash',
    colorScheme: {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      border: 'border-purple-200',
      accent: '#9333ea',
    },
    systemInstruction: `Eres el Asesor Especializado en Emprendimiento de 'Alicar TIENDA' (https://yoinnerm.github.io/).
Tu misión es guiar a personas que quieren iniciar o hacer crecer su negocio de repostería en Venezuela y Latinoamérica.

ENFOQUE:
- Ayudar a calcular costos de ingredientes, mano de obra, empaque y merma.
- Recomendar los kits para emprendedores de Alicar Tienda (precios al mayor, kits iniciales).
- Aconsejar sobre presentación profesional: cajas con ventana transparente, bases rígidas de MDF, capacillos.
- Formas de pago aceptadas por Alicar: Cashea, Pago Móvil, Binance, Transferencias.
- Proporciona consejos estratégicos, números claros y estimaciones prácticas para que ganen dinero con sus creaciones dulces.`,
  },
  {
    id: 'master_chef',
    name: 'Chef Pastelero Maestro',
    badge: 'Técnico & Fórmulas',
    avatar: '👨‍🍳',
    description: 'Experto en química de repostería, resolución de problemas técnicos (bizcochos hundidos, merengues cortados, climas cálidos y humedad).',
    recommendedModel: 'gemini-3.8-flash',
    colorScheme: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      accent: '#d97706',
    },
    systemInstruction: `Eres el Chef Pastelero Maestro de 'Alicar TIENDA' (https://yoinnerm.github.io/).
Eres una enciclopedia viviente de pastelería, química culinaria y técnicas profesionales.

ÁREAS DE EXPERIENCIA:
- Estructura de bizcochos: por qué se colapsan, proporción de leudantes y temperatura de horno.
- Coberturas en climas cálidos: buttercream americano vs ruso vs suizo, ganache de chocolate, merengue italiano resistente a la humedad.
- Uso correcto de colorantes en gel (no amargar la mezcla) y polvos metalizados con alcohol comestible.
- Moldes desmontables, tiempos de enfriamiento y desmoldado limpio.
- Cuando recomiendes una técnica, sugiere también las herramientas o insumos de Alicar Tienda (moldes de 20cm, boquillas 1M/2D, colorantes en gel, mangas de repostería).`,
  },
  {
    id: 'fast_sales',
    name: 'Atención Rápida & Cotizaciones',
    badge: 'Ultra Rápido ⚡',
    avatar: '⚡',
    description: 'Respuestas directas y ultra rápidas para cotizaciones de pedidos, métodos de pago, disponibilidad y envíos.',
    recommendedModel: 'gemini-3.1-flash-lite',
    colorScheme: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      accent: '#059669',
    },
    systemInstruction: `Eres el agente de atención rápida y cotizaciones de 'Alicar TIENDA' (https://yoinnerm.github.io/).
Tu objetivo es dar respuestas instantáneas, concisas, directas y organizadas en listas con viñetas.

- Si el cliente te pide precios o productos, responde con una lista clara con nombre y precio en USD.
- Explica métodos de pago al instante (Cashea, Pago Móvil, Binance, Transferencia).
- Explica envíos en Venezuela (MRW, Zoom, Tealca, Domesa).
- Sé ágil y súper eficiente.`,
  },
];

export const ALICAR_PRODUCTS: ProductItem[] = [
  {
    id: 'kit-decoracion',
    name: 'Kit de decoración básico',
    category: 'Kits completos',
    price: 18.50,
    icon: '🧁',
    rating: 5,
    reviews: 24,
    description: 'Incluye boquillas estrella 1M y 2D, mangas reutilizables y desechables, acople doble y espátula de codo.',
    tag: 'Más vendido',
  },
  {
    id: 'set-colorantes',
    name: 'Set de colorantes en gel (8 colores)',
    category: 'Decoración y colorantes',
    price: 14.90,
    icon: '🎨',
    rating: 5,
    reviews: 18,
    description: 'Colorantes hiperconcentrados calidad comestible, no alteran el sabor ni la consistencia de tu merengue o crema.',
    tag: 'Alta pigmentación',
  },
  {
    id: 'molde-desmontable',
    name: 'Molde desmontable 20 cm',
    category: 'Moldes y cortadores',
    price: 9.80,
    icon: '🍰',
    rating: 5,
    reviews: 12,
    description: 'Molde de acero al carbono antiadherente con broche de liberación rápida. Ideal para tortas altas de 10 a 14 porciones.',
  },
  {
    id: 'caja-torta',
    name: 'Caja para torta 20 cm con ventana',
    category: 'Packaging y cajas',
    price: 2.50,
    icon: '🎁',
    rating: 5,
    reviews: 9,
    description: 'Cartón sulfatado de alto gramaje con visor transparente superior y frontal. Protege y exhibe tus tortas con elegancia.',
  },
  {
    id: 'sprinkles-variados',
    name: 'Sprinkles variados 100 g',
    category: 'Decoración y colorantes',
    price: 3.20,
    icon: '🍬',
    rating: 5,
    reviews: 15,
    description: 'Mezcla gourmet de perlas perladas, confites y fideos brillantes. Perfectos para cupcakes, donas y drip cakes.',
  },
  {
    id: 'boquillas-rusas',
    name: 'Set de Boquillas Rusas para flores (6 unid)',
    category: 'Boquillas y mangas',
    price: 11.00,
    icon: '🌸',
    rating: 5,
    reviews: 16,
    description: 'Crea flores y tulipanes tridimensionales en crema con un solo movimiento de manga.',
  },
  {
    id: 'espatula-alisador',
    name: 'Espátula de codo + Alisador de acrílico',
    category: 'Herramientas',
    price: 7.50,
    icon: '🥄',
    rating: 5,
    reviews: 11,
    description: 'Dúo indispensable para lograr bordes perfectos y rectos en tortas cubiertas con buttercream o chantilly.',
  },
  {
    id: 'curso-basico',
    name: 'Curso Online: Repostería desde Cero',
    category: 'Cursos',
    price: 25.00,
    icon: '🎓',
    rating: 5,
    reviews: 32,
    description: 'Aprende masas esponjosas, almíbares, rellenos estables y costeo para empezar a vender tortas de inmediato.',
    tag: 'Certificado',
  },
];

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: '1',
    label: '¿Qué necesito para empezar a vender?',
    prompt: '¡Hola Alicat! Quiero empezar a vender tortas y cupcakes desde mi casa. ¿Qué kit y herramientas básicas de Alicar Tienda me recomiendas para arrancar?',
    icon: '🚀',
  },
  {
    id: '2',
    label: 'Envíos y formas de pago en Venezuela',
    prompt: '¿Cómo funcionan los envíos de Alicar a otras ciudades de Venezuela y qué métodos de pago aceptan (Cashea, Pago Móvil)?',
    icon: '🚚',
  },
  {
    id: '3',
    label: '¿Por qué se baja mi bizcocho?',
    prompt: 'Ayuda Alicat, cuando saco mi bizcocho del horno se me hunde en el centro. ¿Cuáles son los errores más comunes y cómo lo soluciono?',
    icon: '🎂',
  },
  {
    id: '4',
    label: 'Armar presupuesto de pedido',
    prompt: 'Quiero armar un presupuesto para hacer una torta de 20cm con decoración en crema y colores vivos. ¿Qué productos de la tienda me recomiendas y cuál sería el total?',
    icon: '🛒',
  },
  {
    id: '5',
    label: 'Crema firme en calor venezolano',
    prompt: '¿Cuál es la mejor crema o buttercream para decorar que aguante el calor sin derretirse y qué ingredientes necesito?',
    icon: '☀️',
  },
];
