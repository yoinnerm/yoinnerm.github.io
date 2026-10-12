import React, { useState } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { playMechanicalClick } from '../utils/sound';
import { X, ShieldCheck, FileText, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface LegalAndHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'ai-help';
}

export const LegalAndHelpModal: React.FC<LegalAndHelpModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'ai-help'>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDFB] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-[#EBDCD0] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#F0E4DA] flex items-center justify-between bg-[#FAF6F2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C35C1D]/10 text-[#C35C1D] flex items-center justify-center">
              {activeTab === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
              {activeTab === 'ai-help' && <Bot className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
                Marco Legal &amp; Guía de la Mascota
              </h3>
              <p className="text-xs text-[#7A6153]">
                Tortas Alicar &bull; Maracay, Venezuela
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playMechanicalClick('pop');
              onClose();
            }}
            className="p-2 rounded-full text-[#7A6153] hover:bg-[#EFE2D6] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex border-b border-[#F0E4DA] bg-[#FFFBF8] px-4 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => {
              playMechanicalClick('pop');
              setActiveTab('privacy');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-[#C35C1D] text-[#C35C1D]'
                : 'border-transparent text-[#6C5548] hover:text-[#2A1F1B]'
            }`}
          >
            Políticas de Privacidad
          </button>

          <button
            onClick={() => {
              playMechanicalClick('pop');
              setActiveTab('terms');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[#C35C1D] text-[#C35C1D]'
                : 'border-transparent text-[#6C5548] hover:text-[#2A1F1B]'
            }`}
          >
            Términos y Condiciones
          </button>

          <button
            onClick={() => {
              playMechanicalClick('pop');
              setActiveTab('ai-help');
            }}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai-help'
                ? 'border-[#C35C1D] text-[#C35C1D]'
                : 'border-transparent text-[#6C5548] hover:text-[#2A1F1B]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E66E22]" />
            <span>Ayuda del Uso de la Mascota IA</span>
          </button>
        </div>

        {/* Body content scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#4A3930] leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-[#2A1F1B] font-serif">
                1. Compromiso de Privacidad y Tratamiento de Datos
              </h4>
              <p>
                En <strong>Tortas Alicar</strong> valoramos profundamente la confianza de las familias que acuden a nosotros para sus fechas más significativas. Toda la información proporcionada a través de nuestros formularios (nombre, número telefónico, fechas y detalles de eventos) se utiliza exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#5E4C41]">
                <li>Contactar al cliente en su horario preferido (9:00 a 13:00 o 14:00 a 20:00).</li>
                <li>Elaborar presupuestos personalizados por WhatsApp o correo.</li>
                <li>Registrar suscripciones voluntarias a novedades en nuestro listado <code className="bg-[#FAF0E6] px-1 py-0.5 rounded text-[11px]">subscritos.txt</code>.</li>
              </ul>
              <h4 className="text-base font-bold text-[#2A1F1B] font-serif pt-2">
                2. No Comercialización de Datos
              </h4>
              <p>
                Bajo ninguna circunstancia vendemos, cedemos ni transferimos números telefónicos ni correos electrónicos a terceros o agencias de publicidad. La relación es directa y confidencial entre el cliente y Yanacari.
              </p>
              <h4 className="text-base font-bold text-[#2A1F1B] font-serif pt-2">
                3. Ejercicio de Derechos
              </h4>
              <p>
                Si deseas actualizar tu número o solicitar la eliminación de tu teléfono de nuestro archivo de suscripciones, puedes escribirnos directamente a <strong>alicartortas@gmail.com</strong> o a nuestro WhatsApp oficial (+58 414 461 7554).
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-[#2A1F1B] font-serif">
                1. Naturaleza Informativa de la Plataforma
              </h4>
              <p>
                Este sitio web funciona como una <strong>plataforma de exhibición y muestrario artesanal</strong>, no como una tienda electrónica con cobros automáticos ni pasarelas de pago. No publicamos listas de precios fijos ya que cada obra pastelera se cotiza individualmente según tamaño, porciones, ingredientes y diseño acordado.
              </p>
              <h4 className="text-base font-bold text-[#2A1F1B] font-serif pt-2">
                2. Encargos y Reservas
              </h4>
              <p>
                Todos los pedidos y acuerdos de entrega se formalizan directamente a través de WhatsApp con Yanacari. Las reservas de fecha se confirman tras la recepción del abono acordado, garantizando así la adquisición de ingredientes frescos y la asignación del tiempo de horneado en nuestro taller de Santa Rita, Maracay.
              </p>
              <h4 className="text-base font-bold text-[#2A1F1B] font-serif pt-2">
                3. Propiedad Intelectual y Fotografías
              </h4>
              <p>
                Las fotografías de tortas, gelatinas 3D, pasapalos y decoraciones expuestas corresponden al trabajo y estilo repostero de Tortas Alicar. Queda prohibida la reproducción no autorizada de dichas imágenes con fines comerciales ajenos.
              </p>
            </div>
          )}

          {activeTab === 'ai-help' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF6EE] border border-[#F5DFCF]">
                <MascotAvatar pose="greeting" size={70} />
                <div>
                  <h4 className="text-sm font-bold text-[#8C461E]">
                    Conoce a la Mascota Repostera de Alicar
                  </h4>
                  <p className="text-xs text-[#6B574C] mt-0.5">
                    Nuestra pequeña mascota es una guía informativa interactiva diseñada para ayudarte a recorrer la página y responder tus dudas.
                  </p>
                </div>
              </div>

              <h4 className="text-base font-bold text-[#2A1F1B] font-serif pt-1">
                ¿Qué funciones cumple la Mascota IA?
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#507C5D] shrink-0 mt-0.5" />
                  <span><strong>Orientación sobre el sitio:</strong> Te explica las secciones de Historia, Servicios, Galería interactiva, Cursos y Contacto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#507C5D] shrink-0 mt-0.5" />
                  <span><strong>Información de la historia familiar:</strong> Te cuenta cómo nació el emprendimiento con la abuela Alida y la continuación por Yanacari en Santa Rita.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#507C5D] shrink-0 mt-0.5" />
                  <span><strong>Detalles de especialidades:</strong> Te orienta sobre los tipos de bizcochos, pasapalos, gelatinas 3D, kits de emprendimiento y talleres.</span>
                </li>
              </ul>

              <h4 className="text-base font-bold text-[#2A1F1B] font-serif pt-2">
                Límites y Transparencia
              </h4>
              <p>
                Tal como especificó la dirección de Tortas Alicar, la mascota <strong>«solo otorga información»</strong>. No realiza cobros, no almacena favoritos ni modifica el carrito. Para realizar pedidos y recibir cotizaciones exactas, la mascota siempre te facilitará el enlace directo al WhatsApp oficial de Yanacari (+58 414 461 7554).
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0E4DA] bg-[#FAF6F2] flex items-center justify-between">
          <span className="text-[11px] text-[#8C7164]">
            Tortas Alicar &bull; Todos los derechos reservados
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
