import React from 'react';
import {
  ShoppingBag,
  Sparkles,
  HelpCircle,
  Truck,
  CreditCard,
  MessageCircle,
  Package,
  Award,
} from 'lucide-react';
import { ALICAR_PRODUCTS, ALICAR_STORE_INFO } from '../data/alicarData';
import { ProductItem } from '../types/chat';

interface Props {
  onAskAboutProduct: (prompt: string) => void;
}

export const CatalogExplorer: React.FC<Props> = ({ onAskAboutProduct }) => {
  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
        <div>
          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Base de Conocimiento de Alicat
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
            Catálogo &amp; Políticas de Alicar Tienda
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Esta es la información oficial de tu sitio <b>yoinnerm.github.io</b> con la que Alicat asesora a tus clientes.
          </p>
        </div>

        <button
          onClick={() =>
            onAskAboutProduct(
              'Alicat, por favor hazme un resumen completo de todos los productos y kits que vendemos en la tienda.'
            )
          }
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:from-pink-600 hover:to-rose-600 transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Resumen General por Alicat</span>
        </button>
      </div>

      {/* Payment and Shipping Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping Card */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
            <Truck className="w-5 h-5" />
            <span>Envíos y Despachos Nacionales</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {ALICAR_STORE_INFO.shipping}. Se embalan con protección especializada para que moldes, colorantes y cajas de repostería lleguen en perfecto estado.
          </p>
          <button
            onClick={() =>
              onAskAboutProduct(
                '¿Cómo gestiona Alicar Tienda los envíos a ciudades como Valencia, Maracaibo, Barquisimeto o Caracas, y cuánto tardan aproximadamente?'
              )
            }
            className="text-xs text-pink-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Consultar envíos con Alicat →</span>
          </button>
        </div>

        {/* Payments Card */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-sm">
            <CreditCard className="w-5 h-5" />
            <span>Métodos de Pago Aceptados</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {ALICAR_STORE_INFO.payments.map((p, i) => (
              <div key={i} className="bg-purple-50/50 p-2 rounded-xl border border-purple-100/60">
                <span className="mr-1.5">{p.icon}</span>
                <b className="text-gray-800">{p.name}:</b>
                <span className="text-gray-500 text-[11px] block">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-pink-500" />
            Productos &amp; Kits Destacados
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            {ALICAR_PRODUCTS.length} productos configurados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALICAR_PRODUCTS.map((prod: ProductItem) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-4 border border-pink-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="h-28 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition">
                  {prod.icon}
                </div>

                <div className="flex items-center justify-between text-[11px] text-pink-600 font-medium mb-1">
                  <span>{prod.category}</span>
                  {prod.tag && (
                    <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {prod.tag}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm text-gray-900 leading-snug">
                  {prod.name}
                </h4>

                <p className="text-xs text-gray-500 mt-1.5 line-clamp-3 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block text-[10px]">Precio</span>
                  <span className="text-base font-black text-pink-600">
                    ${prod.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={() =>
                    onAskAboutProduct(
                      `Cuéntame en detalle sobre el producto "${prod.name}" ($${prod.price.toFixed(
                        2
                      )}), qué incluye, para qué recetas sirve y por qué me conviene comprarlo.`
                    )
                  }
                  className="bg-pink-50 hover:bg-pink-100 text-pink-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Preguntar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
