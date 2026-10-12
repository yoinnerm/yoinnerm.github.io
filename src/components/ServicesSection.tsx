import React from 'react';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-20 bg-[#FAF7F2] border-y border-[#F0E6DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0E2] text-[#9E4616] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
            <span>Nuestros Servicios Artesanales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1F1B] tracking-tight">
            Creaciones a medida para tus celebraciones
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#665348] font-normal leading-relaxed">
            No manejamos catálogos rígidos ni productos en serie. Cada pastel, pasapalo y gelatina se conceptualiza y hornea exclusivamente para tu evento especial.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBDCD0] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EBE4]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#8C461E] uppercase tracking-wider shadow-2xs">
                  {service.category}
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#2A1F1B] group-hover:text-[#C35C1D] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#5E4D43] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-4 border-t border-[#F5ECE5] space-y-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#503F35]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#507C5D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal for note */}
                  <div className="mt-4 p-3 rounded-xl bg-[#FFF9F5] border border-[#F5E6DC] text-xs text-[#7A6153]">
                    <span className="font-semibold text-[#8C461E]">Ideal para:</span> {service.idealFor}
                  </div>
                </div>

                {/* WhatsApp consultation button */}
                <div className="pt-2">
                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20quisiera%20consultar%20informaci%C3%B3n%20sobre%20el%20servicio%20de:%20${encodeURIComponent(
                      service.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMechanicalClick('click')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#25D366] bg-[#E8F8EE] hover:bg-[#25D366] hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar este servicio por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for personalized consultations */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFF5ED] via-[#FFF9F5] to-[#FFF5ED] border border-[#F5DFCF] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-serif font-bold text-[#2A1F1B]">
              ¿Tienes una temática o idea especial en mente?
            </h4>
            <p className="text-xs sm:text-sm text-[#665348]">
              Yanacari elabora bocetos personalizados y te asesora en las porciones exactas para tu evento.
            </p>
          </div>

          <a
            href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20tengo%20una%20idea%20especial%20para%20un%20pastel%20y%20quisiera%20mostr%C3%A1rtela.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playMechanicalClick('click')}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Compartir mi idea por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
