import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Trash2,
  Share2,
  Sparkles,
  Bot,
  RefreshCw,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Message, ChatRole, QuickPrompt } from '../types/chat';
import { QUICK_PROMPTS, ALICAR_STORE_INFO } from '../data/alicarData';
import { sendChatMessage } from '../services/api';
import { ChatMessageView } from './ChatMessageView';

interface Props {
  currentRole: ChatRole;
  selectedModel: string;
  onOpenRoleModal: () => void;
  onNavigateToSimulator?: () => void;
  pendingPrompt?: string | null;
  onClearPendingPrompt?: () => void;
}

export const ChatWindow: React.FC<Props> = ({
  currentRole,
  selectedModel,
  onOpenRoleModal,
  onNavigateToSimulator,
  pendingPrompt,
  onClearPendingPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `¡Hola! Soy **Alicat 🐱**, tu asistente de **Alicar TIENDA** 💗\n\n¿Qué vamos a hornear o emprender hoy? Estoy aquí para ayudarte con:\n- 🧁 Insumos, herramientas y boquillas de repostería.\n- 📦 Packaging, cajas de tortas y moldes desmontables.\n- 🚀 Kits de inicio y costeo para emprendedores.\n- 🚚 Envíos a toda Venezuela y métodos de pago (Cashea, Pago Móvil, Binance, etc.).\n\n¡Pregúntame lo que necesites! ✨`,
      timestamp: new Date(),
      modelUsed: selectedModel,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (pendingPrompt) {
      handleSend(pendingPrompt);
      if (onClearPendingPrompt) {
        onClearPendingPrompt();
      }
    }
  }, [pendingPrompt]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Placeholder for assistant streaming/response
    const assistantMessageId = `asst-${Date.now()}`;
    const initialAssistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      modelUsed: selectedModel,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialAssistantMessage]);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let accumulatedContent = '';

      const finalReply = await sendChatMessage({
        messages: apiMessages,
        systemInstruction: currentRole.systemInstruction,
        model: selectedModel,
        onChunk: (chunk) => {
          accumulatedContent += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: accumulatedContent, isStreaming: true }
                : msg
            )
          );
        },
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: finalReply || accumulatedContent,
                isStreaming: false,
              }
            : msg
        )
      );
    } catch (err: any) {
      console.error('Error generating response:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: `Lo siento, ocurrió un error al responder: ${err.message || 'Error de conexión'}. Por favor intenta de nuevo. 🐱`,
                error: true,
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('¿Deseas reiniciar la conversación con Alicat?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: `¡Miau! Conversación reiniciada. ¿En qué dulce proyecto te puedo ayudar ahora? 🐱🧁`,
          timestamp: new Date(),
          modelUsed: selectedModel,
        },
      ]);
    }
  };

  const handleExportWhatsApp = () => {
    const text = messages
      .map((m) => `${m.role === 'user' ? '👤 Cliente:' : '🐱 Alicat:'}\n${m.content}`)
      .join('\n\n---\n\n');

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `🧁 Consulta de Repostería - Alicar Tienda (yoinnerm.github.io)\n\n${text}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/60 rounded-2xl border border-pink-100 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Top Chat Bar */}
      <header className="px-4 py-3 bg-white/90 border-b border-pink-100 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-500 flex items-center justify-center text-xl shadow-md text-white border-2 border-white">
            {currentRole.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-1.5">
                Alicat
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium">
                  {currentRole.badge}
                </span>
              </h2>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Conectado a Alicar Tienda &bull;{' '}
              <span className="font-mono text-[11px] text-purple-600">{selectedModel}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenRoleModal}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-lg transition border border-pink-200"
            title="Cambiar rol o modelo de Gemini"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cambiar Rol</span>
          </button>

          <button
            type="button"
            onClick={handleExportWhatsApp}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition border border-emerald-200"
            title="Compartir chat por WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Limpiar chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Website Banner Context */}
      <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 px-4 py-2 border-b border-pink-100 text-xs text-pink-900 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="text-sm">🧁</span>
          <span className="font-medium truncate">
            Asistente entrenado con el catálogo oficial de{' '}
            <a
              href="https://yoinnerm.github.io/"
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold hover:text-pink-600"
            >
              yoinnerm.github.io
            </a>
          </span>
        </div>
        {onNavigateToSimulator && (
          <button
            onClick={onNavigateToSimulator}
            className="shrink-0 flex items-center gap-1 font-semibold text-pink-600 hover:text-pink-800 text-[11px] ml-2"
          >
            <span>Ver widget en la web</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((message) => (
          <ChatMessageView
            key={message.id}
            message={message}
            currentRole={currentRole}
          />
        ))}

        {isLoading && messages[messages.length - 1]?.content === '' && (
          <div className="flex items-center gap-3 text-pink-600 text-xs italic bg-white/70 p-3 rounded-2xl w-fit border border-pink-100">
            <span className="text-base animate-bounce">🐱</span>
            <div className="flex items-center gap-1.5">
              <span>Alicat está horneando una respuesta...</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-pulse delay-200" />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-white/80 border-t border-pink-100 shrink-0">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-pink-500" />
          <span>Preguntas frecuentes para Alicat:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {QUICK_PROMPTS.map((qp: QuickPrompt) => (
            <button
              key={qp.id}
              onClick={() => handleSend(qp.prompt)}
              disabled={isLoading}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200 flex items-center gap-1.5 transition disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{qp.icon}</span>
              <span className="whitespace-nowrap">{qp.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-pink-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-end gap-2"
        >
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu duda sobre tortas, moldes, boquillas, envíos o precios..."
              className="w-full resize-none rounded-xl border border-pink-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-slate-50/50 pr-10 text-gray-800 placeholder-gray-400"
              disabled={isLoading}
            />
            <div className="absolute right-3 bottom-3 text-[10px] text-gray-400 font-mono hidden sm:block">
              Enter ↵
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-[52px] px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium shadow-md shadow-pink-200 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 px-1">
          <span>
            💡 ¿Quieres instalar este bot en <b>yoinnerm.github.io</b>? Usa la pestaña superior "Código para tu Web".
          </span>
          <span className="font-mono text-pink-600 font-medium hidden sm:inline">
            Alicar Tienda ©
          </span>
        </div>
      </div>
    </div>
  );
};
