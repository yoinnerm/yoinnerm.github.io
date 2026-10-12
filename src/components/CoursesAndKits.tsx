import React from 'react';
import { MascotAvatar } from './MascotAvatar';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { GraduationCap, PackageCheck, MessageCircle, Sparkles, Check, ArrowUpRight } from 'lucide-react';

export const CoursesAndKits: React.FC = () => {
  return (
    <section id="cursos-kits" className="py-20 bg-gradient-to-b from-[#FAF7F2] to-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0E2] text-[#9E4616] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
            <span>Aprende y Emprende con Alicar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1F1B] tracking-tight">
            Kits para Emprendedores &amp; Cursos de Repostería
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#665348] font-normal leading-relaxed">
            Compartimos el saber tradicional de cuatro décadas para que inicies tu propio camino dulce o perfecciones tus habilidades en la repostería artesanal.
          </p>
        </div>

        {/* Two Featured Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* 1. Kits para Emprendedores */}
          <div className="bg-gradient-to-br from-[#FFF5EC] to-[#FFFFFF] rounded-3xl p-8 sm:p-10 border border-[#F3DEC8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Background flourish */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#FFE8D6]/50 rounded-full blur-2xl pointer-events-none -z-0" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#C35C1D]/15 text-[#C35C1D] flex items-center justify-center">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <div className="shrink-0 bg-white rounded-2xl p-1 shadow-xs border border-[#F5E2D3]">
                  <MascotAvatar pose="cupcake" size={56} />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9E4616]">
                  Emprendimiento Dulce
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1F1B] mt-1">
                  Kits para Emprendedores
                </h3>
                <p className="mt-3 text-sm text-[#5C4A40] leading-relaxed">
                  Todo lo necesario para comenzar tu propio negocio de pasteles y postres desde casa. Seleccionamos cuidadosamente las herramientas, mangas, boquillas y colorantes con las que trabajamos diariamente en nuestro taller.
                </p>
              </div>

              {/* Inclusions list */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Set de boquillas profesionales de acero inoxidable</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Mangas pasteleras reforzadas y adaptadores</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Colorantes en gel de alta concentración</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Guía impresa de proporciones y recetas base de la familia</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp "Información" Button as requested */}
            <div className="relative z-10 pt-8 mt-6 border-t border-[#F3DEC8]">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Tortas%20Alicar,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20los%20Kits%20para%20Emprendedores.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('click')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Información</span>
                <ArrowUpRight className="w-4 h-4" />
                <MessageCircle className="w-4 h-4 ml-1 text-white/80" />
              </a>
              <p className="text-[11px] text-center text-[#8C7164] mt-2">
                Te responderemos directamente por WhatsApp con disponibilidad y detalles
              </p>
            </div>
          </div>

          {/* 2. Cursos de Repostería */}
          <div className="bg-gradient-to-br from-[#F5F8F5] to-[#FFFFFF] rounded-3xl p-8 sm:p-10 border border-[#DCE8DE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            {/* Background flourish */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#E2F0E5]/50 rounded-full blur-2xl pointer-events-none -z-0" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#507C5D]/15 text-[#507C5D] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="shrink-0 bg-white rounded-2xl p-1 shadow-xs border border-[#DCE8DE]">
                  <MascotAvatar pose="thinking" size={56} />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#416B4E]">
                  Capacitación Presencial &amp; Práctica
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1F1B] mt-1">
                  Cursos de Repostería
                </h3>
                <p className="mt-3 text-sm text-[#5C4A40] leading-relaxed">
                  Aprende desde cero o perfecciona tu técnica de la mano de Yanacari. Talleres intensivos con grupos reducidos en Maracay enfocados en la práctica real sobre el bizcocho y el manejo de la manga.
                </p>
              </div>

              {/* Modules list */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Técnicas de batido perfecto y bizcochos húmedos sin colapso</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Merengue italiano y suizo resistente al calor tropical</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Inyección artística de flores 3D en gelatinas encapsuladas</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4E3E34]">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5EC] text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Tequeños de hojaldre crocantes y pasapalos festivos</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp "Información" Button as requested */}
            <div className="relative z-10 pt-8 mt-6 border-t border-[#DCE8DE]">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Tortas%20Alicar,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20los%20Cursos%20de%20Reposter%C3%ADa.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick('click')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#507C5D] hover:bg-[#40684C] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Información</span>
                <ArrowUpRight className="w-4 h-4" />
                <MessageCircle className="w-4 h-4 ml-1 text-white/80" />
              </a>
              <p className="text-[11px] text-center text-[#8C7164] mt-2">
                Consulta próximas fechas de talleres y cupos disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
