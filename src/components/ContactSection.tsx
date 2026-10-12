import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/content';
import { playMechanicalClick } from '../utils/sound';
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle, ExternalLink, Calendar, Phone, User, AlertCircle, Sparkles } from 'lucide-react';

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

  // Telephone newsletter state
  const [telefonoSub, setTelefonoSub] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMsg, setSubMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick('click');

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

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFeedbackMessage(data.message || '¡Tu consulta ha sido enviada con éxito!');
        setFormData({
          nombre: '',
          telefono: '',
          tipoEvento: 'Cumpleaños / Celebración',
          fechaEvento: '',
          horarioContacto: '9 a 13',
          mensaje: '',
        });
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Ocurrió un error al enviar el formulario.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('No se pudo conectar con el servidor. Puedes escribirnos directamente por WhatsApp.');
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick('click');

    if (!telefonoSub || telefonoSub.trim().length < 7) {
      setSubStatus('error');
      setSubMsg('Por favor ingresa un número de teléfono válido.');
      return;
    }

    setSubStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono: telefonoSub.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubStatus('success');
        setSubMsg(data.message || '¡Teléfono suscrito con éxito!');
        setTelefonoSub('');
      } else {
        setSubStatus('error');
        setSubMsg(data.error || 'No se pudo registrar la suscripción.');
      }
    } catch {
      setSubStatus('error');
      setSubMsg('Error de conexión.');
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#9E4616] text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-[#E66E22]" />
          <span>Contacto Directo</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1F1B]">
          Encargos y Consultas con Yanacari
        </h2>
        <p className="text-sm text-[#665348] leading-relaxed">
          Cuéntanos sobre tu evento o escríbenos directamente a WhatsApp para acordar sabores y porciones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#EBDCD0] space-y-5">
            <h3 className="text-xl font-serif font-bold text-[#2A1F1B]">
              Vías de Comunicación
            </h3>

            <div className="space-y-4">
              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase font-semibold text-[#8C6D5B] tracking-wider">
                    WhatsApp Preferido
                  </h4>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMechanicalClick('click')}
                    className="text-base font-bold text-[#2A1F1B] hover:text-[#C35C1D] transition-colors"
                  >
                    {BUSINESS_INFO.whatsappDisplay}
                  </a>
                  <p className="text-xs text-[#7A6153]">Atención directa y presupuestos</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C35C1D]/15 text-[#C35C1D] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase font-semibold text-[#8C6D5B] tracking-wider">
                    Correo Electrónico
                  </h4>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    onClick={() => playMechanicalClick('pop')}
                    className="text-sm sm:text-base font-bold text-[#2A1F1B] hover:text-[#C35C1D] transition-colors break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#507C5D]/15 text-[#507C5D] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase font-semibold text-[#8C6D5B] tracking-wider">
                    Ubicación del Taller
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#2A1F1B]">
                    Barrio Santa Rita, Maracay, Estado Aragua
                  </p>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMechanicalClick('pop')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C35C1D] hover:underline mt-0.5"
                  >
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Schedules */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9961A]/15 text-[#C9961A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase font-semibold text-[#8C6D5B] tracking-wider">
                    Horarios de Atención Sugeridos
                  </h4>
                  <p className="text-xs text-[#5D493E]">
                    <strong>Turno Mañana:</strong> 9:00 AM – 1:00 PM (9 a 13)
                  </p>
                  <p className="text-xs text-[#5D493E]">
                    <strong>Turno Tarde:</strong> 2:00 PM – 8:00 PM (14 a 20)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suscripción por Teléfono */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBDCD0] shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-[#2A1F1B]">
              Boletín de Novedades y Cursos
            </h4>
            <p className="text-xs text-[#6B574C]">
              Déjanos tu número de teléfono para enterarte de próximas fechas de cursos y kits de repostería.
            </p>

            {subStatus === 'success' ? (
              <div className="p-3 rounded-xl bg-[#E8F8EE] text-[#1E7841] text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{subMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={telefonoSub}
                    onChange={(e) => setTelefonoSub(e.target.value)}
                    placeholder="Tu teléfono (0414 1234567)"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#DFCEBF] bg-[#FAF8F5] text-xs text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                  />
                  <button
                    type="submit"
                    disabled={subStatus === 'loading'}
                    className="px-4 py-2 rounded-xl bg-[#C35C1D] text-white text-xs font-semibold hover:bg-[#A94B12] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </div>
                {subStatus === 'error' && (
                  <p className="text-[11px] text-[#C92A2A]">{subMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCD0] shadow-xs">
            <h3 className="text-2xl font-serif font-bold text-[#2A1F1B] mb-1">
              Formulario de Consulta
            </h3>
            <p className="text-xs text-[#665348] mb-6">
              Selecciona tu horario preferido para que Yanacari te contacte.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-[#E8F8EE] border border-[#BCE8CB] text-[#1E7841] flex items-start gap-3">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">¡Consulta Enviada!</h4>
                  <p className="text-xs mt-0.5">{feedbackMessage}</p>
                  <div className="mt-3">
                    <a
                      href={BUSINESS_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Escribir también por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-3 rounded-2xl bg-[#FDEAEA] border border-[#F8C8C8] text-[#B82424] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-xs">{feedbackMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                    Tu Nombre *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A89487] absolute left-3 top-3" />
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej. María"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#DFCEBF] bg-[#FAF8F5] text-xs sm:text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A89487] absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej. 0414 1234567"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#DFCEBF] bg-[#FAF8F5] text-xs sm:text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                    Tipo de Creación
                  </label>
                  <select
                    name="tipoEvento"
                    value={formData.tipoEvento}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#DFCEBF] bg-[#FAF8F5] text-xs sm:text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D] cursor-pointer"
                  >
                    <option value="Cumpleaños Infantil">Torta de Cumpleaños Infantil</option>
                    <option value="Cumpleaños Adulto">Torta de Cumpleaños Adulto</option>
                    <option value="Boda / 15 Años">Torta de Boda o 15 Años</option>
                    <option value="Gelatina Artística 3D">Gelatina Artística 3D</option>
                    <option value="Pasapalos & Catering">Pasapalos Dulces y Salados</option>
                    <option value="Cursos o Kits">Cursos o Kits de Emprendedor</option>
                    <option value="Otro Motivo">Otro Motivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                    Fecha del Evento
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#A89487] absolute left-3 top-3" />
                    <input
                      type="date"
                      name="fechaEvento"
                      value={formData.fechaEvento}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#DFCEBF] bg-[#FAF8F5] text-xs sm:text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                    />
                  </div>
                </div>
              </div>

              {/* Horario de Contacto Preferido */}
              <div>
                <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1.5">
                  Horario Preferido para Contactarte *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    onClick={() => playMechanicalClick('pop')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.horarioContacto === '9 a 13'
                        ? 'border-[#C35C1D] bg-[#FFF5EE] text-[#8C461E]'
                        : 'border-[#DFCEBF] hover:bg-[#FAF4EF] text-[#554339]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horarioContacto"
                      value="9 a 13"
                      checked={formData.horarioContacto === '9 a 13'}
                      onChange={handleChange}
                      className="text-[#C35C1D] focus:ring-[#C35C1D]"
                    />
                    <div>
                      <span className="block text-xs sm:text-sm font-bold">9 a 13</span>
                      <span className="block text-[11px] opacity-80">Mañana (9 AM – 1 PM)</span>
                    </div>
                  </label>

                  <label
                    onClick={() => playMechanicalClick('pop')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.horarioContacto === '14 a 20'
                        ? 'border-[#C35C1D] bg-[#FFF5EE] text-[#8C461E]'
                        : 'border-[#DFCEBF] hover:bg-[#FAF4EF] text-[#554339]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="horarioContacto"
                      value="14 a 20"
                      checked={formData.horarioContacto === '14 a 20'}
                      onChange={handleChange}
                      className="text-[#C35C1D] focus:ring-[#C35C1D]"
                    />
                    <div>
                      <span className="block text-xs sm:text-sm font-bold">14 a 20</span>
                      <span className="block text-[11px] opacity-80">Tarde (2 PM – 8 PM)</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44332A] uppercase tracking-wider mb-1">
                  Idea o Detalles del Pedido
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos el motivo, número de personas, sabores o si tienes alguna foto de referencia..."
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DFCEBF] bg-[#FAF8F5] text-xs sm:text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {status === 'submitting' ? 'Enviando consulta...' : 'Enviar Consulta a Yanacari'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
