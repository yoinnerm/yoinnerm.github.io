import React, { useState } from 'react';
import { GALLERY_ITEMS, BUSINESS_INFO } from '../data/content';
import { GalleryItem } from '../types';
import { MessageCircle, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === 'todas'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const categories = [
    { id: 'todas', label: 'Todas las Creaciones' },
    { id: 'bodas', label: 'Bodas & 15 Años' },
    { id: 'infantiles', label: 'Tortas & Pasteles' },
    { id: 'gelatinas', label: 'Gelatinas Artísticas 3D' },
    { id: 'pasapalos', label: 'Pasapalos & Catering' },
    { id: 'galletas', label: 'Galletas & Cupcakes' },
  ];

  return (
    <section id="galeria" className="py-12 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#9E4616] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Muestrario de Trabajos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1F1B] tracking-tight">
            Galería de Creaciones y Diseños
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B574C] font-normal leading-relaxed">
            Explora una selección de nuestras tortas, postres y gelatinas elaboradas artesanalmente. Haz clic en cualquier foto para ver los detalles.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C35C1D] text-white shadow-xs'
                  : 'bg-[#F9EFE7] text-[#695244] hover:bg-[#F3E2D5] hover:text-[#2A1F1B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de imágenes limpio y veloz */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#EBDCD0] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EDE7]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-[#8C461E]">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2A1F1B] group-hover:text-[#C35C1D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B574C] mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F5ECE5] flex items-center justify-between text-[11px] text-[#8C7164]">
                  <span>{item.portions}</span>
                  <span className="text-[#C35C1D] font-semibold">Ver detalle &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox de Foto */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer"
                aria-label="Cerrar vista"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-[4/3] bg-black">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase text-[#C35C1D] tracking-wider">
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2A1F1B] mt-0.5">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C493E] mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-[#7A6255]">
                  <span className="px-3 py-1 rounded-full bg-[#FAF0E6]">
                    <strong>Porciones:</strong> {selectedItem.portions}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FAF0E6]">
                    <strong>Ocasión:</strong> {selectedItem.occasion}
                  </span>
                </div>

                <div className="pt-2">
                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20me%20gust%C3%B3%20este%20dise%C3%B1o%20de%20la%20galer%C3%ADa:%20${encodeURIComponent(
                      selectedItem.title
                    )}.%20%C2%BFPodr%C3%ADas%20darme%20un%20presupuesto?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Cotizar este modelo por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
