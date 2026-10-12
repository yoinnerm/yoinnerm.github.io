import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

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

// -------------------------------------------------------------
// POST /api/contact - Registra datos de consulta
// -------------------------------------------------------------
app.post('/api/contact', (req, res) => {
  try {
    const { nombre, telefono, tipoEvento, fechaEvento, horarioContacto, mensaje } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ error: 'Nombre y teléfono son obligatorios.' });
    }

    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const fechaRegistro = new Date().toISOString();

    const cleanField = (val: string | undefined) =>
      `"${(val || '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ').trim()}"`;

    const csvRow = [
      id,
      cleanField(fechaRegistro),
      cleanField(nombre),
      cleanField(telefono),
      cleanField(tipoEvento),
      cleanField(fechaEvento),
      cleanField(horarioContacto),
      cleanField(mensaje),
    ].join(',') + '\n';

    fs.appendFileSync(csvFilePath, csvRow, 'utf8');

    let currentJson: any[] = [];
    try {
      const content = fs.readFileSync(jsonFilePath, 'utf8');
      currentJson = JSON.parse(content);
    } catch {
      currentJson = [];
    }

    currentJson.push({
      id,
      fechaRegistro,
      nombre,
      telefono,
      tipoEvento,
      fechaEvento,
      horarioContacto,
      mensaje,
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(currentJson, null, 2), 'utf8');

    return res.status(200).json({
      success: true,
      message: '¡Tu consulta ha sido recibida con éxito!',
      id,
    });
  } catch (err) {
    console.error('Error procesando contacto:', err);
    return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
  }
});

// -------------------------------------------------------------
// SERVIDOR ESTÁTICO / MIDDLEWARE DE DESARROLLO
// -------------------------------------------------------------
async function setupApp() {
  app.use('/images', express.static(imagesDir));

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
