import React, { useState } from 'react';
import {
  Copy,
  Check,
  Code,
  Sparkles,
  FileCode,
  Layers,
  ExternalLink,
  Github,
  CheckCircle2,
  BookOpen,
  Server,
  Cloud,
  HardDrive,
  ShieldCheck,
  AlertCircle,
  Terminal,
} from 'lucide-react';

export const EmbedGuide: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [copiedPhp, setCopiedPhp] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [accentColor, setAccentColor] = useState('#ec4899');
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const [activeHostingTab, setActiveHostingTab] = useState<'cloudrun' | 'vps' | 'cpanel' | 'free'>('cloudrun');

  // Production Google Cloud Run URL for this applet
  const cloudRunUrl = 'https://ais-pre-xhivq3lnm52jpdlk56tzkd-717711680851.us-west2.run.app';
  const defaultOrigin = typeof window !== 'undefined' && window.location.origin.includes('localhost')
    ? cloudRunUrl
    : (typeof window !== 'undefined' ? window.location.origin : cloudRunUrl);

  const [customBackendUrl, setCustomBackendUrl] = useState(defaultOrigin);

  // The ready-to-paste script for yoinnerm.github.io
  const scriptSnippet = `<!-- ============================================ -->
<!-- 🐱 CHATBOT ALICAT PARA ALICAR TIENDA (GitHub Pages) -->
<!-- Copia y pega esto antes de </body> en tu index.html -->
<!-- ============================================ -->
<div id="alicat-widget-root"></div>
<script>
(function() {
  const ALICAT_CONFIG = {
    appUrl: "${customBackendUrl}",
    primaryColor: "${accentColor}",
    position: "${position}",
    greeting: "¡Hola! Soy Alicat 🐱 ¿en qué dulce proyecto te ayudo hoy?"
  };

  // 1. Crear botón flotante
  const btn = document.createElement("button");
  btn.id = "alicat-bubble-btn";
  btn.innerHTML = '<span style="font-size:24px;margin-right:6px">🐱</span><span style="font-weight:700;font-size:13px">¡Pregúntale a Alicat! 💗</span>';
  btn.style.cssText = "position:fixed;bottom:20px;${position}:20px;z-index:999999;background:linear-gradient(135deg, ${accentColor}, #9333ea);color:white;border:none;border-radius:30px;padding:12px 20px;box-shadow:0 8px 24px rgba(236,72,153,0.35);cursor:pointer;display:flex;align-items:center;font-family:system-ui,-apple-system,sans-serif;transition:transform 0.2s;";
  btn.onmouseover = () => btn.style.transform = "scale(1.05)";
  btn.onmouseout = () => btn.style.transform = "scale(1)";

  // 2. Crear ventana modal iframe
  const frameWrap = document.createElement("div");
  frameWrap.id = "alicat-modal-wrap";
  frameWrap.style.cssText = "display:none;position:fixed;bottom:80px;${position}:20px;width:370px;height:520px;max-width:calc(100vw - 30px);max-height:calc(100vh - 100px);z-index:999999;box-shadow:0 12px 40px rgba(0,0,0,0.25);border-radius:24px;overflow:hidden;border:1px solid #fbcfe8;background:white;";
  
  const iframe = document.createElement("iframe");
  iframe.src = ALICAT_CONFIG.appUrl;
  iframe.style.cssText = "width:100%;height:100%;border:none;";
  iframe.title = "Alicat AI - Asistente de Alicar Tienda";
  frameWrap.appendChild(iframe);

  btn.onclick = () => {
    const isHidden = frameWrap.style.display === "none";
    frameWrap.style.display = isHidden ? "block" : "none";
    btn.innerHTML = isHidden 
      ? '<span style="font-size:22px;margin-right:6px">✖</span><span style="font-weight:700;font-size:13px">Cerrar Alicat</span>'
      : '<span style="font-size:24px;margin-right:6px">🐱</span><span style="font-weight:700;font-size:13px">¡Pregúntale a Alicat! 💗</span>';
  };

  document.body.appendChild(frameWrap);
  document.body.appendChild(btn);
})();
</script>`;

  const iframeSnippet = `<!-- Incrustar Chatbot en una sección completa de tu página -->
<iframe 
  src="${customBackendUrl}" 
  width="100%" 
  height="600" 
  style="border: 1px solid #fbcfe8; border-radius: 20px; box-shadow: 0 10px 30px rgba(236,72,153,0.15);"
  title="Alicat AI - Asistente Repostero">
</iframe>`;

  const phpSnippet = `<?php
// chat-proxy.php (Para hosting tradicional cPanel / PHP)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$apiKey = getenv('GEMINI_API_KEY') ?: 'TU_GEMINI_API_KEY_AQUI';
$input = json_decode(file_get_contents('php://input'), true);

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=" . $apiKey;

$data = [
    "contents" => array_map(function($m) {
        return [
            "role" => ($m['role'] === 'user' ? 'user' : 'model'),
            "parts" => [["text" => $m['content']]]
        ];
    }, $input['messages'] ?? []),
    "systemInstruction" => [
        "parts" => [["text" => $input['systemInstruction'] ?? "Eres Alicat de Alicar Tienda."]]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
curl_close($ch);

$resData = json_decode($response, true);
$reply = $resData['candidates'][0]['content']['parts'][0]['text'] ?? '¡Miau! Error al procesar.';
echo json_encode(['reply' => $reply]);
?>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'script') {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else if (type === 'iframe') {
      setCopiedIframe(true);
      setTimeout(() => setCopiedIframe(false), 2000);
    } else if (type === 'php') {
      setCopiedPhp(true);
      setTimeout(() => setCopiedPhp(false), 2000);
    } else if (type === 'env') {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2000);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* SECTION 1: RESPUESTA DIRECTA A DÓNDE ESTÁ ALOJADA Y TU PROPIO HOSTING */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Server className="w-3.5 h-3.5" />
              Arquitectura &amp; Alojamiento
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              ¿Dónde queda alojada la app? ¿La puedo alojar en mi hosting?
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              <b>¡Sí, tienes total libertad!</b> Actualmente la app ya está alojada y funcionando en <b>Google Cloud Run</b>, pero también puedes moverla o alojarla en tu propio hosting cuando quieras.
            </p>
          </div>
        </div>

        {/* Status Box */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Alojamiento actual (Ya activo y listo para usar)
            </div>
            <p className="text-white/80 text-[11px] mt-1 font-mono truncate">
              {cloudRunUrl}
            </p>
            <span className="text-[10px] text-purple-200 block mt-1">
              Servidor Cloud Run de Google (24/7 sin costo adicional)
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <div className="flex items-center gap-2 font-bold text-pink-300">
              <ShieldCheck className="w-4 h-4" />
              Tu sitio web principal
            </div>
            <p className="text-white/80 text-[11px] mt-1 font-mono">
              https://yoinnerm.github.io/
            </p>
            <span className="text-[10px] text-pink-200 block mt-1">
              GitHub Pages (Frontend estático)
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: EXPLICACIÓN TÉCNICA CLARA */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-md space-y-4">
        <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-pink-600" />
          ¿Cómo funciona la conexión entre tu hosting y el chatbot?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
            <div className="text-xl mb-1">1️⃣ Tu Página Web</div>
            <b className="text-pink-900 block mb-1">GitHub Pages (yoinnerm.github.io)</b>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              GitHub Pages aloja solo archivos estáticos (HTML, CSS y JS). Aquí se coloca el botón flotante del chat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
            <div className="text-xl mb-1">2️⃣ El Backend Seguro</div>
            <b className="text-purple-900 block mb-1">Servidor Node.js (Cloud Run o tu Hosting)</b>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Es necesario un servidor backend para guardar de forma 100% segura tu <code className="bg-purple-100 px-1 rounded">GEMINI_API_KEY</code> sin exponerla a extraños en el navegador.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="text-xl mb-1">3️⃣ Google Gemini AI</div>
            <b className="text-emerald-900 block mb-1">Modelo gemini-3.8-flash</b>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Procesa las preguntas con la personalidad de Alicat y envía las respuestas en tiempo real a tus clientes.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: TUS OPCIONES DE HOSPEDAJE */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <Cloud className="w-5 h-5 text-indigo-600" />
              Elige cómo quieres alojarlo
            </h3>
            <p className="text-xs text-gray-500">
              Selecciona tu escenario preferido para ver las instrucciones exactas:
            </p>
          </div>

          {/* Subtabs for Hosting Types */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveHostingTab('cloudrun')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeHostingTab === 'cloudrun'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚀 Dejarlo en Cloud Run (Fácil)
            </button>
            <button
              onClick={() => setActiveHostingTab('free')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeHostingTab === 'free'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚡ Render / Vercel (Gratis)
            </button>
            <button
              onClick={() => setActiveHostingTab('vps')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeHostingTab === 'vps'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🖥️ VPS Propio (Ubuntu)
            </button>
            <button
              onClick={() => setActiveHostingTab('cpanel')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeHostingTab === 'cpanel'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📁 cPanel / Hosting PHP
            </button>
          </div>
        </div>

        {/* TAB 1: CLOUD RUN (ACTUAL) */}
        {activeHostingTab === 'cloudrun' && (
          <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Opción Recomendada: No necesitas configurar ningún servidor
            </div>
            <p className="text-gray-700 leading-relaxed">
              Google AI Studio ya compiló y publicó este backend en Google Cloud Run. Tu bot está listo para responder consultas 24/7 en la URL:
            </p>
            <div className="p-3 bg-white rounded-xl border border-indigo-200 font-mono text-[11px] text-indigo-950 flex items-center justify-between">
              <span className="truncate">{cloudRunUrl}</span>
              <button
                onClick={() => copyToClipboard(cloudRunUrl, 'env')}
                className="shrink-0 ml-2 px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded font-sans font-semibold text-[10px]"
              >
                {copiedEnv ? '¡Copiado!' : 'Copiar URL'}
              </button>
            </div>
            <p className="text-gray-600">
              👉 Solo ve abajo, copia el fragmento de <b>"Código para tu Web"</b> y pégalo en el <code className="bg-indigo-100 px-1 rounded">index.html</code> de tu GitHub Pages. ¡Eso es todo!
            </p>
          </div>
        )}

        {/* TAB 2: RENDER / VERCEL */}
        {activeHostingTab === 'free' && (
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="font-bold text-gray-900 text-sm">
              Alojar en Render.com o Vercel (Gratis con Node.js)
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-gray-700">
              <li>Crea una cuenta gratuita en <b>Render.com</b> o <b>Vercel.com</b>.</li>
              <li>Conecta tu repositorio de GitHub con los archivos de este chatbot.</li>
              <li>En Build Command pon: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono">npm run build</code></li>
              <li>En Start Command pon: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono">npm start</code></li>
              <li>En Environment Variables (Variables de entorno), agrega <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono">GEMINI_API_KEY</code> con tu clave de Google.</li>
              <li>Obtendrás una URL como <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono">https://alicar-chatbot.onrender.com</code>.</li>
            </ol>
          </div>
        )}

        {/* TAB 3: VPS PROPIO */}
        {activeHostingTab === 'vps' && (
          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-pink-400 font-bold font-sans text-sm">
              <Terminal className="w-4 h-4" />
              Comandos para desplegar en tu propio VPS Linux (Ubuntu / Debian)
            </div>
            <pre className="bg-slate-950 p-3 rounded-xl overflow-x-auto text-[11px] text-pink-200 leading-relaxed">
{`# 1. Clonar o subir la carpeta del proyecto
git clone https://github.com/tu-usuario/alicar-chatbot.git
cd alicar-chatbot

# 2. Instalar dependencias
npm install

# 3. Configurar tu clave de Gemini
export GEMINI_API_KEY="tu_clave_de_gemini"

# 4. Construir la aplicación
npm run build

# 5. Ejecutar con PM2 para que nunca se apague
pm2 start server.ts --name alicar-bot --interpreter tsx
pm2 save`}
            </pre>
          </div>
        )}

        {/* TAB 4: CPANEL / PHP */}
        {activeHostingTab === 'cpanel' && (
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3 text-xs">
            <div className="font-bold text-amber-900 text-sm">
              ¿Tienes un Hosting Web Tradicional con cPanel y PHP?
            </div>
            <p className="text-gray-700">
              Si tu hosting no soporta Node.js pero sí soporta PHP, puedes crear un archivo <code className="bg-amber-100 px-1 rounded font-mono">api/chat.php</code> en tu hosting para que haga de puente con Gemini:
            </p>
            <div className="relative">
              <pre className="bg-slate-900 text-amber-100 p-3 rounded-xl overflow-x-auto font-mono text-[11px] max-h-48 scrollbar-thin">
                {phpSnippet}
              </pre>
              <button
                onClick={() => copyToClipboard(phpSnippet, 'php')}
                className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded text-[10px] font-sans font-bold"
              >
                {copiedPhp ? '¡Copiado!' : 'Copiar chat.php'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: GENERADOR DE CÓDIGO CON URL CONFIGURABLE */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <Code className="w-5 h-5 text-pink-600" />
              Código para Pegar en tu Página (GitHub Pages)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Inserta este script en <code className="bg-pink-100 text-pink-800 px-1 rounded">index.html</code> antes de <code className="bg-pink-100 text-pink-800 px-1 rounded">&lt;/body&gt;</code>.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(scriptSnippet, 'script')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-pink-200 cursor-pointer"
          >
            {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedScript ? '¡Código Copiado!' : 'Copiar Código'}</span>
          </button>
        </div>

        {/* URL Customizer for Widget */}
        <div className="bg-pink-50/70 p-3.5 rounded-2xl border border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex-1 w-full">
            <label className="font-semibold text-gray-700 block mb-1">
              URL del Backend del Chatbot conectada al widget:
            </label>
            <input
              type="text"
              value={customBackendUrl}
              onChange={(e) => setCustomBackendUrl(e.target.value)}
              placeholder="https://tu-servidor.com"
              className="w-full bg-white border border-pink-200 rounded-xl px-3 py-1.5 text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto pt-2 sm:pt-4">
            <button
              onClick={() => setCustomBackendUrl(cloudRunUrl)}
              className="text-[11px] text-pink-600 font-semibold hover:underline"
            >
              Usar Cloud Run Oficial
            </button>
          </div>
        </div>

        {/* Code Box */}
        <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-hidden border border-slate-700">
          <pre className="overflow-x-auto max-h-60 p-2 scrollbar-thin text-[11px] leading-relaxed text-pink-200">
            <code>{scriptSnippet}</code>
          </pre>
        </div>
      </div>

      {/* SECTION 5: PASO A PASO EN GITHUB PAGES */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-md">
        <h3 className="font-bold text-gray-800 text-base flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-pink-600" />
          Paso a paso para publicarlo en yoinnerm.github.io
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100">
            <span className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center font-black text-xs mb-2">
              1
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Entra a tu GitHub</h4>
            <p className="text-gray-600 text-[11px]">
              Ve al repositorio <a href="https://github.com/yoinnerm/yoinnerm.github.io" target="_blank" rel="noreferrer" className="text-pink-600 font-bold underline">yoinnerm.github.io</a> y haz clic en <code className="bg-pink-100 px-1 rounded">index.html</code>.
            </p>
          </div>

          <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
            <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs mb-2">
              2
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Edita el archivo</h4>
            <p className="text-gray-600 text-[11px]">
              Haz clic en el lápiz ✏️ (Edit this file) en la parte superior derecha de GitHub.
            </p>
          </div>

          <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
            <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs mb-2">
              3
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Pega el código</h4>
            <p className="text-gray-600 text-[11px]">
              Pega el bloque copiado al final de todo, justo una línea antes de <code className="bg-pink-100 px-1 rounded">&lt;/body&gt;</code>.
            </p>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-2">
              4
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Guarda (Commit)</h4>
            <p className="text-gray-600 text-[11px]">
              Presiona el botón verde <b>Commit changes</b>. En 1 minuto abre tu página <a href="https://yoinnerm.github.io/" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">yoinnerm.github.io</a> y verás el botón de Alicat en vivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
