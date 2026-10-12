import React from 'react';
import { BUSINESS_INFO } from '../data/content';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Contacto directo de WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20te%20escribo%20desde%20la%20p%C3%A1gina%20web%20para%20hacer%20un%20pedido.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a Yanacari"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all group"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-xs font-bold hidden sm:inline">WhatsApp Yanacari</span>
      </a>
    </aside>
  );
};
