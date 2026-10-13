import React from 'react';
import { MascotAvatar } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { MessageCircle, Sparkles, MapPin, Award, Heart, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreGallery: () => void;
  onOpenMascotChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGallery, onOpenMascotChat }) => {
  return (
    <section
      id="inicio"
      className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-[#FFFDFB] to-[#FFFDFB]"
    >
      {/* Decorative organic background aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#FFE7D4]/40 via-[#FDF0E6]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Brand Headline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#F2DECE] text-[#8C461E] text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
              <span>Tradición Familiar Desde los Años 80 &bull; Maracay</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2A1F1B] leading-[1.12] tracking-tight">
              El arte de endulzar tus momentos{' '}
              <span className="italic font-normal text-[#C35C1D] relative inline-block">
                más especiales
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#E88B52]/40 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Subtitle with story context */}
            <p className="text-base sm:text-lg text-[#614E45] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Tortas personalizadas, pasteles de gala, gelatinas 3D encapsuladas y pasapalos artesanales.
              Una receta de amor comenzada por la abuela <strong className="font-semibold text-[#2A1F1B]">Alida</strong> y continuada con maestría por su hija <strong className="font-semibold text-[#2A1F1B]">Yanacari</strong> en el entrañable barrio Santa Rita.
            </p>

            {/* Core credibility tags */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-[#6C5549]">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#D84B4B]" />
                <span>100% Hecho a Mano</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C35C1D]" />
                <span>Recetas Tradicionales</span>
              </div>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('pop')}
                className="flex items-center gap-1.5 hover:text-[#C35C1D] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#507C5D]" />
                <span>Santa Rita, Maracay</span>
              </a>
            </div>

            {/* Main Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20vengo%20del%20sitio%20web%20de%20Tortas%20Alicar%20y%20quisiera%20consultar%20por%20un%20dise%C3%B1o.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('click')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  playMechanicalClick('click');
                  onExploreGallery();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#4A3931] bg-white border border-[#E8DCD4] hover:border-[#C35C1D] hover:text-[#C35C1D] shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>Ver Muestrario de Fotos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Mascot Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Primary Image Showcase Card */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-[#F7EFE9] group">
                <img
                  src="./images/wedding-cake.jpg"
                  alt="Torta nupcial artesanal de 3 pisos elaborada en Tortas Alicar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#FFD8B8]">
                    Creación Artesanal
                  </span>
                  <p className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                    Torta de 3 Pisos con Flores en Pasta de Azúcar
                  </p>
                </div>
              </div>

              {/* Floating Mascot Concierge Card */}
              <div
                onClick={() => {
                  playMechanicalClick('pop');
                  onOpenMascotChat();
                }}
                className="absolute -bottom-8 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-[#F2DFD2] max-w-[270px] sm:max-w-[310px] cursor-pointer hover:border-[#C35C1D] transition-all transform hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 bg-[#FFF3EB] rounded-2xl p-1 border border-[#F7DFD0]">
                    <MascotAvatar pose="whisking" size={62} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                      <span className="text-[11px] font-semibold text-[#8C461E] uppercase tracking-wider">
                        Mascota Guía
                      </span>
                    </div>
                    <p className="text-xs text-[#3E3029] mt-0.5 font-medium leading-snug">
                      «¡Hola! ¿Deseas saber sobre nuestras tortas, historia o cursos?»
                    </p>
                    <span className="text-[10px] text-[#C35C1D] font-semibold inline-flex items-center gap-0.5 mt-1 group-hover:underline">
                      Abrir consulta &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge on top right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-lg border border-[#F2DFD2] flex items-center gap-2">
                <span className="text-amber-500 font-bold text-sm">★ 5.0</span>
                <span className="text-[11px] text-[#634E43] font-medium">Reseñas en Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
