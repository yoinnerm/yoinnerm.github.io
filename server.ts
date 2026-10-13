import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import JSZip from 'jszip';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure required storage directories and files exist
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

// Initialize CSV with UTF-8 BOM if empty
if (!fs.existsSync(csvFilePath)) {
  const bom = '\uFEFF';
  const headers = 'ID,Fecha_Registro,Nombre,Telefono_WhatsApp,Tipo_Evento,Fecha_Evento,Horario_Preferido,Mensaje\n';
  fs.writeFileSync(csvFilePath, bom + headers, 'utf8');
}

if (!fs.existsSync(jsonFilePath)) {
  fs.writeFileSync(jsonFilePath, JSON.stringify([], null, 2), 'utf8');
}

if (!fs.existsSync(subscritosFilePath)) {
  fs.writeFileSync(subscritosFilePath, '# Listado de Telefonos Suscritos a Novedades de Tortas Alicar\n', 'utf8');
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
// 1. API: FORMULARIO DE CONTACTO
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

    // Escape CSV fields
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

    // Update JSON file
    let list: any[] = [];
    try {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      list = JSON.parse(data);
    } catch {
      list = [];
    }

    const newContact = {
      id,
      timestamp,
      fechaRegistro: formattedDate,
      nombre,
      telefono,
      tipoEvento: tipoEvento || 'Consulta General',
      fechaEvento: fechaEvento || 'Por definir',
      horarioContacto: horarioContacto || '9 a 13',
      mensaje: mensaje || '',
    };

    list.unshift(newContact);
    fs.writeFileSync(jsonFilePath, JSON.stringify(list, null, 2), 'utf8');

    return res.json({
      success: true,
      message: '¡Gracias! Tu mensaje ha sido guardado exitosamente en nuestra base de datos. Nos pondremos en contacto contigo en tu horario preferido.',
      id,
    });
  } catch (error: any) {
    console.error('Error guardando contacto:', error);
    return res.status(500).json({ error: 'Error interno al procesar el formulario.' });
  }
});

// GET Contacts list
app.get('/api/contact', (_req, res) => {
  try {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch {
    res.json([]);
  }
});

// Download CSV for Excel
app.get('/api/contact/csv', (_req, res) => {
  try {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="contactos-tortas-alicar.csv"');
    const fileStream = fs.createReadStream(csvFilePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).send('Error descargando archivo CSV');
  }
});

// -------------------------------------------------------------
// 2. API: SUSCRIPCIÓN POR TELÉFONO
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
      message: `¡Número ${cleanPhone} registrado con éxito en nuestro boletín artesanal!`,
    });
  } catch (error) {
    console.error('Error en suscripción:', error);
    return res.status(500).json({ error: 'No se pudo guardar la suscripción.' });
  }
});

app.get('/api/subscribers', (_req, res) => {
  try {
    const content = fs.readFileSync(subscritosFilePath, 'utf8');
    res.type('text/plain').send(content);
  } catch {
    res.send('');
  }
});

// -------------------------------------------------------------
// 3. API: MASCOTA IA GUÍA INFORMATIVA
// -------------------------------------------------------------
const SYSTEM_KNOWLEDGE = `
Eres la mascota repostera de "Tortas Alicar". No tienes nombre propio (te identificas como la mascota de Tortas Alicar).
Tu función es EXCLUSIVAMENTE ORIENTAR E INFORMAR a los clientes sobre el sitio web, la historia, los servicios y la forma de comunicarse. NO PUEDES interactuar directamente con la base de datos de compras, favoritos ni envíos automáticos porque Tortas Alicar NO ES UNA TIENDA EN LÍNEA; es una plataforma informativa y de exhibición para conectar con Yanacari vía WhatsApp (+58 414 461 7554).

DATOS CLAVE DEL EMPRENDIMIENTO:
1. Historia: El emprendimiento nació en los años 80 con la abuela Alida. Hoy lo continúa su hija Yanacari con la misma devoción y técnica artesanal.
2. Nombre: "Alicar" es una hermosa unión de los nombres "Alida" y "Yanacari".
3. Ubicación: Barrio Santa Rita en Maracay, Estado Aragua, Venezuela.
4. Especialidades:
   - Tortas temáticas, infantiles, 15 años y bodas (bizcochos húmedos de vainilla, chocolate, marmoleada, red velvet, zanahoria, tres leches).
   - Pasteles de celebración y decorados personalizados (merengue italiano, suizo, chantilly, buttercream, fondant y detalles florales).
   - Gelatinas decoradas y artísticas 3D encapsuladas (una especialidad venezolana emblemática).
   - Pasapalos dulces y salados (tequeños tradicionales y gourmet, tartaletas de frutas, alfajores, mini brownies, profiteroles).
   - Galletas decoradas artesanales para recuerdos y mesas de dulces.
5. Cursos de Repostería y Kits para Emprendedores:
   - Ofrecemos talleres prácticos para aprender repostería desde cero o perfeccionar técnicas de boquilla y batidos.
   - También armamos kits con herramientas esenciales para que nuevos reposteros inicien su negocio.
   - Para ambos, el cliente debe pulsar el botón "Información" para escribir directamente al WhatsApp (+58 414 461 7554).
6. Presupuestos y Pedidos:
   - No hay precios fijos en la web porque cada pastel se elabora a medida según tamaño, relleno, diseño y número de comensales.
   - La vía principal y preferida de atención es WhatsApp al +58 414 461 7554.
   - El correo oficial siempre disponible es alicartortas@gmail.com.
7. Horarios de atención sugeridos:
   - Turno Mañana: 9:00 a 13:00.
   - Turno Tarde: 14:00 a 20:00.
8. Filosofía:
   - Misión: Crear momentos inolvidables en las familias venezolanas a través de dulces sabores artesanales de calidad superior.
   - Visión: Ser el referente tradicional y artístico de la repostería familiar en Maracay y Aragua.
   - Valores: Tradición familiar, amor por los detalles, frescura absoluta, honestidad y dedicación.

REGLAS DE RESPUESTA:
- Sé amable, dulce y conciso (máximo 2 a 3 párrafos cortos).
- Nunca digas que puedes realizar pedidos por ti mismo; guía al usuario a pulsar el botón flotante de WhatsApp o el formulario.
- Responde siempre en español cálido y educado.
- Si te preguntan cómo navegar por la página, explícales las secciones: Historia, Servicios, Galería interactiva, Cursos & Kits, Testimonios y Contacto.
`;

function getFallbackAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('precio') || q.includes('costo') || q.includes('cuanto') || q.includes('cotiz')) {
    return '¡Hola! En Tortas Alicar cada creación es única y personalizada según el número de porciones, bizcocho, relleno y decoración. Por eso no manejamos precios fijos en la web. La mejor manera de recibir tu presupuesto exacto es haciendo clic en el botón flotante de WhatsApp (+58 414 461 7554), donde mi madre Yanacari te atenderá con todo el cariño.';
  }
  if (q.includes('donde') || q.includes('ubicac') || q.includes('direccion') || q.includes('maracay') || q.includes('santa rita')) {
    return '¡Estamos ubicados en Maracay, Estado Aragua, específicamente en el tradicional barrio de Santa Rita! Desde aquí elaboramos con amor todas las creaciones familiares desde los años 80.';
  }
  if (q.includes('historia') || q.includes('alida') || q.includes('yanacari') || q.includes('origen') || q.includes('quienes')) {
    return '¡Nuestra historia es puro amor familiar! Comenzó en la década de 1980 con la abuela Alida y hoy es continuada por su hija Yanacari. El nombre "Alicar" nace de la unión de Alida y Yanacari. Mantenemos las recetas tradicionales y las técnicas artesanales que han acompañado a generaciones de familias en Maracay.';
  }
  if (q.includes('curso') || q.includes('taller') || q.includes('aprender')) {
    return '¡Qué alegría que quieras aprender! En Tortas Alicar ofrecemos cursos de repostería práctica (desde batidos perfectos hasta técnicas de boquillas y merengue). Puedes pulsar el botón "Información" en la sección de Cursos para conversar directamente por WhatsApp (+58 414 461 7554) y conocer las próximas fechas.';
  }
  if (q.includes('kit') || q.includes('emprended')) {
    return '¡Apoyamos con entusiasmo a quienes desean emprender en el dulce mundo de la repostería! Ofrecemos Kits para Emprendedores con herramientas y guías básicas. Para consultar disponibilidad y contenido del kit, pulsa el botón "Información" que te conectará por WhatsApp con Yanacari.';
  }
  if (q.includes('gelatina') || q.includes('pasapalo') || q.includes('galleta') || q.includes('servicio')) {
    return 'Además de nuestras reconocidas tortas y pasteles de celebración, elaboramos gelatinas artísticas 3D encapsuladas, pasapalos dulces y salados (como los deliciosos tequeños de hojaldre) y galletas decoradas para eventos familiares.';
  }
  if (q.includes('horario') || q.includes('hora') || q.includes('contacto')) {
    return 'Puedes escribirnos en cualquier momento. En nuestro formulario de contacto puedes elegir tu horario preferido: en la mañana (9:00 a 13:00) o en la tarde (14:00 a 20:00). ¡También puedes escribirnos a alicartortas@gmail.com o directamente al WhatsApp +58 414 461 7554!';
  }
  if (q.includes('nombre') || q.includes('quien eres') || q.includes('como te llamas')) {
    return '¡Hola! No tengo un nombre propio; soy la pequeña mascota repostera de Tortas Alicar. Mi misión en esta página es acompañarte, guiarte por las distintas secciones y darte toda la información sobre las creaciones de Yanacari.';
  }

  return '¡Bienvenido a Tortas Alicar! Soy la mascota repostera y estoy aquí para guiarte por nuestro sitio. Te invito a explorar nuestra Historia familiar, la Galería interactiva con nuestras mejores tortas y gelatinas, o los Cursos y Kits para emprendedores. Si deseas un presupuesto personalizado, puedes pulsar el botón verde de WhatsApp (+58 414 461 7554). ¿Hay algo específico sobre lo que te gustaría saber?';
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

    // Default fallback
    return res.json({ reply: getFallbackAnswer(message) });
  } catch (err) {
    console.error('Chat error:', err);
    return res.json({ reply: getFallbackAnswer(req.body?.message || '') });
  }
});

// -------------------------------------------------------------
// 4. API: DESCARGAR PROYECTO COMPLETO EN .ZIP
// -------------------------------------------------------------
app.get('/api/download-zip', async (_req, res) => {
  try {
    const prebuiltZip = path.join(__dirname, 'public', 'Tortas-Alicar-Sitio-Completo.zip');
    const rootZip = path.join(__dirname, 'Tortas-Alicar-Sitio-Completo.zip');

    const zipToServe = fs.existsSync(prebuiltZip) ? prebuiltZip : fs.existsSync(rootZip) ? rootZip : null;

    if (zipToServe) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="Tortas-Alicar-Sitio-Completo.zip"');
      const stream = fs.createReadStream(zipToServe);
      return stream.pipe(res);
    }

    const zip = new JSZip();

    // Helper to recursively add files
    function addDirToZip(dirPath: string, zipFolder: JSZip) {
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        if (
          item === 'node_modules' ||
          item === '.git' ||
          item.startsWith('.cache')
        ) {
          continue;
        }

        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          const subFolder = zipFolder.folder(item);
          if (subFolder) addDirToZip(fullPath, subFolder);
        } else {
          const content = fs.readFileSync(fullPath);
          zipFolder.file(item, content);
        }
      }
    }

    addDirToZip(__dirname, zip);

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="Tortas-Alicar-Sitio-Completo.zip"');
    res.setHeader('Content-Length', zipBuffer.length.toString());
    res.send(zipBuffer);
  } catch (error) {
    console.error('Error creando archivo ZIP:', error);
    res.status(500).json({ error: 'No se pudo generar el archivo ZIP.' });
  }
});

// -------------------------------------------------------------
// VITE DEV MIDDLEWARE / STATIC FILES
// -------------------------------------------------------------
async function setupApp() {
  // Serve static assets from public, images, and sounds
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
