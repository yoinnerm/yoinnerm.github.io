import React from 'react';
import { playMechanicalClick } from '../utils/sound';
import { X, Network, ExternalLink, FileCode, CheckCircle2 } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const links = [
    { title: 'Inicio / Portada Principal', url: '#inicio', desc: 'Presentación, lema, llamada a la acción y mascota guía.' },
    { title: 'Historia de Alida a Yanacari & Valores', url: '#historia', desc: 'Orígenes en los años 80 en Santa Rita (Maracay), misión, visión y valores de la familia.' },
    { title: 'Servicios de Repostería', url: '#servicios', desc: 'Tortas de boda, pasteles temáticos, gelatinas 3D, pasapalos gourmet y mesas de dulces.' },
    { title: 'Galería Interactiva & Muestrario', url: '#galeria', desc: 'Carrusel 3D con fotos de alta resolución, filtros por categoría y visor ampliado.' },
    { title: 'Kits para Emprendedores & Cursos', url: '#cursos-kits', desc: 'Capacitación presencial en Maracay y sets de herramientas con enlace directo a WhatsApp.' },
    { title: 'Reseñas & Google Maps', url: '#testimonios', desc: 'Opiniones reales de 5 estrellas verificadas en Google Maps y preguntas frecuentes.' },
    { title: 'Formulario de Contacto & Horarios', url: '#contacto', desc: 'Solicitud de presupuestos en horarios 9 a 13 o 14 a 20 con guardado en forms.' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDFB] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#EBDCD0] shadow-2xl relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E4DA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C35C1D]/10 text-[#C35C1D] flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
                Mapa del Sitio &amp; Estructura de Indexación
              </h3>
              <p className="text-xs text-[#7A6153]">
                Optimizado para motores de búsqueda, Google Ads y navegación rápida
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playMechanicalClick('pop');
              onClose();
            }}
            className="p-2 rounded-full text-[#7A6153] hover:bg-[#F2E5DB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links list */}
        <div className="py-4 overflow-y-auto space-y-3 flex-1">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              onClick={() => {
                playMechanicalClick('click');
                onClose();
              }}
              className="block p-3.5 rounded-2xl bg-[#FAF7F3] hover:bg-[#F5ECE3] border border-[#EFE3D7] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#2A1F1B] group-hover:text-[#C35C1D] transition-colors">
                  {link.title}
                </span>
                <span className="text-xs text-[#C35C1D] opacity-0 group-hover:opacity-100 transition-opacity">
                  Ir &rarr;
                </span>
              </div>
              <p className="text-xs text-[#6A574C] mt-1">{link.desc}</p>
            </a>
          ))}

          {/* Technical SEO Files */}
          <div className="pt-2 border-t border-[#F2E4D8] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white border border-[#E0D0C4] flex items-center justify-between text-[#4F3C32] hover:text-[#C35C1D]"
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#C35C1D]" />
                <span className="font-semibold">sitemap.xml (XML Sitemap)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white border border-[#E0D0C4] flex items-center justify-between text-[#4F3C32] hover:text-[#C35C1D]"
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#507C5D]" />
                <span className="font-semibold">robots.txt</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-3 border-t border-[#F0E4DA] flex items-center justify-between text-xs text-[#8C7164]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#507C5D]" />
            <span>Indexación Schema.org y OpenGraph configurada</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#C35C1D] text-white font-semibold text-xs hover:bg-[#A94B12]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
