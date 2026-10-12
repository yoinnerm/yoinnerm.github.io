import React from 'react';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/content';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-12 bg-[#FAF7F2] border-y border-[#F0E6DE] rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FFF0E2] text-[#9E4616] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Nuestros Servicios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1F1B] tracking-tight">
            Repostería a la medida de tu evento
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#665348] font-normal leading-relaxed">
            Cada pastel, pasapalo y gelatina se hornea y decora exclusivamente para tu celebración en Maracay.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EBDCD0] shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EBE4]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-[#8C461E]">
                  {service.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#2A1F1B]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#5E4D43] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#F5ECE5] space-y-1.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#503F35]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#507C5D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20quisiera%20consultar%20informaci%C3%B3n%20sobre%20el%20servicio%20de:%20${encodeURIComponent(
                      service.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#25D366] bg-[#E8F8EE] hover:bg-[#25D366] hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
