import React, { useState } from 'react';
import { playMechanicalClick } from '../utils/sound';
import { Phone, CheckCircle2, BellRing, Sparkles } from 'lucide-react';

export const SubscribeSection: React.FC = () => {
  const [telefono, setTelefono] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick('click');

    if (!telefono || telefono.trim().length < 7) {
      setStatus('error');
      setMsg('Por favor ingresa un número de teléfono o WhatsApp válido.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono: telefono.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMsg(data.message || '¡Tu teléfono ha sido suscrito exitosamente!');
        setTelefono('');
      } else {
        setStatus('error');
        setMsg(data.error || 'No se pudo guardar la suscripción.');
      }
    } catch {
      setStatus('error');
      setMsg('Error conectando con el servidor. Intenta de nuevo.');
    }
  };

  return (
    <section className="py-14 bg-gradient-to-r from-[#FFF5ED] via-[#FFF9F5] to-[#FFF5ED] border-t border-[#F2DFCE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#9E4616] text-xs font-semibold uppercase tracking-wider shadow-2xs border border-[#F2DECE]">
          <BellRing className="w-3.5 h-3.5 text-[#E66E22]" />
          <span>Boletín Artesanal por WhatsApp / SMS</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1F1B]">
            Suscríbete con tu número de teléfono
          </h3>
          <p className="text-xs sm:text-sm text-[#665348] max-w-xl mx-auto leading-relaxed">
            Recibe avisos exclusivos sobre nuevas fechas de talleres y cursos, kits para emprendedores y creaciones especiales para temporadas festivas. (Guardado en <code className="bg-white/80 px-1 py-0.5 rounded border border-[#E8D2C2] text-[11px]">subscritos.txt</code>)
          </p>
        </div>

        {status === 'success' ? (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#E8F8EE] border border-[#BCE8CB] text-[#1E7841] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{msg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-[#A89487] absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Tu número (Ej. 0414 1234567)"
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-[#DFC9BA] bg-white text-sm text-[#2A1F1B] focus:outline-none focus:border-[#C35C1D] focus:ring-1 focus:ring-[#C35C1D] shadow-xs"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#C35C1D] hover:bg-[#A94B12] shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{status === 'loading' ? 'Guardando...' : 'Suscribirme'}</span>
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-[#C92A2A] font-medium">{msg}</p>
            )}
            <p className="text-[11px] text-[#8C7164]">
              Sin spam. Solo información útil y dulce de Tortas Alicar.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
