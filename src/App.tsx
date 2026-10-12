import React, { useState } from 'react';
import { Navbar, ActiveSection } from './components/Navbar';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { HistoryValues } from './components/HistoryValues';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MascotAIChat } from './components/MascotAIChat';
import { SuggestionsModal } from './components/SuggestionsModal';
import { SitemapModal } from './components/SitemapModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('principal');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [alicatChatOpen, setAlicatChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-[#2C211D] font-sans antialiased selection:bg-[#E88B52]/20 selection:text-[#9B3E12]">
      {/* 1. Header con pestañas de navegación para las 3 secciones */}
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onOpenAlicatChat={() => setAlicatChatOpen(true)}
      />

      {/* 2. Contenido según la sección activa */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8">
        {/* SECCIÓN 1: Principal & Muestrario */}
        {activeSection === 'principal' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Resumen de bienvenida */}
            <Hero
              onGoToContact={() => {
                setActiveSection('contacto');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAlicatChat={() => setAlicatChatOpen(true)}
            />

            {/* Muestrario Interactivo deslizable */}
            <GallerySection />

            {/* Nuestros Servicios */}
            <ServicesSection />

            {/* Reseñas y Google Maps abajo */}
            <TestimonialsSection />
          </div>
        )}

        {/* SECCIÓN 2: Contacto & Formulario */}
        {activeSection === 'contacto' && (
          <div className="animate-in fade-in duration-300">
            <ContactSection />
          </div>
        )}

        {/* SECCIÓN 3: Misión, Visión & Legales */}
        {activeSection === 'nosotros' && (
          <div className="animate-in fade-in duration-300">
            <HistoryValues
              onOpenSuggestions={() => setSuggestionsOpen(true)}
            />
          </div>
        )}
      </main>

      {/* 3. Pie de página permanente */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveSection(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSuggestions={() => setSuggestionsOpen(true)}
        onOpenSitemap={() => setSitemapOpen(true)}
      />

      {/* 4. Elementos flotantes de acceso directo */}
      <MascotAIChat
        isOpen={alicatChatOpen}
        onToggle={() => setAlicatChatOpen(!alicatChatOpen)}
      />

      <FloatingWhatsApp />

      {/* 5. Modales */}
      <SuggestionsModal
        isOpen={suggestionsOpen}
        onClose={() => setSuggestionsOpen(false)}
      />

      <SitemapModal
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
      />
    </div>
  );
}
