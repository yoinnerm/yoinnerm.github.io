import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

async function buildZip() {
  console.log('Empaquetando archivo ZIP autónomo para Tortas Alicar...');

  if (!fs.existsSync(distDir)) {
    console.error('El directorio dist/ no existe. Ejecuta vite build primero.');
    process.exit(1);
  }

  const zip = new JSZip();

  // Helper to recursively add a directory to zip
  function addDirectory(dirPath: string, zipFolder: JSZip, filterFn?: (name: string) => boolean) {
    if (!fs.existsSync(dirPath)) return;
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      if (filterFn && !filterFn(item)) continue;
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const sub = zipFolder.folder(item);
        if (sub) addDirectory(fullPath, sub, filterFn);
      } else {
        zipFolder.file(item, fs.readFileSync(fullPath));
      }
    }
  }

  // 1. Add compiled standalone website files to ZIP root
  // index.html (the patched defer file)
  const distIndex = path.join(distDir, 'index.html');
  if (fs.existsSync(distIndex)) {
    zip.file('index.html', fs.readFileSync(distIndex));
  }

  // assets
  const distAssets = path.join(distDir, 'assets');
  if (fs.existsSync(distAssets)) {
    const assetsFolder = zip.folder('assets');
    if (assetsFolder) addDirectory(distAssets, assetsFolder);
  }

  // images (from public/images)
  const imagesDir = path.join(rootDir, 'public', 'images');
  if (fs.existsSync(imagesDir)) {
    const imagesFolder = zip.folder('images');
    if (imagesFolder) addDirectory(imagesDir, imagesFolder);
  }

  // sounds (from public/sounds)
  const soundsDir = path.join(rootDir, 'public', 'sounds');
  if (fs.existsSync(soundsDir)) {
    const soundsFolder = zip.folder('sounds');
    if (soundsFolder) addDirectory(soundsDir, soundsFolder);
  }

  // forms
  const formsDir = path.join(rootDir, 'forms');
  if (fs.existsSync(formsDir)) {
    const formsFolder = zip.folder('forms');
    if (formsFolder) addDirectory(formsDir, formsFolder);
  }

  // subscritos.txt
  const subFile = path.join(rootDir, 'subscritos.txt');
  if (fs.existsSync(subFile)) {
    zip.file('subscritos.txt', fs.readFileSync(subFile));
  }

  // robots.txt & sitemap.xml
  const robots = path.join(rootDir, 'public', 'robots.txt');
  if (fs.existsSync(robots)) zip.file('robots.txt', fs.readFileSync(robots));
  const sitemap = path.join(rootDir, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemap)) zip.file('sitemap.xml', fs.readFileSync(sitemap));

  // Instructions README
  const leeme = `=======================================================
TORTAS ALICAR - SITIO WEB OFICIAL (VERSIÓN AUTÓNOMA)
Repostería Tradicional y Artística | Maracay, Venezuela
Fundado por Alida (años 80) y continuado por Yanacari
=======================================================

¡LISTO PARA ABRIR DIRECTAMENTE!

CÓMO VER ESTA PÁGINA WEB EN TU COMPUTADORA:
1. Haz doble clic en el archivo "index.html" que está en esta carpeta.
2. Se abrirá en tu navegador (Google Chrome, Microsoft Edge, Firefox, Safari o Brave).
3. Todas las imágenes (tortas, gelatinas 3D, pasapalos), estilos, animaciones
   y la mascota repostera funcionarán sin errores de CORS ni bloqueos de tipo de script.

NO REQUIERE INSTALAR NODE.JS NI SERVIDORES PARA VISUALIZARLO.

ATENCIÓN AL CLIENTE Y PEDIDOS:
- WhatsApp Oficial: +58 414 461 7554
- Correo: alicartortas@gmail.com
- Ubicación: Barrio Santa Rita, Maracay, Edo. Aragua, Venezuela

Para desarrolladores:
Los archivos fuente se encuentran en la subcarpeta "codigo-fuente/".
`;
  zip.file('LEEME_INSTRUCCIONES.txt', leeme);

  // 2. Add source code in "codigo-fuente/" folder
  const srcZip = zip.folder('codigo-fuente');
  if (srcZip) {
    const srcDir = path.join(rootDir, 'src');
    const srcSub = srcZip.folder('src');
    if (srcSub) addDirectory(srcDir, srcSub);

    ['package.json', 'tsconfig.json', 'vite.config.ts', 'server.ts', 'metadata.json', '.env.example', '.gitignore'].forEach((f) => {
      const p = path.join(rootDir, f);
      if (fs.existsSync(p)) {
        srcZip.file(f, fs.readFileSync(p));
      }
    });
  }

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  // Save to root, public/ and dist/
  const targetZip1 = path.join(rootDir, 'Tortas-Alicar-Sitio-Completo.zip');
  const targetZip2 = path.join(rootDir, 'public', 'Tortas-Alicar-Sitio-Completo.zip');
  const targetZip3 = path.join(distDir, 'Tortas-Alicar-Sitio-Completo.zip');
  const targetZip4 = path.join(rootDir, 'tortas-alicar_v4_corregido.zip');

  fs.writeFileSync(targetZip1, buffer);
  fs.writeFileSync(targetZip2, buffer);
  fs.writeFileSync(targetZip3, buffer);
  fs.writeFileSync(targetZip4, buffer);

  console.log(`ZIP generado con éxito (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

buildZip().catch((err) => {
  console.error('Error generando zip:', err);
  process.exit(1);
});
