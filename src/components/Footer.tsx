import React from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/content';
import { Mail, MapPin, Phone, MessageSquareHeart, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'principal' | 'contacto' | 'nosotros') => void;
  onOpenSuggestions: () => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenSuggestions,
  onOpenSitemap,
}) => {
  return (
    <footer className="bg-[#241B17] text-[#D8CCC4] pt-12 pb-10 border-t border-[#3A2D26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#3D2E26]">
          {/* Col 1: Brand & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start">
              <Logo size="lg" variant="white" showSubtitle={true} />
            </div>

            <p className="text-xs sm:text-sm text-[#B3A196] leading-relaxed max-w-sm">
              Repostería artesanal en el barrio Santa Rita de Maracay. Tortas decoradas, gelatinas artísticas 3D y pasapalos preparados por Yanacari para acompañar tus celebraciones.
            </p>

            {/* Redes sociales */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#352721] hover:bg-[#E1306C] text-[#E8DDD6] hover:text-white flex items-center justify-center transition-colors"
                title="Instagram de Tortas Alicar"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#352721] hover:bg-black text-[#E8DDD6] hover:text-white flex items-center justify-center transition-colors"
                title="TikTok de Tortas Alicar"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.33a6.34 6.34 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.6a6.34 6.34 0 0 0 10.82 4.48c1.33-1.33 1.94-3.2 1.7-5.06a8.28 8.28 0 0 0 5.07 1.72V13.3a4.85 4.85 0 0 1-1-.02 4.84 4.84 0 0 1-2.92-1.59 4.85 4.85 0 0 1-1.08-3.05V6.69h4z" />
                </svg>
              </a>

              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#352721] hover:bg-[#1877F2] text-[#E8DDD6] hover:text-white flex items-center justify-center transition-colors"
                title="Facebook de Tortas Alicar"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation to 3 Sections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Secciones
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigateTab('principal')}
                  className="hover:text-[#F39159] transition-colors cursor-pointer text-left"
                >
                  1. Principal &amp; Muestrario
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('contacto')}
                  className="hover:text-[#F39159] transition-colors cursor-pointer text-left"
                >
                  2. Contacto &amp; Formulario
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('nosotros')}
                  className="hover:text-[#F39159] transition-colors cursor-pointer text-left"
                >
                  3. Misión, Visión &amp; Legales
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenSuggestions}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D2C24] text-[#F39159] hover:bg-[#523B30] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                  <span>Sugerencias / Comentarios</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contacto y Ubicación
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#F39159] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-[#A69387]">Correo de atención:</span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="font-semibold text-white hover:text-[#F39159] underline underline-offset-2 transition-colors break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-[#A69387]">WhatsApp:</span>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-[#25D366] transition-colors"
                  >
                    {BUSINESS_INFO.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#507C5D] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-[#A69387]">Ubicación:</span>
                  <p className="text-xs text-[#C8BCB4]">
                    Barrio Santa Rita, Maracay, Estado Aragua
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSitemap}
                className="text-[11px] text-[#A69387] hover:text-[#F39159] underline cursor-pointer"
              >
                Mapa del Sitio &bull; Indexación
              </button>
            </div>
          </div>
        </div>

        {/* Derechos de autor reservados */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8A7E] gap-3">
          <p>
            &copy; {new Date().getFullYear()} Tortas Alicar. Todos los derechos reservados.
          </p>
          <p className="text-[11px]">
            Santa Rita, Maracay &bull; Venezuela
          </p>
        </div>
      </div>
    </footer>
  );
};
