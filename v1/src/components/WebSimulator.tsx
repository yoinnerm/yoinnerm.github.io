import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  CheckCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { ALICAR_PRODUCTS, CHAT_ROLES, ALICAR_STORE_INFO } from '../data/alicarData';
import { sendChatMessage } from '../services/api';
import { Message } from '../types/chat';

interface Props {
  onGoToInstall: () => void;
}

export const WebSimulator: React.FC<Props> = ({ onGoToInstall }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartAlert, setCartAlert] = useState<string | null>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [widgetMessages, setWidgetMessages] = useState<Message[]>([
    {
      id: 'w-1',
      role: 'assistant',
      content: '¡Hola! 🐱 Soy Alicat, tu aliado repostero en **Alicar Tienda** 💗. ¿Buscas algún molde, boquilla, kit o tienes dudas sobre envíos en Venezuela?',
      timestamp: new Date(),
    },
  ]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const defaultRole = CHAT_ROLES[0];

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [widgetMessages, isBotThinking]);

  const handleAddToCart = (productName: string) => {
    setCartCount((c) => c + 1);
    setCartAlert(`¡Agregado "${productName}" al carrito! 🛒`);
    setTimeout(() => setCartAlert(null), 2500);
  };

  const handleSendWidgetMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isBotThinking) return;

    const userMsg: Message = {
      id: `w-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setWidgetMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsBotThinking(true);

    try {
      const assistantId = `w-asst-${Date.now()}`;
      setWidgetMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isStreaming: true,
        },
      ]);

      let accumulated = '';
      const reply = await sendChatMessage({
        messages: [...widgetMessages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        systemInstruction: defaultRole.systemInstruction,
        model: 'gemini-3.8-flash',
        onChunk: (chunk) => {
          accumulated += chunk;
          setWidgetMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: accumulated } : m
            )
          );
        },
      });

      setWidgetMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: reply || accumulated, isStreaming: false } : m
        )
      );
    } catch (err: any) {
      setWidgetMessages((prev) => [
        ...prev,
        {
          id: `w-err-${Date.now()}`,
          role: 'assistant',
          content: `Miau... Ocurrió un detalle técnico: ${err.message || 'error de conexión'}. 😿`,
          timestamp: new Date(),
          error: true,
        },
      ]);
    } finally {
      setIsBotThinking(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
      {/* Simulator Browser Top Chrome */}
      <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 shrink-0 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="bg-slate-900/90 text-slate-300 px-3 py-1 rounded-md flex items-center gap-2 font-mono text-[11px] border border-slate-700 max-w-sm truncate">
            <span className="text-emerald-400">🔒 https://</span>
            <span className="text-white font-medium">yoinnerm.github.io</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-slate-400 text-[11px]">
            Simulador en tiempo real con widget flotante
          </span>
          <a
            href="https://yoinnerm.github.io/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-pink-600 hover:bg-pink-700 text-white px-2.5 py-1 rounded-md text-xs font-medium transition"
          >
            <span>Abrir web original</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Cart Toast Notification */}
      {cartAlert && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{cartAlert}</span>
        </div>
      )}

      {/* Website Content Viewport (Scrollable) */}
      <div className="relative flex-1 overflow-y-auto bg-[#faf8fb] text-[#2c2030] font-sans">
        {/* Topbar of yoinnerm.github.io */}
        <div className="bg-[#60318b] text-white text-[11px] sm:text-xs py-1.5 px-4 flex justify-between items-center tracking-wide">
          <span>🚚 Envíos a todo Venezuela | Tu aliado en la repostería 💗</span>
          <span className="hidden sm:inline">♙ Iniciar sesión | ♡ Registrarse</span>
        </div>

        {/* Header */}
        <header className="bg-white border-b border-[#f0e6f3] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-2xl font-black text-[#582173] tracking-tight">
            <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-2xl">🐱</span>
            <span>Alicar</span>
            <span className="text-[10px] tracking-widest text-pink-500 font-bold bg-pink-50 px-1.5 py-0.5 rounded ml-0.5">
              TIENDA
            </span>
          </div>

          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos, cursos, kits..."
                className="w-full bg-[#fbf5fc] border border-[#ecdcf0] rounded-full py-1.5 pl-4 pr-10 text-xs focus:outline-none focus:border-pink-400"
              />
              <button className="absolute right-3 top-2 text-[#7f638a]">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#5e4966]">
            <span className="hidden sm:flex items-center gap-1 cursor-pointer hover:text-pink-600">
              <Heart className="w-4 h-4 text-pink-400" />
              Favoritos
            </span>
            <div className="flex items-center gap-1.5 bg-pink-50 px-3 py-1.5 rounded-full text-pink-700 font-semibold border border-pink-200">
              <ShoppingBag className="w-4 h-4" />
              <span>Mi carrito</span>
              <span className="bg-pink-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {cartCount}
              </span>
            </div>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="bg-white px-4 sm:px-8 py-2 border-b border-[#f0e6f3] flex items-center gap-4 text-xs font-semibold text-[#5e4966] overflow-x-auto whitespace-nowrap scrollbar-none">
          <a href="#inicio" className="text-pink-600">⌂ Inicio</a>
          <a href="#productos" className="hover:text-pink-600">Tortas Alicar</a>
          <a href="#categorias" className="hover:text-pink-600">Insumos</a>
          <a href="#categorias" className="hover:text-pink-600">Herramientas</a>
          <a href="#categorias" className="hover:text-pink-600">Packaging</a>
          <a href="#kits" className="hover:text-pink-600">Kits</a>
          <a href="#cursos" className="hover:text-pink-600">Cursos</a>
          <a href="#emprende" className="hover:text-pink-600">Emprende con Alicar</a>
          <a href="#contacto" className="hover:text-pink-600">Contacto</a>
        </nav>

        {/* Hero Section */}
        <section className="px-4 sm:px-8 py-8 bg-gradient-to-r from-[#ffeef6] via-[#fff5fa] to-[#fbf2ff] border-b border-[#f4e4f5]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-pink-500 font-serif italic text-lg sm:text-xl">Todo para hacer,</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#471a5e] leading-tight my-1">
                aprender y<br />emprender
              </h1>
              <p className="text-pink-500 font-serif italic text-lg sm:text-xl mb-3">en repostería</p>
              <p className="text-xs sm:text-sm text-[#66536e] leading-relaxed mb-5 max-w-md">
                Insumos, herramientas, kits, cursos y más... para que tus ideas dulces se hagan realidad con envíos a toda Venezuela.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#productos"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-5 py-2 rounded-full font-bold text-xs shadow-md shadow-pink-200 transition"
                >
                  🛒 Ver productos
                </a>
                <button
                  onClick={() => {
                    setIsWidgetOpen(true);
                    handleSendWidgetMessage('¡Hola Alicat! Quiero emprender en repostería, ¿qué kits tienen?');
                  }}
                  className="bg-white border-2 border-pink-400 text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-full font-bold text-xs transition flex items-center gap-1.5"
                >
                  <span>💬 Preguntarle a Alicat</span>
                </button>
              </div>
            </div>

            {/* Mascot Illustration with speech bubble */}
            <div className="relative flex justify-center items-center py-4">
              <div className="relative">
                <div className="absolute -top-10 -right-4 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-pink-200 text-xs text-[#552766] font-semibold text-center z-10 animate-pulse">
                  ¡Hola!<br />Soy Alicat 🐱<br />¿qué vamos a<br />hornear hoy? 💗
                </div>
                <div className="text-[110px] sm:text-[130px] leading-none select-none filter drop-shadow-md">
                  🐱
                </div>
                <div className="absolute bottom-0 right-2 text-5xl">
                  🎂
                </div>
              </div>
            </div>
          </div>

          {/* Quicklinks */}
          <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-pink-200/60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center text-xs font-medium">
            <a href="#productos" className="bg-white/80 hover:bg-white p-2 rounded-xl border border-pink-100 text-[#5a2c6d]">
              🎂 Quiero hacer tortas
            </a>
            <a href="#kits" className="bg-white/80 hover:bg-white p-2 rounded-xl border border-pink-100 text-[#5a2c6d]">
              🧁 Quiero emprender
            </a>
            <a href="#categorias" className="bg-white/80 hover:bg-white p-2 rounded-xl border border-pink-100 text-[#5a2c6d]">
              🥄 Quiero decorar
            </a>
            <a href="#categorias" className="bg-white/80 hover:bg-white p-2 rounded-xl border border-pink-100 text-[#5a2c6d]">
              📦 Necesito packaging
            </a>
            <a href="#cursos" className="bg-white/80 hover:bg-white p-2 rounded-xl border border-pink-100 text-[#5a2c6d]">
              🎓 Quiero aprender
            </a>
          </div>
        </section>

        {/* Categorías Principales */}
        <section id="categorias" className="px-4 sm:px-8 py-8 max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-[#4c1d65] mb-4 flex items-center gap-1.5">
            <span>❣</span> Categorías principales
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 text-center">
            {[
              { icon: '🥣', label: 'Insumos repostería' },
              { icon: '🫙', label: 'Decoración & colores' },
              { icon: '🧁', label: 'Boquillas & mangas' },
              { icon: '🖌️', label: 'Herramientas' },
              { icon: '⭐', label: 'Moldes & cortadores' },
              { icon: '📦', label: 'Packaging & cajas' },
              { icon: '🎁', label: 'Kits completos' },
              { icon: '🎓', label: 'Cursos' },
            ].map((cat, i) => (
              <div
                key={i}
                onClick={() => {
                  setIsWidgetOpen(true);
                  handleSendWidgetMessage(`¿Qué productos tienen disponibles en la categoría de "${cat.label}"?`);
                }}
                className="bg-white p-2.5 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 transition cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  {cat.icon}
                </div>
                <p className="text-[11px] font-medium text-[#493152] mt-2 leading-tight">
                  {cat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Productos Destacados */}
        <section id="productos" className="px-4 sm:px-8 py-8 bg-[#fffbfe] border-y border-pink-100">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#4c1d65] flex items-center gap-1.5">
                <span>❣</span> Productos destacados
              </h2>
              <span className="text-xs text-pink-600 font-semibold cursor-pointer">Ver todos →</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {ALICAR_PRODUCTS.slice(0, 5).map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl p-3 border border-pink-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="h-24 bg-pink-50/70 rounded-xl flex items-center justify-center text-4xl mb-2">
                      {prod.icon}
                    </div>
                    <h3 className="font-bold text-xs text-[#35203d] line-clamp-2">
                      {prod.name}
                    </h3>
                    <div className="text-[11px] text-amber-500 my-1">
                      ★★★★★ <span className="text-gray-400">({prod.reviews})</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-black text-pink-600 my-1.5">
                      $ {prod.price.toFixed(2).replace('.', ',')}
                    </div>
                    <button
                      onClick={() => handleAddToCart(prod.name)}
                      className="w-full bg-[#fceef6] hover:bg-pink-500 hover:text-white text-pink-700 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      🛒 Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-8 py-8 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-3 rounded-xl border border-pink-100 flex items-start gap-2.5">
            <span className="text-2xl">🛡️</span>
            <div>
              <strong className="block text-[#43185c] font-bold">Pagos seguros</strong>
              Cashea, Pago Móvil, transferencia y más.
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-pink-100 flex items-start gap-2.5">
            <span className="text-2xl">🚚</span>
            <div>
              <strong className="block text-[#43185c] font-bold">Envíos a todo el país</strong>
              Recibe tus pedidos donde estés en Venezuela.
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-pink-100 flex items-start gap-2.5">
            <span className="text-2xl">🎧</span>
            <div>
              <strong className="block text-[#43185c] font-bold">Atención personalizada</strong>
              Chatbot con IA y asesores en todo momento.
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-pink-100 flex items-start gap-2.5">
            <span className="text-2xl">📈</span>
            <div>
              <strong className="block text-[#43185c] font-bold">Emprende con Alicar</strong>
              Kits de inicio, cursos y asesoría para tu negocio.
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#482069] text-white px-4 sm:px-8 py-8 text-xs">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xl font-bold flex items-center gap-1.5">
                <span>🐱</span> Alicar <span className="text-pink-300 text-xs">TIENDA</span>
              </div>
              <p className="text-pink-100/70 text-[11px] mt-2">
                Todo para hacer, aprender y emprender en repostería.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Enlaces rápidos</h4>
              <p className="text-pink-100/70 leading-relaxed text-[11px]">
                Inicio &bull; Tienda &bull; Cursos &bull; Emprende &bull; Contacto
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Métodos de pago</h4>
              <p className="text-pink-100/70 leading-relaxed text-[11px]">
                Pago Móvil &bull; Cashea &bull; Binance / USDT &bull; Transferencias
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Web Oficial</h4>
              <p className="text-pink-100/70 text-[11px]">
                yoinnerm.github.io
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ======================================================== */}
      {/* FLOATING ALICAT CHATBOT WIDGET OVER THE SIMULATED STORE */}
      {/* ======================================================== */}
      <div className="absolute bottom-5 right-5 z-40 flex flex-col items-end">
        {/* Chat Widget Window (When Open) */}
        {isWidgetOpen && (
          <div
            className={`bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden mb-3 flex flex-col transition-all duration-200 ${
              isWidgetExpanded
                ? 'w-[90vw] sm:w-[460px] h-[520px]'
                : 'w-[88vw] sm:w-[350px] h-[430px]'
            }`}
          >
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-4 py-3 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xl">
                  🐱
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    Alicat AI
                    <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded font-normal">
                      Alicar Tienda
                    </span>
                  </h3>
                  <p className="text-[10px] text-pink-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    En línea &bull; Asistente repostero
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white/80">
                <button
                  onClick={() => setIsWidgetExpanded(!isWidgetExpanded)}
                  className="p-1 hover:text-white rounded transition"
                  title={isWidgetExpanded ? 'Reducir' : 'Expandir'}
                >
                  {isWidgetExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsWidgetOpen(false)}
                  className="p-1 hover:text-white rounded transition"
                  title="Cerrar widget"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Widget Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-50/70 text-xs">
              {widgetMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      🐱
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3 py-2 rounded-2xl leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-pink-600 text-white rounded-br-none'
                        : 'bg-white border border-pink-100 text-gray-800 shadow-sm rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isBotThinking && (
                <div className="flex items-center gap-2 text-pink-600 text-[11px] bg-white p-2 rounded-xl w-fit border border-pink-100">
                  <span>🐱</span>
                  <span>Alicat está escribiendo...</span>
                </div>
              )}
              <div ref={chatScrollRef} />
            </div>

            {/* Widget Quick Question Chips */}
            <div className="px-3 py-1.5 bg-white border-t border-pink-50 flex gap-1 overflow-x-auto scrollbar-none text-[11px]">
              <button
                onClick={() => handleSendWidgetMessage('¿Qué precio tiene el kit de decoración y qué incluye?')}
                className="shrink-0 bg-pink-50 hover:bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full border border-pink-200 transition"
              >
                🧁 Kit decoración
              </button>
              <button
                onClick={() => handleSendWidgetMessage('¿Cómo puedo pagar con Cashea o Pago Móvil?')}
                className="shrink-0 bg-pink-50 hover:bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full border border-pink-200 transition"
              >
                💳 Medios de pago
              </button>
              <button
                onClick={() => handleSendWidgetMessage('¿Tienen envíos por MRW y Zoom a todo el país?')}
                className="shrink-0 bg-pink-50 hover:bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full border border-pink-200 transition"
              >
                🚚 Envíos Venezuela
              </button>
            </div>

            {/* Widget Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendWidgetMessage();
              }}
              className="p-2.5 bg-white border-t border-pink-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Pregunta a Alicat..."
                className="flex-1 bg-slate-50 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-pink-400 text-gray-800"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isBotThinking}
                className="w-8 h-8 rounded-xl bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white cursor-pointer"
        >
          <div className="relative">
            <span className="text-2xl">🐱</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <span className="font-bold text-xs pr-1 flex items-center gap-1">
            <span>¡Pregúntale a Alicat!</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          </span>
        </button>
      </div>
    </div>
  );
};
