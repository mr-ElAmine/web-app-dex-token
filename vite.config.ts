import { dirname } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: {
    noExternal: ['react-router-dom'],
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
});
