import React, { useState } from 'react';
import { REAL_REVIEWS, FAQS, BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { Star, MessageSquareQuote, ChevronDown, MapPin, ExternalLink, ThumbsUp } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    playMechanicalClick('pop');
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="testimonios" className="py-20 bg-[#FAF7F2] border-t border-[#EFE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0E2] text-[#9E4616] text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Opiniones de Quienes Han Celebrado con Nosotros</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1F1B] tracking-tight">
            Reseñas Reales en Google Maps &amp; Clientes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#665348] font-normal leading-relaxed">
            La mejor garantía de nuestro trabajo es la sonrisa de las familias de Maracay y Santa Rita en cada fecha memorable.
          </p>

          {/* Google Maps Reputation Badge */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#E8DACF] shadow-xs">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#2A1F1B]">5.0 de 5 estrellas</span>
            <span className="text-[#C5B5A7]">•</span>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMechanicalClick('pop')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#C35C1D] hover:underline"
            >
              <span>Ver en Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {REAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCD0] shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Top header with stars and verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#507C5D] bg-[#EBF6EE] px-2.5 py-0.5 rounded-full">
                    {review.date}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-[#3E2E25] italic font-serif leading-relaxed">
                  «{review.quote}»
                </p>
              </div>

              {/* Author info */}
              <div className="mt-6 pt-4 border-t border-[#F5ECE5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF0E6] text-[#C35C1D] flex items-center justify-center font-bold font-serif text-sm border border-[#F2DECE]">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#2A1F1B]">
                      {review.author}
                    </h4>
                    <p className="text-[11px] text-[#7A6153] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#507C5D]" />
                      <span>{review.location}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#8C7164]">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#507C5D]" />
                  <span>Recomendado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Accordion Section */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#E8DACF]">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#8C461E] uppercase tracking-wider">
              Preguntas Frecuentes
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1F1B] mt-1">
              Todo lo que necesitas saber antes de encargar
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#EBDCD0] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#2A1F1B]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8C6D5B] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#C35C1D]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#5D4B40] leading-relaxed border-t border-[#F5ECE5] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
