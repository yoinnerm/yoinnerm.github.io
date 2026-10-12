import React, { useState } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { X, MessageSquareHeart, Send, CheckCircle2, MessageCircle } from 'lucide-react';

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestionsModal: React.FC<SuggestionsModalProps> = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [tipo, setTipo] = useState<'sugerencia' | 'felicitacion' | 'idea'>('sugerencia');
  const [enviado, setEnviado] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick('click');
    setEnviado(true);

    try {
      const saved = JSON.parse(localStorage.getItem('alicar_sugerencias') || '[]');
      saved.unshift({ nombre, comentario, tipo, fecha: new Date().toISOString() });
      localStorage.setItem('alicar_sugerencias', JSON.stringify(saved));
    } catch {
      // ignore
    }
  };

  const whatsappHref = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hola Yanacari, te dejo una ${tipo}: "${comentario}" - De parte de: ${nombre || 'Un cliente amigo'}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDFB] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EBDCD0] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playMechanicalClick('pop');
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6153] hover:bg-[#F2E5DB] transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {enviado ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <MascotAvatar pose="delighted" size={100} />
            </div>
            <div className="w-12 h-12 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2A1F1B]">
              ¡Muchas Gracias por tu Mensaje!
            </h3>
            <p className="text-xs sm:text-sm text-[#5D4A40] max-w-sm mx-auto leading-relaxed">
              En Tortas Alicar valoramos cada opinión familiar. Tu sugerencia nos ayuda a seguir perfeccionando nuestras recetas y atención.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('click')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BA5A] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar también por WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#C35C1D] text-white text-xs font-semibold hover:bg-[#A94B12] transition-colors cursor-pointer"
              >
                Volver a la página
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="shrink-0 bg-[#FFF3EA] p-1.5 rounded-2xl border border-[#F5DFCF]">
                <MascotAvatar pose="greeting" size={60} />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#8C461E] uppercase tracking-wider">
                  Buzón de la Familia Alicar
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1F1B]">
                  Sugerencias y/o Comentarios
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#6B574C] leading-relaxed">
              ¿Tienes alguna sugerencia de sabor, recomendación para nuestros talleres o quieres dejar un saludo a Yanacari? ¡Nos encanta leerte!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                  Tipo de Mensaje
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sugerencia', 'felicitacion', 'idea'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => {
                        playMechanicalClick('pop');
                        setTipo(t);
                      }}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border capitalize transition-all cursor-pointer ${
                        tipo === t
                          ? 'border-[#C35C1D] bg-[#FFF4EC] text-[#8C461E]'
                          : 'border-[#E0CEBF] text-[#695244] hover:bg-[#FAF4EF]'
                      }`}
                    >
                      {t === 'felicitacion' ? 'Felicitación' : t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                  Tu Nombre (opcional)
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Carmen"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFCEBF] bg-white text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                  Tu Comentario o Sugerencia *
                </label>
                <textarea
                  required
                  rows={4}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Escribe tu mensaje con total confianza..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DFCEBF] bg-white text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Comentario</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-full text-xs font-semibold text-[#70594C] hover:bg-[#F2E5DB] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
