import React, { useState } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/content';
import { Menu, X, MessageCircle, MapPin } from 'lucide-react';

export type ActiveSection = 'principal' | 'contacto' | 'nosotros';

interface NavbarProps {
  activeSection: ActiveSection;
  onSectionChange: (sec: ActiveSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navSections = [
    { id: 'principal' as ActiveSection, label: 'Principal & Muestrario' },
    { id: 'contacto' as ActiveSection, label: 'Contacto & Encargos' },
    { id: 'nosotros' as ActiveSection, label: 'Misión, Visión & Legales' },
  ];

  const handleSelectSection = (sec: ActiveSection) => {
    onSectionChange(sec);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#F0E6DE] py-2 sm:py-3 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top mini row */}
        <div className="hidden sm:flex items-center justify-between border-b border-[#F4EBE3] pb-1.5 mb-2 text-xs text-[#7A6255]">
          <div className="flex items-center gap-3">
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#C35C1D] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C35C1D]" />
              <span>Santa Rita, Maracay, Venezuela</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#8C6D5B]">
            <span>Atención personalizada por Yanacari</span>
            <span className="text-[#DAC8BC]">&bull;</span>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="hover:text-[#C35C1D] transition-colors"
            >
              {BUSINESS_INFO.email}
            </a>
          </div>
        </div>

        {/* Main row */}
        <div className="flex items-center justify-between">
          {/* Logo brand */}
          <button
            onClick={() => handleSelectSection('principal')}
            className="group focus:outline-none cursor-pointer flex items-center"
            aria-label="Tortas Alicar - Volver a la portada"
          >
            <Logo size="md" variant="color" showSubtitle={true} />
          </button>

          {/* Desktop 3-section Segmented Tabs */}
          <nav className="hidden md:flex items-center bg-[#FAF3EC] p-1 rounded-full border border-[#EBDAD0]">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSelectSection(sec.id)}
                className={`px-4 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-[#C35C1D] text-white shadow-xs'
                    : 'text-[#614E44] hover:text-[#2A1F1B] hover:bg-[#F3E7DC]'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Right Action: WhatsApp */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20quisiera%20pedir%20informaci%C3%B3n%20sobre%20sus%20tortas.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3E3029] hover:bg-[#F8EFEA] cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C35C1D]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDFB] border-b border-[#EBDCD2] px-4 pt-3 pb-5 shadow-xl">
          <div className="space-y-1.5 pb-3 border-b border-[#F0E4DA]">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSelectSection(sec.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === sec.id
                    ? 'bg-[#C35C1D] text-white'
                    : 'text-[#4A3A31] hover:bg-[#FDF4EE]'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="pt-3">
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20deseo%20comunicarme%20por%20WhatsApp.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#25D366]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp (+58 414 461 7554)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
