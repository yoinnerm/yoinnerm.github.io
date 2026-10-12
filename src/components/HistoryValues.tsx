import React, { useState } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { Target, Compass, Sparkles, ShieldCheck, FileText, Bot, MessageSquareHeart, GraduationCap, PackageCheck, ArrowUpRight, MessageCircle, ChevronDown, Check } from 'lucide-react';

interface HistoryValuesProps {
  onOpenSuggestions: () => void;
}

export const HistoryValues: React.FC<HistoryValuesProps> = ({ onOpenSuggestions }) => {
  const [openLegalSection, setOpenLegalSection] = useState<'privacy' | 'terms' | 'ai-help' | null>(null);

  const toggleLegal = (sec: 'privacy' | 'terms' | 'ai-help') => {
    playMechanicalClick('pop');
    setOpenLegalSection(openLegalSection === sec ? null : sec);
  };

  return (
    <div className="space-y-16 py-4">
      {/* 1. Encabezado de Nosotros */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#9E4616] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
          <span>Sobre Nosotros</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1F1B]">
          Misión, Visión y Valores de Tortas Alicar
        </h2>
        <p className="text-sm text-[#665348] leading-relaxed">
          Un taller artesanal en el barrio Santa Rita de Maracay, enfocado en acompañar las fechas especiales de cada familia con pasteles frescos, decoraciones cuidadas y trato directo con Yanacari.
        </p>
      </div>

      {/* 2. Misión, Visión y Valores (Tarjetas limpias) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF7F2] rounded-3xl p-7 border border-[#EBDCD0] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#C35C1D]/10 text-[#C35C1D] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">Nuestra Misión</h3>
          <p className="text-xs sm:text-sm text-[#5D4A40] leading-relaxed">
            Ofrecer repostería casera y artística de alta calidad para cumpleaños, bodas y reuniones familiares en Maracay, brindando un servicio cercano, honesto y a la medida de lo que sueña cada cliente.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-3xl p-7 border border-[#EBDCD0] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#507C5D]/10 text-[#507C5D] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">Nuestra Visión</h3>
          <p className="text-xs sm:text-sm text-[#5D4A40] leading-relaxed">
            Continuar siendo una opción de plena confianza en Santa Rita y Maracay para repostería por encargo, compartiendo también nuestros conocimientos prácticos a través de cursos y kits para nuevos emprendedores.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-3xl p-7 border border-[#EBDCD0] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#D67C3B]/10 text-[#D67C3B] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">Nuestros Valores</h3>
          <ul className="text-xs sm:text-sm text-[#5D4A40] space-y-1.5">
            <li><strong className="text-[#2A1F1B]">&bull; Dedicación artesanal:</strong> Horneado fresco sin preparados industriales.</li>
            <li><strong className="text-[#2A1F1B]">&bull; Trato cercano:</strong> Comunicación directa sin intermediarios.</li>
            <li><strong className="text-[#2A1F1B]">&bull; Amor por el detalle:</strong> Cuidado de cada pétalo y acabado.</li>
            <li><strong className="text-[#2A1F1B]">&bull; Honestidad:</strong> Presupuestos claros y ajustados a tu necesidad.</li>
          </ul>
        </div>
      </div>

      {/* 3. Kits para Emprendedores & Cursos de Repostería */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold text-[#8C461E] uppercase tracking-wider">
            Capacitación &amp; Emprendimiento
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1F1B] mt-1">
            Kits y Cursos en Maracay
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kits */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8D9CD] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#C35C1D]/15 text-[#C35C1D] flex items-center justify-center">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <MascotAvatar size={48} animate={false} />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#2A1F1B]">
                Kits para Emprendedores
              </h4>
              <p className="text-xs sm:text-sm text-[#614E45] leading-relaxed">
                Herramientas básicas seleccionadas para iniciar en repostería: boquillas de acero inoxidable, mangas reforzadas, colorantes en gel y guía de recetas base.
              </p>
            </div>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Tortas%20Alicar,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20los%20Kits%20para%20Emprendedores.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMechanicalClick('click')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] transition-colors cursor-pointer"
            >
              <span>Información</span>
              <ArrowUpRight className="w-4 h-4" />
              <MessageCircle className="w-4 h-4 ml-1 text-white/80" />
            </a>
          </div>

          {/* Cursos */}
          <div className="bg-white rounded-3xl p-7 border border-[#DCE8DE] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#507C5D]/15 text-[#507C5D] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <MascotAvatar size={48} animate={false} />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#2A1F1B]">
                Cursos de Repostería
              </h4>
              <p className="text-xs sm:text-sm text-[#614E45] leading-relaxed">
                Talleres prácticos con Yanacari: técnicas de batido, merengue resistente al calor, inyección de flores en gelatinas 3D y tequeños de hojaldre.
              </p>
            </div>

            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Tortas%20Alicar,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20los%20Cursos%20de%20Reposter%C3%ADa.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playMechanicalClick('click')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#507C5D] hover:bg-[#40684C] transition-colors cursor-pointer"
            >
              <span>Información</span>
              <ArrowUpRight className="w-4 h-4" />
              <MessageCircle className="w-4 h-4 ml-1 text-white/80" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Sección de Legales, Privacidad y Ayuda de Alicat */}
      <div className="pt-6 border-t border-[#E8DACF] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
              Políticas de Privacidad, Términos y Ayuda
            </h3>
            <p className="text-xs text-[#705C51]">
              Información clara sobre el funcionamiento del sitio y la asistencia de Alicat
            </p>
          </div>

          <button
            onClick={() => {
              playMechanicalClick('pop');
              onOpenSuggestions();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF0E6] text-[#8C461E] hover:bg-[#F6DECE] text-xs font-semibold transition-colors cursor-pointer w-fit"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Sugerencias y/o Comentarios</span>
          </button>
        </div>

        {/* Acordeón de Legales */}
        <div className="space-y-3 pt-2">
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
                className={`w-4 h-4 text-[#8C6D5B] transition-transform duration-200 ${
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
                  No compartimos ni comercializamos números de teléfono ni datos personales con terceros. Tu comunicación es directa y privada con Yanacari.
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
                className={`w-4 h-4 text-[#8C6D5B] transition-transform duration-200 ${
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

          {/* Ayuda de Alicat */}
          <div className="bg-white rounded-2xl border border-[#EBDCD0] overflow-hidden">
            <button
              onClick={() => toggleLegal('ai-help')}
              className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#2A1F1B]">
                <Bot className="w-4 h-4 text-[#E66E22]" />
                <span>Ayuda y Uso de la Mascota IA (Alicat)</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#8C6D5B] transition-transform duration-200 ${
                  openLegalSection === 'ai-help' ? 'rotate-180 text-[#C35C1D]' : ''
                }`}
              />
            </button>
            {openLegalSection === 'ai-help' && (
              <div className="px-5 pb-5 pt-1 text-xs text-[#5D4A40] leading-relaxed space-y-2 border-t border-[#F5ECE5]">
                <p>
                  <strong>Alicat</strong> es nuestra pequeña mascota asistente. Su rol es exclusivamente informativo: te ayuda a conocer los servicios, ubicarte en el sitio y responder preguntas frecuentes.
                </p>
                <p>
                  Alicat <strong>no interactúa con la base de datos de compras ni realiza cargos</strong>. Cuando quieras un presupuesto exacto o formalizar un pedido, te facilitará el enlace directo al WhatsApp de Yanacari (+58 414 461 7554).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
