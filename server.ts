import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure required internal storage directories exist
const formsDir = path.join(__dirname, 'forms');
const imagesDir = path.join(__dirname, 'images');
const soundsDir = path.join(__dirname, 'sounds');
const csvFilePath = path.join(formsDir, 'contactos.csv');
const jsonFilePath = path.join(formsDir, 'contactos.json');
const subscritosFilePath = path.join(__dirname, 'subscritos.txt');

[formsDir, imagesDir, soundsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize internal private CSV with UTF-8 BOM if empty
if (!fs.existsSync(csvFilePath)) {
  const bom = '\uFEFF';
  const headers = 'ID,Fecha_Registro,Nombre,Telefono_WhatsApp,Tipo_Evento,Fecha_Evento,Horario_Preferido,Mensaje\n';
  fs.writeFileSync(csvFilePath, bom + headers, 'utf8');
}

if (!fs.existsSync(jsonFilePath)) {
  fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 2), 'utf8');
}

if (!fs.existsSync(subscritosFilePath)) {
  fs.writeFileSync(subscritosFilePath, '# Listado Privado de Telefonos Suscritos - Tortas Alicar\n', 'utf8');
}

// Gemini AI client initialization
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Gemini client init error:', err);
  }
}

// -------------------------------------------------------------
// 1. API: FORMULARIO DE CONTACTO (Guardado privado interno)
// -------------------------------------------------------------
app.post('/api/contact', (req, res) => {
  try {
    const { nombre, telefono, tipoEvento, fechaEvento, horarioContacto, mensaje } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ error: 'Nombre y teléfono son obligatorios.' });
    }

    const id = Date.now().toString(36).toUpperCase();
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' });

    const escapeCsv = (val: any) => `"${String(val || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    const csvLine = [
      escapeCsv(id),
      escapeCsv(formattedDate),
      escapeCsv(nombre),
      escapeCsv(telefono),
      escapeCsv(tipoEvento || 'Consulta General'),
      escapeCsv(fechaEvento || 'Por definir'),
      escapeCsv(horarioContacto || 'Cualquiera'),
      escapeCsv(mensaje || '')
    ].join(',') + '\n';

    fs.appendFileSync(csvFilePath, csvLine, 'utf8');

    let list: any[] = [];
    try {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      list = JSON.parse(data);
    } catch {
      list = [];
    }

    list.unshift({
      id,
      timestamp,
      fechaRegistro: formattedDate,
      nombre,
      telefono,
      tipoEvento: tipoEvento || 'Consulta General',
      fechaEvento: fechaEvento || 'Por definir',
      horarioContacto: horarioContacto || '9 a 13',
      mensaje: mensaje || '',
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(list, null, 2), 'utf8');

    return res.json({
      success: true,
      message: '¡Gracias! Tu consulta ha sido guardada. Nos comunicaremos contigo en tu horario preferido.',
      id,
    });
  } catch (error: any) {
    console.error('Error guardando contacto:', error);
    return res.status(500).json({ error: 'Error al procesar el formulario.' });
  }
});

// -------------------------------------------------------------
// 2. API: SUSCRIPCIÓN POR TELÉFONO (subscritos.txt)
// -------------------------------------------------------------
app.post('/api/subscribe', (req, res) => {
  try {
    const { telefono } = req.body;
    if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 7) {
      return res.status(400).json({ error: 'Por favor ingresa un número de teléfono válido.' });
    }

    const cleanPhone = telefono.trim();
    const formattedDate = new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' });
    const logLine = `[${formattedDate}] Teléfono: ${cleanPhone}\n`;

    fs.appendFileSync(subscritosFilePath, logLine, 'utf8');

    return res.json({
      success: true,
      message: `¡Número ${cleanPhone} registrado con éxito para novedades y talleres!`,
    });
  } catch (error) {
    console.error('Error en suscripción:', error);
    return res.status(500).json({ error: 'No se pudo guardar la suscripción.' });
  }
});

// -------------------------------------------------------------
// 3. API: MASCOTA IA GUÍA INFORMATIVA: "ALICAT"
// -------------------------------------------------------------
const SYSTEM_KNOWLEDGE = `
Eres Alicat, la mascota asistente y guía informativa de "Tortas Alicar", una repostería artesanal ubicada en el barrio Santa Rita de Maracay, estado Aragua, llevada con dedicación por Yanacari.
Tu rol es EXCLUSIVAMENTE ORIENTAR E INFORMAR a los visitantes de la página web. NO PUEDES interactuar directamente con la página, ni realizar pedidos automáticos, ni procesar pagos, ni gestionar envíos.

DATOS CLAVE:
1. Nombre de la mascota: Te llamas "Alicat".
2. Repostería: "Tortas Alicar", dirigida por Yanacari en Santa Rita, Maracay.
3. Propósito: Plataforma informativa y vitrina de muestra para conectar con Yanacari preferiblemente por WhatsApp al +58 414 461 7554.
4. Servicios:
   - Tortas personalizadas y de celebración (vainilla, chocolate, marmoleada, tres leches, selva negra).
   - Gelatinas artísticas 3D encapsuladas con flores inyectadas a mano.
   - Pasapalos dulces y salados (tequeños de hojaldre, mini tartaletas, brownies).
   - Cupcakes y galletas decoradas.
   - Cursos de repostería y Kits para emprendedores (con botón "Información" hacia WhatsApp).
5. No hay precios fijos en la página porque cada diseño se cotiza según porciones, ingredientes y temática.
6. Horarios de contacto preferidos: de 9 a 13 o de 14 a 20.
7. Correo: alicartortas@gmail.com.
8. Enlace de Google Maps: https://maps.app.goo.gl/bkiiAgVgz73xXWgy7

REGLAS DE RESPUESTA:
- Preséntate amablemente como Alicat si te preguntan tu nombre.
- Responde de forma cálida, concisa y natural (sin frases grandilocuentes ni repeticiones innecesarias).
- Guía siempre a escribir al WhatsApp de Yanacari (+58 414 461 7554) para cotizaciones y pedidos.
`;

function getFallbackAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('nombre') || q.includes('quien eres') || q.includes('como te llamas')) {
    return '¡Hola! Me llamo Alicat y soy la mascota repostera de Tortas Alicar. Estoy aquí para orientarte sobre nuestras creaciones, servicios y cómo comunicarte con Yanacari.';
  }
  if (q.includes('precio') || q.includes('costo') || q.includes('cuanto') || q.includes('cotiz')) {
    return 'En Tortas Alicar cada pedido se hace a medida según la cantidad de porciones, el relleno y el diseño. Por eso no manejamos precios fijos en la página. Puedes escribirnos directamente por WhatsApp (+58 414 461 7554) para que Yanacari te prepare un presupuesto exacto.';
  }
  if (q.includes('donde') || q.includes('ubicac') || q.includes('direccion') || q.includes('maracay') || q.includes('santa rita')) {
    return 'Estamos ubicados en Maracay, en el barrio Santa Rita. Puedes ver nuestra ubicación exacta en Google Maps mediante el enlace en la sección de Contacto.';
  }
  if (q.includes('curso') || q.includes('taller') || q.includes('kit') || q.includes('emprend')) {
    return 'Ofrecemos cursos prácticos de repostería y kits con herramientas para emprendedores. En la sección "Nosotros & Legales" puedes pulsar el botón "Información" para escribirnos directamente a WhatsApp (+58 414 461 7554).';
  }
  if (q.includes('gelatina') || q.includes('pasapalo') || q.includes('galleta') || q.includes('servicio')) {
    return 'Elaboramos tortas de celebración, gelatinas artísticas 3D encapsuladas, pasapalos dulces y salados (como tequeños de hojaldre), galletas decoradas y mesas de postres.';
  }
  if (q.includes('horario') || q.includes('hora') || q.includes('contacto')) {
    return 'Para comunicarte puedes elegir tu horario preferido: de 9:00 a 13:00 (mañana) o de 14:00 a 20:00 (tarde) en nuestro formulario, o escribirnos directamente a WhatsApp (+58 414 461 7554) o al correo alicartortas@gmail.com.';
  }

  return '¡Hola! Soy Alicat, la mascota de Tortas Alicar. Puedo orientarte sobre los servicios, el muestrario interactivo, cursos o la ubicación en Santa Rita, Maracay. Para pedidos y presupuestos, la vía directa es por WhatsApp con Yanacari (+58 414 461 7554). ¿En qué te puedo ayudar hoy?';
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction: SYSTEM_KNOWLEDGE,
            temperature: 0.7,
          },
        });
        const reply = response.text || getFallbackAnswer(message);
        return res.json({ reply });
      } catch (geminiError) {
        console.warn('Gemini generateContent fallback:', geminiError);
        return res.json({ reply: getFallbackAnswer(message) });
      }
    }

    return res.json({ reply: getFallbackAnswer(message) });
  } catch (err) {
    console.error('Chat error:', err);
    return res.json({ reply: getFallbackAnswer(req.body?.message || '') });
  }
});

// -------------------------------------------------------------
// VITE DEV MIDDLEWARE / STATIC FILES
// -------------------------------------------------------------
async function setupApp() {
  app.use('/images', express.static(imagesDir));
  app.use('/sounds', express.static(soundsDir));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

setupApp();
