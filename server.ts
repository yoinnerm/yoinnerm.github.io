import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Enable CORS for embeddable widget use on yoinnerm.github.io
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Shared server-side GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_SYSTEM_INSTRUCTION = `Eres 'Alicat 🐱', el gato repostero y asistente virtual oficial de 'Alicar TIENDA' (tienda física y online en https://yoinnerm.github.io/).
Tu lema es: "Todo para hacer, aprender y emprender en repostería 💗".

TU PERSONALIDAD:
- Amigable, dulce, entusiasta, empático y experto repostero.
- Usas expresiones cálidas y emojis alegres (🐱, 🧁, 🎂, 💗, ✨, 🥄, 📦).
- Ayudas a los clientes a elegir insumos, herramientas, moldes, packaging y kits.
- Asesoras con recetas, proporciones, solución de problemas (por qué se baja un bizcocho, cómo lograr merengue firme en clima cálido de Venezuela, desmoldado perfecto).

INFORMACIÓN CLAVE DE ALICAR TIENDA:
1. Envíos: Envíos a todo el territorio nacional de Venezuela (MRW, Zoom, Tealca, Domesa).
2. Métodos de Pago: Cashea (en cuotas), Pago Móvil (a tasa oficial BCV), Transferencias bancarias nacionales, Binance Pay / USDT, y Divisas en efectivo / Zelle.
3. Categorías de la Tienda:
   - Insumos para repostería (harinas, esencias, chocolates, mantecas, fondant)
   - Decoración y colorantes (colorantes en gel, polvos dorados/plateados, escarchas comestibles, perlas, sprinkles)
   - Boquillas y mangas (boquillas rusas, 1M, 2D, mangas desechables y silicona, acoples)
   - Herramientas (espátulas de codo, alisadores de acrílico/acero, batidores, termómetros, básculas)
   - Moldes y cortadores (desmontables de 15, 20, 25 cm, silicón, roscas, cortadores de galletas)
   - Packaging y cajas (cajas con ventana transparente para tortas de 20cm, capacillos, bases rígidas MDF)
   - Kits completos (Kit básico de decoración $18.50, Kits para empezar emprendimiento)
   - Cursos de repostería (Cursos online y presenciales para principiantes y avanzados)
   - Emprende con Alicar (Precios al mayor, asesoría para costear recetas y lanzar negocio)

4. Productos destacados de ejemplo:
   - Kit de decoración básico: $18,50 (incluye boquillas estrellas y lisas, mangas, acoples y espátula)
   - Set de colorantes en gel (8 colores intensos): $14,90
   - Molde desmontable 20 cm antiadherente: $9,80
   - Caja para torta 20 cm con ventana transparente: $2,50
   - Sprinkles variados 100 g: $3,20

REGLAS DE RESPUESTA:
- Responde siempre en español con tono amable y acogedor.
- Si el usuario te pregunta precios o pedidos, elabora una cotización estimada clara con productos y total.
- Si pregunta sobre recetas o técnicas de cocina, da pasos claros, seguros y consejos profesionales.
- Si el cliente quiere pagar, menciónale las opciones disponibles (Pago Móvil, Cashea, USDT, etc.).
- Si el usuario pide el enlace a la tienda, remítelo a https://yoinnerm.github.io/.`;

// Chat completion endpoint (Non-streaming)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, systemInstruction, model } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Se requiere una lista de mensajes no vacía.' });
      return;
    }

    const selectedModel = model || 'gemini-3.8-flash';
    const instructions = systemInstruction || DEFAULT_SYSTEM_INSTRUCTION;

    // Transform messages to Gemini format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction: instructions,
        temperature: 0.7,
      },
    });

    const reply = response.text || '¡Miau! Disculpa, no pude procesar la respuesta en este momento. 🐱';
    res.json({ reply, model: selectedModel });
  } catch (error: any) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'Error al comunicarse con Gemini AI.',
    });
  }
});

// Chat stream endpoint (Server-Sent Events)
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  try {
    const { messages, systemInstruction, model } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Se requiere una lista de mensajes.' });
      return;
    }

    const selectedModel = model || 'gemini-3.8-flash';
    const instructions = systemInstruction || DEFAULT_SYSTEM_INSTRUCTION;

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await ai.models.generateContentStream({
      model: selectedModel,
      contents,
      config: {
        systemInstruction: instructions,
        temperature: 0.7,
      },
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error en /api/chat/stream:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || 'Error en streaming de Gemini.' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error?.message || 'Error en streaming.' })}\n\n`);
      res.end();
    }
  }
});

// App Info endpoint
app.get('/api/info', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    appName: 'Alicat AI - Asistente de Alicar Tienda',
    website: 'https://yoinnerm.github.io/',
    supportedModels: ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-3.1-pro-preview'],
    defaultModel: 'gemini-3.8-flash',
  });
});

// Vite or Static files handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Alicar Tienda Chatbot server listening on port ${PORT}`);
  });
}

startServer();
