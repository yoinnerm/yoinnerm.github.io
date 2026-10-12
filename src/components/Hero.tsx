import React from 'react';
import { MascotAvatar } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { MessageCircle, MapPin, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGoToContact: () => void;
  onOpenAlicatChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToContact, onOpenAlicatChat }) => {
  return (
    <div className="relative pt-6 pb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Welcome Intro */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C461E] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
            <span>Repostería Artesanal &bull; Santa Rita, Maracay</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1F1B] leading-tight">
            Tortas, pasteles y decoraciones{' '}
            <span className="text-[#C35C1D] italic font-normal">hechos con cariño</span>
          </h1>

          <p className="text-sm sm:text-base text-[#614E45] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Bienvenido a nuestra plataforma informativa. Aquí podrás ver muestras de nuestras creaciones: tortas decoradas, gelatinas artísticas 3D, pasapalos y mesas de dulces elaboradas por <strong>Yanacari</strong>. Si deseas cotizar un diseño a tu medida, te atendemos directamente por WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#6C5549] pt-1">
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#DE3B3B]" />
              <span>Hecho a Mano</span>
            </span>
            <span className="text-[#D8C7BC]">&bull;</span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMechanicalClick('pop')}
              className="flex items-center gap-1.5 hover:text-[#C35C1D] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#507C5D]" />
              <span>Santa Rita, Maracay</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20estoy%20viendo%20la%20p%C3%A1gina%20de%20Tortas%20Alicar%20y%20quisiera%20hacerte%20una%20consulta.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMechanicalClick('click')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>

            <button
              onClick={() => {
                playMechanicalClick('click');
                onGoToContact();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#4A3931] bg-white border border-[#E8DCD4] hover:border-[#C35C1D] hover:text-[#C35C1D] transition-all cursor-pointer"
            >
              <span>Ir a Formulario de Contacto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Authentic Alicat Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative bg-gradient-to-br from-[#FFF4EA] to-white border border-[#F3DEC8] rounded-3xl p-6 sm:p-7 shadow-lg max-w-sm w-full text-center">
            <div className="flex justify-center mb-3">
              <MascotAvatar size={140} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF0E2] text-[#8C461E] text-xs font-bold mb-1">
              <span>¡Hola! Soy Alicat</span>
            </div>

            <p className="text-xs text-[#5C4A40] mt-1.5 leading-relaxed">
              Soy la mascota de Tortas Alicar. Mi misión es orientarte sobre el muestrario, las fotos, los sabores y cómo comunicarte con Yanacari.
            </p>

            <button
              onClick={() => {
                playMechanicalClick('pop');
                onOpenAlicatChat();
              }}
              className="mt-4 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#8C461E] bg-[#FFF2E7] hover:bg-[#FEE5D2] border border-[#F6D7C2] transition-colors cursor-pointer"
            >
              <span>Preguntarle algo a Alicat</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
