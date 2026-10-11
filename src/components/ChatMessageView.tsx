import React, { useState } from 'react';
import { Copy, Check, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import { Message, ChatRole } from '../types/chat';

interface Props {
  message: Message;
  currentRole: ChatRole;
}

export const ChatMessageView: React.FC<Props> = ({ message, currentRole }) => {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const isAssistant = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = 'es-ES';
    utterance.rate = 1.05;
    utterance.pitch = isAssistant ? 1.15 : 1.0; // Sweet friendly tone for Alicat

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  // Simple rich text formatter for bold, bullets, and line breaks
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      // Bullet list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
        const content = line.trim().replace(/^[-*•]\s+/, '');
        return (
          <li key={lineIndex} className="ml-4 list-disc my-1">
            {formatBold(content)}
          </li>
        );
      }

      // Numbered items (1. 2. 3.)
      if (/^\d+\.\s+/.test(line.trim())) {
        return (
          <li key={lineIndex} className="ml-4 list-decimal my-1">
            {formatBold(line.trim().replace(/^\d+\.\s+/, ''))}
          </li>
        );
      }

      // Empty line
      if (!line.trim()) {
        return <div key={lineIndex} className="h-2" />;
      }

      // Regular line
      return (
        <p key={lineIndex} className="my-1 leading-relaxed">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-pink-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex w-full gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 flex items-center justify-center text-xl shadow-md text-white border-2 border-white">
            {currentRole.avatar}
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 ${
          isAssistant
            ? message.error
              ? 'bg-red-50 border border-red-200 text-red-900'
              : 'bg-white border border-pink-100 text-gray-800 shadow-pink-100/40'
            : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200'
        }`}
      >
        {/* Header label for assistant */}
        {isAssistant && (
          <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-pink-50 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-pink-700">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>{currentRole.name}</span>
            </div>
            {message.modelUsed && (
              <span className="text-[10px] bg-pink-100/70 text-pink-700 px-1.5 py-0.5 rounded-full font-mono">
                {message.modelUsed}
              </span>
            )}
          </div>
        )}

        {/* Message Content */}
        {message.error ? (
          <div className="flex items-center gap-2 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{message.content}</span>
          </div>
        ) : (
          <div className={`text-sm ${isAssistant ? 'text-gray-800' : 'text-white'}`}>
            {renderFormattedText(message.content)}
          </div>
        )}

        {/* Footer info & actions */}
        <div
          className={`flex items-center justify-between gap-3 mt-2 pt-1 text-[11px] ${
            isAssistant ? 'text-gray-400 border-t border-gray-50' : 'text-pink-100 justify-end'
          }`}
        >
          <span>{formattedTime}</span>

          {isAssistant && !message.error && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleSpeech}
                title={speaking ? 'Detener lectura' : 'Escuchar respuesta de Alicat'}
                className="p-1 rounded hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition"
              >
                {speaking ? <VolumeX className="w-3.5 h-3.5 text-pink-600" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                title="Copiar texto"
                className="p-1 rounded hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white shadow-md border-2 border-white">
          Tú
        </div>
      )}
    </div>
  );
};
