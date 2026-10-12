import React from 'react';
import { X, ExternalLink, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const siteLinks = [
    { title: 'Inicio / Portada Principal', url: '#inicio', desc: 'Presentación, lema y llamada a la acción para pedidos.' },
    { title: 'Galería & Muestrario de Creaciones', url: '#galeria', desc: 'Fotos reales de tortas de bodas, 15 años, infantiles, gelatinas 3D y pasapalos.' },
    { title: 'Servicios Artesanales', url: '#servicios', desc: 'Pasteles de pisos, gelatinas artísticas, mesas dulces y catering salado en Maracay.' },
    { title: 'Reseñas & Opiniones de Clientes', url: '#testimonios', desc: 'Calificación 5 estrellas en Google Maps y experiencias de clientes.' },
    { title: 'Historia, Misión, Visión & Valores', url: '#historia', desc: 'Nuestra historia en Santa Rita (Maracay), misión, visión y valores artesanales de Yanacari.' },
    { title: 'Cursos & Kits para Emprendedores', url: '#cursos', desc: 'Talleres de repostería y kits prácticos para iniciar en Maracay.' },
    { title: 'Contacto & Encargos Directos', url: '#contacto', desc: 'Formulario de contacto, horario de atención y WhatsApp directo.' },
    { title: 'Ubicación en Google Maps', url: BUSINESS_INFO.mapsUrl, desc: 'Ficha verificada en Google Maps para llegar a Santa Rita, Maracay.' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#F0E6DE] flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C461E] text-xs font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#C35C1D]" />
              <span>Estructura de la Plataforma</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
              Mapa del Sitio &amp; Detalles de Indexación
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C6D5B] hover:text-[#2A1F1B] p-1.5 rounded-full hover:bg-[#F7EFE9] cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-[#6B574C] leading-relaxed">
            Esta estructura optimizada para motores de búsqueda (Google Search y Google Maps) garantiza que los clientes encuentren rápidamente las especialidades de repostería en Maracay.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {siteLinks.map((link, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#FFFDFB] border border-[#EBDCD0] hover:border-[#C35C1D] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#2A1F1B]">{link.title}</h4>
                  <ExternalLink className="w-3 h-3 text-[#A89182]" />
                </div>
                <p className="text-[11px] text-[#7A6153] mt-1 leading-snug">{link.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#F0E6DE] flex justify-end rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#C35C1D] text-white text-xs font-semibold hover:bg-[#A94B12] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
