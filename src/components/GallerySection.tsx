import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_ITEMS, BUSINESS_INFO } from '../data/content';
import { GalleryItem } from '../types';
import { playMechanicalClick } from '../utils/sound';
import { ChevronLeft, ChevronRight, Maximize2, X, MessageCircle, Sparkles, Pause, Play } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Filter items
  const filteredItems =
    selectedCategory === 'todas'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Auto sliding carousel effect like in user's example
  useEffect(() => {
    if (isAutoPlaying && filteredItems.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      }, 3800);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, filteredItems.length]);

  const handlePrev = () => {
    playMechanicalClick('click');
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    playMechanicalClick('click');
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handleCategoryChange = (category: string) => {
    playMechanicalClick('pop');
    setSelectedCategory(category);
    setActiveIndex(0);
  };

  const openLightbox = (item: GalleryItem) => {
    playMechanicalClick('pop');
    setSelectedItem(item);
  };

  const categories = [
    { id: 'todas', label: 'Todas las Creaciones' },
    { id: 'bodas', label: 'Bodas & 15 Años' },
    { id: 'infantiles', label: 'Tortas & Pasteles' },
    { id: 'gelatinas', label: 'Gelatinas Artísticas 3D' },
    { id: 'pasapalos', label: 'Pasapalos & Catering' },
    { id: 'galletas', label: 'Galletas & Cupcakes' },
  ];

  return (
    <section id="galeria" className="py-20 bg-[#FFFDFB] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#9E4616] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
            <span>Muestrario Interactivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1F1B] tracking-tight">
            Galería de Creaciones y Estilos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B574C] font-normal leading-relaxed">
            Desliza para contemplar nuestros diseños artesanales. Cada pieza es irrepetible y elaborada con dedicación para cada familia.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C35C1D] text-white shadow-sm'
                  : 'bg-[#F9EFE7] text-[#695244] hover:bg-[#F3E2D5] hover:text-[#2A1F1B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Auto-Sliding Card Carousel (as requested) */}
        <div
          className="relative max-w-5xl mx-auto py-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-2 sm:left-4 z-20 flex items-center">
            <button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-[#ECD9CC] flex items-center justify-center text-[#3B2920] hover:text-[#C35C1D] hover:bg-white transition-all transform hover:scale-105 cursor-pointer"
              aria-label="Anterior creación"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-2 sm:right-4 z-20 flex items-center">
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-[#ECD9CC] flex items-center justify-center text-[#3B2920] hover:text-[#C35C1D] hover:bg-white transition-all transform hover:scale-105 cursor-pointer"
              aria-label="Siguiente creación"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Cards Track */}
          <div className="relative h-[480px] sm:h-[540px] flex items-center justify-center">
            {filteredItems.map((item, index) => {
              // Calculate relative distance from active index
              const count = filteredItems.length;
              let diff = (index - activeIndex) % count;
              if (diff > count / 2) diff -= count;
              if (diff < -count / 2) diff += count;

              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;
              const isVisible = Math.abs(diff) <= 2;

              if (!isVisible) return null;

              // Transform styles for 3D card deck
              let transformClass = 'opacity-0 pointer-events-none scale-75';
              let zIndex = 1;

              if (isActive) {
                transformClass = 'opacity-100 scale-100 translate-x-0 z-30 shadow-2xl';
                zIndex = 30;
              } else if (isPrev) {
                transformClass = 'opacity-60 scale-85 -translate-x-28 sm:-translate-x-60 z-10 blur-[0.5px]';
                zIndex = 10;
              } else if (isNext) {
                transformClass = 'opacity-60 scale-85 translate-x-28 sm:translate-x-60 z-10 blur-[0.5px]';
                zIndex = 10;
              } else if (diff === -2) {
                transformClass = 'opacity-20 scale-70 -translate-x-48 sm:-translate-x-96 z-0';
                zIndex = 5;
              } else if (diff === 2) {
                transformClass = 'opacity-20 scale-70 translate-x-48 sm:translate-x-96 z-0';
                zIndex = 5;
              }

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isActive) {
                      openLightbox(item);
                    } else {
                      playMechanicalClick('pop');
                      setActiveIndex(index);
                    }
                  }}
                  style={{ zIndex }}
                  className={`absolute w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] transition-all duration-700 ease-out cursor-pointer ${transformClass}`}
                >
                  <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#EBD6C7] shadow-xl flex flex-col group">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F8EFE9]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                      {/* Top category label */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#8C461E] uppercase tracking-wider">
                        {item.categoryLabel}
                      </div>

                      {/* Zoom trigger icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(item);
                        }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                        title="Ver detalles"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Bottom Title inside photo */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/90 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer details */}
                    <div className="p-5 bg-white space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-[#FFF3EA] text-[#8C461E] text-[11px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#F2E4D8] flex items-center justify-between">
                        <span className="text-xs text-[#7A6153] italic font-serif">
                          Personalizado por Yanacari
                        </span>
                        <a
                          href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20vi%20la%20creaci%C3%B3n%20"${encodeURIComponent(
                            item.title
                          )}"%20en%20su%20galer%C3%ADa%20y%20me%20gustar%C3%ADa%20consultar%20un%20dise%C3%B1o%20similar.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            playMechanicalClick('click');
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#1EA851] transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Consultar por WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicators & Autoplay Toggle Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => {
                playMechanicalClick('pop');
                setIsAutoPlaying(!isAutoPlaying);
              }}
              className="p-1.5 rounded-full text-[#8C6D5B] hover:text-[#C35C1D] hover:bg-[#F8EFEA] transition-colors cursor-pointer"
              title={isAutoPlaying ? 'Pausar deslizamiento automático' : 'Activar deslizamiento automático'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1.5">
              {filteredItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    playMechanicalClick('pop');
                    setActiveIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? 'w-6 bg-[#C35C1D]' : 'w-2 bg-[#DDCBBE] hover:bg-[#B89F8F]'
                  }`}
                  aria-label={`Ir a tarjeta ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-xs text-[#8C7164]">
              {activeIndex + 1} / {filteredItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image section */}
            <div className="md:w-3/5 bg-black relative flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full max-h-[500px] object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:hidden w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info details section */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-[#FFFDFB]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FFF0E4] text-[#8C461E] text-xs font-semibold uppercase">
                    {selectedItem.categoryLabel}
                  </span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="hidden md:flex p-1 rounded-full text-[#7A6153] hover:bg-[#F2E5DB] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#2A1F1B]">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D4B40] leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#FAF3EC] border border-[#ECD9CC] text-xs space-y-1">
                  <span className="font-semibold text-[#8C461E]">Detalles de preparación:</span>
                  <p className="text-[#635044]">{selectedItem.details}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2E4D8] space-y-2">
                <a
                  href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20estoy%20viendo%20el%20dise%C3%B1o%20de%20"${encodeURIComponent(
                    selectedItem.title
                  )}"%20y%20quisiera%20pedir%20presupuesto%20para%20mi%20evento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playMechanicalClick('click')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-2 text-xs font-medium text-[#7E6557] hover:text-[#2A1F1B] transition-colors cursor-pointer"
                >
                  Cerrar ventana
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
