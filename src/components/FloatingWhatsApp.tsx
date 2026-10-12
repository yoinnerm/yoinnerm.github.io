import React from 'react';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <a
        href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Tortas%20Alicar,%20estoy%20visitando%20su%20sitio%20web%20y%20quisiera%20pedir%20informaci%C3%B3n.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playMechanicalClick('click')}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer"
        aria-label="Contactar a Tortas Alicar por WhatsApp (+58 414 461 7554)"
        title="Contactar a Yanacari por WhatsApp (+58 414 461 7554)"
      >
        {/* Subtle breathing ripple */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 pointer-events-none" />

        <MessageCircle className="w-7 h-7" />

        {/* Desktop hover tooltip */}
        <span className="hidden md:group-hover:block absolute right-16 bg-[#2A1F1B] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 pointer-events-none animate-in fade-in duration-150">
          WhatsApp: {BUSINESS_INFO.whatsappDisplay}
        </span>
      </a>
    </div>
  );
};
