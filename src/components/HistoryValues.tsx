import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { Target, Compass, Sparkles, ShieldCheck, FileText, ChevronDown, MessageSquareHeart, GraduationCap, PackageCheck, MessageCircle } from 'lucide-react';

interface HistoryValuesProps {
  onOpenSuggestions: () => void;
}

export const HistoryValues: React.FC<HistoryValuesProps> = ({ onOpenSuggestions }) => {
  const [openLegalSection, setOpenLegalSection] = useState<'privacy' | 'terms' | null>(null);

  const toggleLegal = (sec: 'privacy' | 'terms') => {
    setOpenLegalSection(openLegalSection === sec ? null : sec);
  };

  return (
    <div className="space-y-12 py-4 max-w-5xl mx-auto">
      {/* 1. Encabezado */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#9E4616] text-xs font-semibold uppercase tracking-wider">
          <span>Sobre Nosotros</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1F1B]">
          Misión, Visión y Valores de Tortas Alicar
        </h2>
        <p className="text-sm text-[#665348] leading-relaxed">
          Repostería artesanal en Santa Rita, Maracay, enfocada en celebrar con cariño cada fecha especial familiar con pasteles frescos y diseño personalizado por Yanacari.
        </p>
      </div>

      {/* 2. Misión, Visión y Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#EBDCD0] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#C35C1D]/10 text-[#C35C1D] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">Nuestra Misión</h3>
          <p className="text-xs sm:text-sm text-[#5D4A40] leading-relaxed">
            Ofrecer repostería casera y artística de alta calidad para cumpleaños, bodas y reuniones familiares en Maracay, con un servicio cercano y a la medida de lo que sueña cada cliente.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#EBDCD0] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#507C5D]/10 text-[#507C5D] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">Nuestra Visión</h3>
          <p className="text-xs sm:text-sm text-[#5D4A40] leading-relaxed">
            Continuar siendo una opción de plena confianza en Santa Rita y Maracay para repostería por encargo, compartiendo también nuestros conocimientos prácticos a través de cursos y kits para nuevos emprendedores.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#EBDCD0] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#D67C3B]/10 text-[#D67C3B] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">Nuestros Valores</h3>
          <ul className="text-xs sm:text-sm text-[#5D4A40] space-y-1.5 leading-relaxed">
            <li>&bull; Honestidad en porciones e ingredientes frescos.</li>
            <li>&bull; Puntualidad en la entrega de cada encargo.</li>
            <li>&bull; Amor por los detalles artísticos y el acabado limpio.</li>
          </ul>
        </div>
      </div>

      {/* 3. Cursos y Talleres */}
      <div className="bg-gradient-to-r from-[#FFF5ED] via-[#FFF8F2] to-[#FFF5ED] rounded-3xl p-6 sm:p-8 border border-[#F3DEC8] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C461E] text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-[#C35C1D]" />
            <span>Capacitación en Santa Rita</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#2A1F1B]">
            Cursos Prácticos &amp; Kits para Emprendedores
          </h3>
          <p className="text-xs sm:text-sm text-[#665348] leading-relaxed">
            Yanacari dicta talleres personalizados de repostería básica, técnicas de alisado, encapsulado de gelatinas 3D y preparación de pasapalos para quienes deseen iniciar su propio camino dulce.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#EBDCD0] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2A1F1B]">
            <PackageCheck className="w-4 h-4 text-[#507C5D]" />
            <span>Kits de inicio disponibles</span>
          </div>
          <p className="text-xs text-[#6B574C] leading-relaxed">
            Incluye recetario impreso, espátulas, boquillas y asesoría directa vía WhatsApp durante tus primeras prácticas.
          </p>
          <a
            href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20reposter%C3%ADa.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Próximas Fechas</span>
          </a>
        </div>
      </div>

      {/* 4. Sección Legal & Sugerencias */}
      <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EBDCD0] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
              Políticas de Privacidad y Términos Legales
            </h3>
            <p className="text-xs text-[#705C51]">
              Información clara sobre el funcionamiento del sitio
            </p>
          </div>

          <button
            onClick={onOpenSuggestions}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF0E6] text-[#8C461E] hover:bg-[#F6DECE] text-xs font-semibold transition-colors cursor-pointer w-fit"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Sugerencias / Comentarios</span>
          </button>
        </div>

        {/* Acordeón de Legales */}
        <div className="space-y-3">
          {/* Privacidad */}
          <div className="bg-white rounded-2xl border border-[#EBDCD0] overflow-hidden">
            <button
              onClick={() => toggleLegal('privacy')}
              className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#2A1F1B]">
                <ShieldCheck className="w-4 h-4 text-[#507C5D]" />
                <span>Políticas de Privacidad</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#8C6D5B] transition-transform ${
                  openLegalSection === 'privacy' ? 'rotate-180 text-[#C35C1D]' : ''
                }`}
              />
            </button>
            {openLegalSection === 'privacy' && (
              <div className="px-5 pb-5 pt-1 text-xs text-[#5D4A40] leading-relaxed space-y-2 border-t border-[#F5ECE5]">
                <p>
                  En <strong>Tortas Alicar</strong> respetamos la privacidad de las familias que nos contactan. Los datos que ingresas en el formulario (nombre, teléfono, tipo de evento) se emplean únicamente para coordinar tu presupuesto y comunicarnos contigo en el horario acordado.
                </p>
                <p>
                  No compartimos ni comercializamos números de teléfono ni datos personales con terceros. La comunicación es directa y privada con Yanacari.
                </p>
              </div>
            )}
          </div>

          {/* Términos de Uso */}
          <div className="bg-white rounded-2xl border border-[#EBDCD0] overflow-hidden">
            <button
              onClick={() => toggleLegal('terms')}
              className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#2A1F1B]">
                <FileText className="w-4 h-4 text-[#C35C1D]" />
                <span>Términos de Uso del Sitio</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#8C6D5B] transition-transform ${
                  openLegalSection === 'terms' ? 'rotate-180 text-[#C35C1D]' : ''
                }`}
              />
            </button>
            {openLegalSection === 'terms' && (
              <div className="px-5 pb-5 pt-1 text-xs text-[#5D4A40] leading-relaxed space-y-2 border-t border-[#F5ECE5]">
                <p>
                  Este sitio web es una vitrina informativa y muestrario de creaciones artesanales. No es una tienda virtual con cobros automáticos ni pasarelas de pago.
                </p>
                <p>
                  Los presupuestos y pedidos se formalizan individualmente por WhatsApp para acordar sabores, porciones y fecha de entrega. Las fotografías expuestas son de propiedad exclusiva de Tortas Alicar.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
