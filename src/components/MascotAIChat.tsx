import React, { useState, useRef, useEffect } from 'react';
import { MascotAvatar, MascotPose } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { ChatMessage } from '../types';
import { playMechanicalClick } from '../utils/sound';
import { getMascotAnswer } from '../utils/mascotKnowledge';
import { MessageCircle, X, Send, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';

interface MascotAIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MascotAIChat: React.FC<MascotAIChatProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'mascot',
      text: '¡Hola! Soy la mascota de Tortas Alicar. Mi función es guiarte e informarte sobre nuestra historia familiar en Santa Rita (Maracay), nuestros servicios, tortas, gelatinas 3D y cursos. ¿En qué te puedo orientar hoy?',
      timestamp: 'Ahora',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPose, setCurrentPose] = useState<MascotPose>('greeting');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '¿Cómo encargo un pastel?',
    '¿Quiénes son Alida y Yanacari?',
    '¿Qué son las gelatinas 3D?',
    '¿Dónde están ubicados exactamente?',
    '¿Qué incluyen los kits para emprendedores?',
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
    setCurrentPose('thinking');

    try {
      // In offline or file:// mode, immediately provide client-side mascot response
      if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
        await new Promise((r) => setTimeout(r, 400));
        setCurrentPose('delighted');
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'mascot',
          text: getMascotAnswer(query.trim()),
          timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
        return;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() }),
      });
      const data = await res.json();

      setCurrentPose('delighted');
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mascot',
        text: data.reply || getMascotAnswer(query.trim()),
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setCurrentPose('delighted');
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mascot',
        text: getMascotAnswer(query.trim()),
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setCurrentPose('greeting'), 3500);
    }
  };

  return (
    <>
      {/* Floating Mascot Badge in bottom-right corner next to WhatsApp */}
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
          title="Abrir Mascota Guía Informativa"
          aria-label="Abrir Mascota Guía Informativa"
        >
          <div className="shrink-0 bg-[#FFF3EA] rounded-full p-0.5 border border-[#F5DECF]">
            <MascotAvatar pose={currentPose} size={38} animate={false} />
          </div>
          <span className="hidden sm:inline text-xs font-semibold pr-1">
            {isOpen ? 'Cerrar Guía' : 'Mascota IA Guía'}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E66E22] animate-pulse"></span>
        </button>
      </div>

      {/* Mascot Chat Window Modal */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[410px] max-h-[580px] h-[540px] bg-[#FFFDFB] rounded-3xl shadow-2xl border-2 border-[#EADAD0] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#FFF4EA] to-[#FAF2EB] border-b border-[#EBDCD0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="shrink-0 bg-white p-1 rounded-2xl shadow-xs border border-[#F5E2D3]">
                <MascotAvatar pose={currentPose} size={42} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-[#2A1F1B]">
                    Mascota Guía de Alicar
                  </h4>
                  <span className="text-[10px] bg-[#E8F8EE] text-[#1E7841] font-semibold px-1.5 py-0.2 rounded-full">
                    Informativa
                  </span>
                </div>
                <p className="text-[11px] text-[#786153]">
                  Orienta y busca información en el sitio
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
                    <MascotAvatar pose="greeting" size={28} animate={false} />
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
                <MascotAvatar pose="thinking" size={24} animate={false} />
                <span className="animate-pulse">Consultando información del taller...</span>
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
                placeholder="Pregúntame algo sobre Tortas Alicar..."
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

            {/* Direct WhatsApp shortcut note inside chat */}
            <div className="flex items-center justify-between text-[11px] text-[#7A6153] pt-1">
              <span>¿Quieres cotizar directamente?</span>
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20la%20mascota%20gu%C3%ADa%20me%20orient%C3%B3%20para%20escribirte%20por%20WhatsApp.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('click')}
                className="inline-flex items-center gap-1 font-semibold text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Yanacari</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
