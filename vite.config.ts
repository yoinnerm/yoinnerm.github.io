import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function fileProtocolPlugin(): Plugin {
  return {
    name: 'file-protocol-compatibility',
    apply: 'build', // ONLY apply during production build, preserving ES modules in dev server
    enforce: 'post',
    transformIndexHtml(html: string) {
      let modified = html;

      // 1. Remove <link rel="modulepreload" ...> (CORS blocker on file:// in Chrome)
      modified = modified.replace(/<link[^>]*rel=["']modulepreload["'][^>]*>\s*/gi, '');

      // 2. Convert <script type="module" crossorigin ... src="..."> into <script defer ... src="...">
      // Single-bundle Vite apps don't require ES module syntax in the final build.
      // Replacing with defer enables seamless execution under file:// protocol.
      modified = modified.replace(
        /<script\b([^>]*)type=["']module["']([^>]*)src=(["'][^"']+["'])([^>]*)><\/script>/gi,
        (_match, p1, p2, src, p4) => {
          const cleanP1 = (p1 || '').replace(/\bcrossorigin(=["'][^"']*["'])?\s*/gi, '');
          const cleanP2 = (p2 || '').replace(/\bcrossorigin(=["'][^"']*["'])?\s*/gi, '');
          const cleanP4 = (p4 || '').replace(/\bcrossorigin(=["'][^"']*["'])?\s*/gi, '');
          const rest = `${cleanP1} ${cleanP2} ${cleanP4}`.replace(/\s+/g, ' ').trim();
          return `<script defer ${rest ? rest + ' ' : ''}src=${src}></script>`;
        }
      );

      // 3. Remove crossorigin from stylesheet links
      modified = modified.replace(
        /(<link\b[^>]*rel=["']stylesheet["'][^>]*)\bcrossorigin(=["'][^"']*["'])?\s*([^>]*>)/gi,
        '$1$3'
      );

      // 4. Ensure og:image and twitter:image have the complete URL
      modified = modified.replace(
        /(<meta\s+property=["']og:image["']\s+content=["'])\/images\//gi,
        '$1https://yoinnerm.github.io/images/'
      );
      modified = modified.replace(
        /(<meta\s+name=["']twitter:image["']\s+content=["'])\/images\//gi,
        '$1https://yoinnerm.github.io/images/'
      );

      return modified;
    },
    closeBundle() {
      // Safety net: ensure the written dist/index.html is completely sanitized
      const distIndexPath = path.resolve(__dirname, 'dist', 'index.html');
      if (fs.existsSync(distIndexPath)) {
        let content = fs.readFileSync(distIndexPath, 'utf8');

        // Remove modulepreload
        content = content.replace(/<link[^>]*rel=["']modulepreload["'][^>]*>\s*/gi, '');

        // Convert type="module" to defer
        content = content.replace(
          /<script\b([^>]*)type=["']module["']([^>]*)src=(["'][^"']+["'])([^>]*)><\/script>/gi,
          (_match, p1, p2, src, p4) => {
            const cleanP1 = (p1 || '').replace(/\bcrossorigin(=["'][^"']*["'])?\s*/gi, '');
            const cleanP2 = (p2 || '').replace(/\bcrossorigin(=["'][^"']*["'])?\s*/gi, '');
            const cleanP4 = (p4 || '').replace(/\bcrossorigin(=["'][^"']*["'])?\s*/gi, '');
            const rest = `${cleanP1} ${cleanP2} ${cleanP4}`.replace(/\s+/g, ' ').trim();
            return `<script defer ${rest ? rest + ' ' : ''}src=${src}></script>`;
          }
        );

        // Remove crossorigin from CSS
        content = content.replace(
          /(<link\b[^>]*rel=["']stylesheet["'][^>]*)\bcrossorigin(=["'][^"']*["'])?\s*([^>]*>)/gi,
          '$1$3'
        );

        // Ensure full URL in social preview tags
        content = content.replace(
          /(<meta\s+property=["']og:image["']\s+content=["'])\/images\//gi,
          '$1https://yoinnerm.github.io/images/'
        );
        content = content.replace(
          /(<meta\s+name=["']twitter:image["']\s+content=["'])\/images\//gi,
          '$1https://yoinnerm.github.io/images/'
        );

        fs.writeFileSync(distIndexPath, content, 'utf8');
      }
    },
  };
}

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? './' : '/',
    plugins: [react(), tailwindcss(), fileProtocolPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
