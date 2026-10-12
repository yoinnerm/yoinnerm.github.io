import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { X, Send, CheckCircle, MessageSquareHeart } from 'lucide-react';

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestionsModal: React.FC<SuggestionsModalProps> = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);

    try {
      const saved = JSON.parse(localStorage.getItem('alicar_sugerencias') || '[]');
      saved.unshift({
        nombre: nombre || 'Anónimo',
        comentario,
        fecha: new Date().toISOString(),
      });
      localStorage.setItem('alicar_sugerencias', JSON.stringify(saved));
    } catch {
      // Ignorar
    }
  };

  const whatsappHref = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hola Yanacari, te dejo una sugerencia desde la página web:
De: ${nombre || 'Cliente'}
Mensaje: ${comentario}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C6D5B] hover:text-[#2A1F1B] p-1.5 rounded-full hover:bg-[#F7EFE9] cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {enviado ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto" />
            <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
              ¡Muchas Gracias por tu Comentario!
            </h3>
            <p className="text-xs text-[#5D4A40] leading-relaxed">
              Valoramos mucho tus palabras para seguir perfeccionando nuestras recetas y atención.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BA5A] transition-colors"
              >
                Enviar también por WhatsApp
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-[#FAF0E6] text-[#8C461E] text-xs font-semibold hover:bg-[#F6DECE] transition-colors cursor-pointer"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-[#8C461E]">
              <MessageSquareHeart className="w-5 h-5 text-[#C35C1D]" />
              <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
                Sugerencias y Comentarios
              </h3>
            </div>
            <p className="text-xs text-[#6B574C] leading-relaxed">
              Déjanos tus ideas, observaciones sobre la página o qué sabores te gustaría que preparemos.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                Tu Nombre (Opcional)
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Ana Morales"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] text-xs text-[#2A1F1B] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                Tu Comentario o Recomendación *
              </label>
              <textarea
                required
                rows={4}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe aquí tu opinión o consulta..."
                className="w-full p-3 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] text-xs text-[#2A1F1B] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Mensaje</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
