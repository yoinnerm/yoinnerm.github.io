import React, { useState } from 'react';
import { X, Check, Bot, Sparkles, Sliders, Cpu, Save } from 'lucide-react';
import { ChatRole } from '../types/chat';
import { CHAT_ROLES } from '../data/alicarData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentRole: ChatRole;
  onSelectRole: (role: ChatRole) => void;
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onUpdateSystemInstruction: (newInstruction: string) => void;
}

export const RoleSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  selectedModel,
  onSelectModel,
  onUpdateSystemInstruction,
}) => {
  const [customInstruction, setCustomInstruction] = useState(
    currentRole.systemInstruction
  );
  const [isEditingInstruction, setIsEditingInstruction] = useState(false);

  if (!isOpen) return null;

  const handleRoleClick = (role: ChatRole) => {
    onSelectRole(role);
    setCustomInstruction(role.systemInstruction);
    if (role.recommendedModel) {
      onSelectModel(role.recommendedModel);
    }
  };

  const handleSaveInstruction = () => {
    onUpdateSystemInstruction(customInstruction);
    setIsEditingInstruction(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-pink-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl">
              🐱
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Configuración del Chatbot
              </h3>
              <p className="text-xs text-gray-500">
                Elige la personalidad de Alicat y el modelo de Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="my-5 space-y-3">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            1. Selecciona la Personalidad / Rol del Asistente
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CHAT_ROLES.map((role) => {
              const isSelected = currentRole.id === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleClick(role)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-2 ring-pink-400/20'
                      : 'border-gray-200 hover:border-pink-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-2xl shrink-0 mt-0.5">{role.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-gray-900 truncate">
                        {role.name}
                      </h4>
                      {isSelected && (
                        <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-pink-700 font-semibold bg-pink-100/70 px-1.5 py-0.2 rounded-full inline-block mt-0.5">
                      {role.badge}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Model Selector */}
        <div className="my-5 space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-purple-600" />
            2. Modelo de Gemini AI
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: 'gemini-3.8-flash',
                name: 'Gemini 3.8 Flash',
                desc: 'Equilibrado & Inteligente (Recomendado)',
              },
              {
                id: 'gemini-3.1-flash-lite',
                name: 'Gemini 3.1 Flash-Lite',
                desc: 'Ultra rápido & Ligero',
              },
              {
                id: 'gemini-3.1-pro-preview',
                name: 'Gemini 3.1 Pro',
                desc: 'Razonamiento complejo',
              },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectModel(m.id)}
                className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                  selectedModel === m.id
                    ? 'border-purple-600 bg-purple-50 text-purple-900 font-semibold ring-1 ring-purple-400'
                    : 'border-gray-200 hover:border-purple-200 text-gray-700'
                }`}
              >
                <div className="font-bold truncate">{m.name}</div>
                <div className="text-[10px] text-gray-500 truncate mt-0.5">
                  {m.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom System Instruction Editor */}
        <div className="mt-4 pt-4 border-t border-pink-100">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-pink-600" />
              Instrucción del Sistema (Prompt de Alicat)
            </label>
            <button
              onClick={() => setIsEditingInstruction(!isEditingInstruction)}
              className="text-xs text-pink-600 hover:text-pink-800 font-semibold"
            >
              {isEditingInstruction ? 'Cancelar edición' : 'Editar prompt'}
            </button>
          </div>

          {isEditingInstruction ? (
            <div className="space-y-2">
              <textarea
                rows={5}
                value={customInstruction}
                onChange={(e) => setCustomInstruction(e.target.value)}
                className="w-full text-xs p-3 font-mono border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-slate-50"
              />
              <button
                onClick={handleSaveInstruction}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar nueva instrucción</span>
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-gray-500 line-clamp-3 bg-slate-50 p-2.5 rounded-xl font-mono border border-gray-100">
              {currentRole.systemInstruction}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:from-pink-600 hover:to-rose-600 transition"
          >
            Listo, volver al chat
          </button>
        </div>
      </div>
    </div>
  );
};
