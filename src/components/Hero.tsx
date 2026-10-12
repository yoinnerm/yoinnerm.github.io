import React from 'react';
import { BUSINESS_INFO } from '../data/content';
import { MessageCircle, MapPin, Heart, ArrowRight } from 'lucide-react';

interface HeroProps {
  onGoToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToContact }) => {
  return (
    <div className="relative pt-6 pb-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Welcome Intro */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C461E] text-xs font-semibold">
            <span>Repostería Artesanal &bull; Santa Rita, Maracay</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1F1B] leading-tight">
            Tortas, pasteles y decoraciones{' '}
            <span className="text-[#C35C1D] italic font-normal">hechos con cariño</span>
          </h1>

          <p className="text-sm sm:text-base text-[#614E45] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Bienvenido a nuestra vitrina de repostería. Aquí podrás ver muestras de nuestras creaciones: tortas decoradas, gelatinas artísticas 3D, pasapalos y mesas de dulces elaboradas por <strong>Yanacari</strong>. Para consultar presupuestos o encargar tu diseño personalizado, escríbenos directamente por WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#6C5549] pt-1">
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#DE3B3B]" />
              <span>Elaboración Artesanal</span>
            </span>
            <span className="text-[#D8C7BC]">&bull;</span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>

            <button
              onClick={onGoToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#4A3931] bg-white border border-[#E8DCD4] hover:border-[#C35C1D] hover:text-[#C35C1D] transition-all cursor-pointer"
            >
              <span>Ir a Formulario de Contacto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Clean featured image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#F3DEC8] max-w-md w-full bg-white">
            <img
              src="./images/wedding-cake.jpg"
              alt="Pastel de Celebración de Tortas Alicar"
              className="w-full h-80 object-cover"
            />
            <div className="p-4 bg-[#FFF9F5] border-t border-[#F5E6DC] text-center">
              <p className="text-xs font-semibold text-[#8C461E]">
                Pasteles de bodas, 15 años y ocasiones especiales en Maracay
              </p>
              <p className="text-[11px] text-[#7A6153] mt-0.5">
                Cada pedido se prepara fresco y a la medida de tu celebración
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
