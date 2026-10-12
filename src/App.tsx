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
import { SuggestionsModal } from './components/SuggestionsModal';
import { SitemapModal } from './components/SitemapModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('principal');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-[#2C211D] font-sans antialiased selection:bg-[#E88B52]/20 selection:text-[#9B3E12]">
      {/* 1. Barra de navegación limpia con 3 secciones */}
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* 2. Contenido según la pestaña seleccionada */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8">
        {/* SECCIÓN 1: Principal & Muestrario */}
        {activeSection === 'principal' && (
          <div className="space-y-12">
            {/* Bienvenida y resumen */}
            <Hero
              onGoToContact={() => {
                setActiveSection('contacto');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Muestrario de creaciones */}
            <GallerySection />

            {/* Nuestros Servicios */}
            <ServicesSection />

            {/* Reseñas y Google Maps */}
            <TestimonialsSection />
          </div>
        )}

        {/* SECCIÓN 2: Contacto & Formulario */}
        {activeSection === 'contacto' && (
          <div>
            <ContactSection />
          </div>
        )}

        {/* SECCIÓN 3: Misión, Visión & Legales */}
        {activeSection === 'nosotros' && (
          <div>
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

      {/* 4. Botón flotante directo de WhatsApp */}
      <FloatingWhatsApp />

      {/* 5. Modales ligeros */}
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
