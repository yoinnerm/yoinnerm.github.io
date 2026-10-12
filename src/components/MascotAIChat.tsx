import React, { useState, useRef, useEffect } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { ChatMessage } from '../types';
import { playMechanicalClick } from '../utils/sound';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface MascotAIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

function getClientFallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('nombre') || q.includes('quien eres') || q.includes('como te llamas')) {
    return '¡Hola! Me llamo Alicat y soy la mascota repostera de Tortas Alicar. Mi rol es exclusivamente orientarte con información sobre nuestras creaciones y servicios.';
  }
  if (q.includes('precio') || q.includes('costo') || q.includes('cuanto') || q.includes('cotiz') || q.includes('presupuesto')) {
    return 'En Tortas Alicar cada pedido se elabora a medida según la cantidad de porciones, bizcocho, relleno y diseño. Por eso no manejamos precios fijos en la página. Escríbele a Yanacari directamente por WhatsApp (+58 414 461 7554) para darte un presupuesto exacto.';
  }
  if (q.includes('donde') || q.includes('ubicac') || q.includes('direccion') || q.includes('maracay') || q.includes('santa rita')) {
    return 'Estamos ubicados en el Barrio Santa Rita en Maracay, Estado Aragua. Puedes consultar nuestra ubicación exacta en Google Maps mediante el enlace directo en la página.';
  }
  if (q.includes('curso') || q.includes('taller') || q.includes('kit') || q.includes('emprend')) {
    return 'Ofrecemos cursos prácticos de repostería con Yanacari y kits con herramientas seleccionadas para emprendedores. En la sección "Nuestra Historia & Legales" puedes pulsar "Información" para escribirnos por WhatsApp.';
  }
  if (q.includes('gelatina') || q.includes('3d') || q.includes('encapsulada')) {
    return 'Nuestras gelatinas artísticas 3D encapsuladas son flores inyectadas a mano sobre una cúpula translúcida con base cremosa. ¡Son un centro de mesa dulce espectacular!';
  }
  if (q.includes('pasapalo') || q.includes('tequeño') || q.includes('salado') || q.includes('catering')) {
    return 'Preparamos tequeños de hojaldre crujientes con queso blanco, mini tartaletas de crema pastelera y fruta, mini alfajores y brownies melcochudos.';
  }
  if (q.includes('sabor') || q.includes('torta') || q.includes('pastel') || q.includes('relleno')) {
    return 'Elaboramos bizcochos de vainilla tradicional, chocolate húmedo, marmoleada, selva negra y tres leches, con rellenos caseros de ganache, arequipe o crema diplomática.';
  }
  if (q.includes('horario') || q.includes('hora') || q.includes('contacto')) {
    return 'Atendemos con gusto en dos horarios: de 9:00 a 13:00 (mañanas) y de 14:00 a 20:00 (tardes). Puedes escribirnos al WhatsApp +58 414 461 7554.';
  }
  return '¡Hola! Soy Alicat. Estoy aquí para orientarte sobre las creaciones de Tortas Alicar, cursos en Santa Rita y cómo comunicarte con Yanacari por WhatsApp (+58 414 461 7554). ¿Tienes alguna duda sobre nuestras tortas, gelatinas o pasapalos?';
}

export const MascotAIChat: React.FC<MascotAIChatProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'mascot',
      text: '¡Hola! Me llamo Alicat y soy la mascota repostera de Tortas Alicar. Estoy aquí para guiarte por el muestrario, responder dudas sobre nuestras tortas, pasapalos o cursos en Santa Rita, Maracay. ¿En qué te puedo orientar?',
      timestamp: 'Ahora',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '¿Cómo encargo un pastel?',
    '¿Qué son las gelatinas 3D?',
    '¿Dónde están ubicados?',
    '¿Tienen cursos de repostería?',
    '¿Qué sabores preparan?',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    playMechanicalClick('click');
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'mascot',
          text: data.reply || getClientFallbackAnswer(query),
          timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Fallback to local');
      }
    } catch {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mascot',
        text: getClientFallbackAnswer(query),
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Alicat Badge in bottom-right corner next to WhatsApp */}
      <div className="fixed bottom-6 right-24 z-40">
        <button
          onClick={() => {
            playMechanicalClick('pop');
            onToggle();
          }}
          className={`relative flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full shadow-xl transition-all transform hover:scale-105 cursor-pointer border ${
            isOpen
              ? 'bg-[#2A1F1B] text-white border-white/20'
              : 'bg-white text-[#2A1F1B] border-[#F2DECE] hover:border-[#C35C1D]'
          }`}
          title="Abrir chat con Alicat"
          aria-label="Abrir chat con Alicat"
        >
          <div className="shrink-0 bg-[#FFF3EA] rounded-full p-0.5 border border-[#F5DECF]">
            <MascotAvatar size={36} animate={false} />
          </div>
          <span className="hidden sm:inline text-xs font-semibold pr-1">
            {isOpen ? 'Cerrar Alicat' : 'Preguntar a Alicat'}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E66E22] animate-pulse"></span>
        </button>
      </div>

      {/* Alicat Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[390px] max-h-[560px] h-[520px] bg-[#FFFDFB] rounded-3xl shadow-2xl border-2 border-[#EADAD0] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#FFF4EA] to-[#FAF2EB] border-b border-[#EBDCD0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="shrink-0 bg-white p-1 rounded-2xl shadow-xs border border-[#F5E2D3]">
                <MascotAvatar size={38} animate={false} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-[#2A1F1B]">
                    Alicat
                  </h4>
                  <span className="text-[10px] bg-[#E8F8EE] text-[#1E7841] font-semibold px-1.5 py-0.2 rounded-full">
                    Guía Informativa
                  </span>
                </div>
                <p className="text-[11px] text-[#786153]">
                  Mascota de Tortas Alicar
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playMechanicalClick('pop');
                onToggle();
              }}
              className="p-1.5 rounded-full text-[#7A6153] hover:bg-[#F2E5DB] transition-colors cursor-pointer"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'mascot' && (
                  <div className="shrink-0 mt-1">
                    <MascotAvatar size={26} animate={false} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C35C1D] text-white rounded-tr-none'
                      : 'bg-white text-[#382821] border border-[#ECD9CC] shadow-2xs rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-[#8E786C]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#7A6153] bg-white p-2.5 rounded-2xl border border-[#ECD9CC] w-fit">
                <span className="w-2 h-2 rounded-full bg-[#C35C1D] animate-ping"></span>
                <span>Alicat está respondiendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2.5 bg-white border-t border-[#F2E4D8] overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#7E4624] bg-[#FFF2E7] hover:bg-[#FEE5D2] border border-[#F6D7C2] transition-colors cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#F0E2D6] space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntale a Alicat..."
                className="flex-1 px-3.5 py-2.5 rounded-full border border-[#DFCEBF] bg-[#FAF8F5] text-xs sm:text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-full bg-[#C35C1D] text-white flex items-center justify-center hover:bg-[#A94B12] transition-colors cursor-pointer shrink-0 disabled:opacity-40"
                aria-label="Enviar pregunta"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-[#7A6153] pt-1">
              <span>¿Cotización directa?</span>
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20vengo%20del%20chat%20con%20Alicat%20y%20quisiera%20pedir%20presupuesto.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('click')}
                className="inline-flex items-center gap-1 font-semibold text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp (+58 414 461 7554)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
