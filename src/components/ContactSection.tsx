import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle, Calendar, Phone, User, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    tipoEvento: 'Cumpleaños / Celebración',
    fechaEvento: '',
    horarioContacto: '9 a 13' as '9 a 13' | '14 a 20',
    mensaje: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.telefono.trim()) {
      setStatus('error');
      setFeedbackMessage('Por favor completa tu nombre y número de teléfono.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStatus('success');
          setFeedbackMessage(data.message || '¡Tu consulta ha sido enviada con éxito!');
        } else {
          throw new Error(data.error || 'Error procesando solicitud');
        }
      } else {
        throw new Error('Static host fallback');
      }
    } catch {
      // Offline o Static Host (GitHub Pages): Guardado local
      try {
        const saved = JSON.parse(localStorage.getItem('alicar_consultas') || '[]');
        saved.unshift({
          ...formData,
          fecha: new Date().toISOString(),
        });
        localStorage.setItem('alicar_consultas', JSON.stringify(saved));
      } catch {
        // Ignorar si localStorage no está disponible
      }

      setStatus('success');
      setFeedbackMessage(
        '¡Gracias por tu mensaje! Hemos registrado tu solicitud. Para una respuesta inmediata, también puedes abrir WhatsApp con los datos ya listos.'
      );
    }
  };

  // WhatsApp prefilled URL
  const whatsappPrefillUrl = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Hola Yanacari, te escribo desde la página web de Tortas Alicar.
Mi nombre: ${formData.nombre || 'Cliente'}
Teléfono: ${formData.telefono || 'Por coordinar'}
Evento: ${formData.tipoEvento}
Fecha del evento: ${formData.fechaEvento || 'Por definir'}
Horario preferido: ${formData.horarioContacto}
Mensaje: ${formData.mensaje || 'Quisiera consultar disponibilidad y presupuesto.'}`
  )}`;

  return (
    <div className="py-6 space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#9E4616] text-xs font-semibold uppercase tracking-wider">
          <span>Contacto Directo</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1F1B]">
          Encargos y Presupuestos
        </h2>
        <p className="text-sm sm:text-base text-[#665348] max-w-2xl mx-auto leading-relaxed">
          Cuéntanos sobre tu evento o la torta que imaginas. Puedes dejarnos tus datos en el formulario o escribir directamente a Yanacari por WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCD0] shadow-xs">
          <h3 className="text-xl font-serif font-bold text-[#2A1F1B] mb-2">
            Formulario de Encargo / Consulta
          </h3>
          <p className="text-xs text-[#7A6153] mb-6">
            Te responderemos en el horario que nos indiques.
          </p>

          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-4 animate-in fade-in">
              <CheckCircle className="w-12 h-12 text-[#16A34A] mx-auto" />
              <h4 className="text-lg font-bold text-[#166534]">¡Consulta Recibida!</h4>
              <p className="text-xs sm:text-sm text-[#14532D] leading-relaxed">
                {feedbackMessage}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={whatsappPrefillUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar también por WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      nombre: '',
                      telefono: '',
                      tipoEvento: 'Cumpleaños / Celebración',
                      fechaEvento: '',
                      horarioContacto: '9 a 13',
                      mensaje: '',
                    });
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#4A3931] bg-white border border-[#D5C2B4] hover:bg-[#F9EFE7] transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2 text-xs text-[#991B1B]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                  Tu Nombre y Apellido *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A89182] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej. María Pérez"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] focus:ring-1 focus:ring-[#C35C1D] text-xs text-[#2A1F1B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                  Número de Teléfono / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#A89182] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej. +58 414 1234567"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] focus:ring-1 focus:ring-[#C35C1D] text-xs text-[#2A1F1B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                    Tipo de Evento
                  </label>
                  <select
                    name="tipoEvento"
                    value={formData.tipoEvento}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] text-xs text-[#2A1F1B] bg-white outline-none"
                  >
                    <option value="Cumpleaños / Celebración">Cumpleaños / Celebración</option>
                    <option value="Boda / Matrimonio">Boda / Matrimonio</option>
                    <option value="15 Años">15 Años</option>
                    <option value="Bautizo / Primera Comunión">Bautizo / Primera Comunión</option>
                    <option value="Gelatinas 3D Solicitud">Gelatinas 3D</option>
                    <option value="Pasapalos y Dulces">Pasapalos y Dulces</option>
                    <option value="Cursos / Talleres">Cursos de Repostería</option>
                    <option value="Otro">Otro requerimiento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                    Fecha del Evento
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#A89182] absolute left-3.5 top-3" />
                    <input
                      type="date"
                      name="fechaEvento"
                      value={formData.fechaEvento}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] text-xs text-[#2A1F1B] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                  Horario Preferido para Contactarte
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                      formData.horarioContacto === '9 a 13'
                        ? 'border-[#C35C1D] bg-[#FFF6EE] text-[#8C461E] font-semibold'
                        : 'border-[#E2D2C6] bg-white text-[#5F4C41]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horarioContacto"
                      value="9 a 13"
                      checked={formData.horarioContacto === '9 a 13'}
                      onChange={handleChange}
                      className="text-[#C35C1D]"
                    />
                    <span>9:00 a 13:00 (Mañana)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer ${
                      formData.horarioContacto === '14 a 20'
                        ? 'border-[#C35C1D] bg-[#FFF6EE] text-[#8C461E] font-semibold'
                        : 'border-[#E2D2C6] bg-white text-[#5F4C41]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horarioContacto"
                      value="14 a 20"
                      checked={formData.horarioContacto === '14 a 20'}
                      onChange={handleChange}
                      className="text-[#C35C1D]"
                    />
                    <span>14:00 a 20:00 (Tarde)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A382F] mb-1">
                  Detalles del Pastel o Requerimiento
                </label>
                <textarea
                  name="mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Ej. Cantidad estimada de porciones, temática, sabores preferidos..."
                  className="w-full p-3 rounded-xl border border-[#DBC8BC] focus:border-[#C35C1D] text-xs text-[#2A1F1B] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{status === 'submitting' ? 'Enviando consulta...' : 'Enviar Solicitud'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Canales de Contacto Directo */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#EBDCD0] space-y-5">
            <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
              Atención Directa
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6153] block">WhatsApp Oficial:</span>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#2A1F1B] hover:text-[#25D366] transition-colors"
                  >
                    {BUSINESS_INFO.whatsappDisplay}
                  </a>
                  <p className="text-[11px] text-[#8C7164] mt-0.5">
                    Respuesta rápida para coordinar presupuestos y fechas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C35C1D]/10 text-[#C35C1D] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6153] block">Correo Electrónico:</span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="font-bold text-[#2A1F1B] hover:text-[#C35C1D] transition-colors underline break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#507C5D]/10 text-[#507C5D] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6153] block">Horarios de Atención:</span>
                  <p className="font-semibold text-[#2A1F1B]">
                    Lunes a Sábado: 9:00 - 13:00 / 14:00 - 20:00
                  </p>
                  <p className="text-[11px] text-[#8C7164]">
                    Domingos: Solo entregas previamente agendadas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D67C3B]/10 text-[#D67C3B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6153] block">Ubicación del Taller:</span>
                  <p className="font-semibold text-[#2A1F1B]">
                    Barrio Santa Rita, Maracay, Estado Aragua
                  </p>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#C35C1D] hover:underline font-semibold inline-block mt-1"
                  >
                    Abrir en Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}?text=Hola%20Yanacari,%20quiero%20hacer%20un%20encargo%20directamente.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escribir directamente por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
