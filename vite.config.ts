import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { schemas, EnvEnum, type EnvName } from './src/configuration/utils/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const envMode: EnvName = EnvEnum.parse(mode);

  const env = loadEnv(envMode, process.cwd(), 'VITE_');

  const result = schemas[envMode].safeParse(env);
  if (!result.success) {
    console.error(
      `❌ Validation d'env pour le mode "${envMode}" a échoué :`,
      result.error.format(),
    );
    process.exit(1);
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    ssr: {
      noExternal: ['react-router-dom'],
    },
    define: {
      __VALIDATED_ENV__: JSON.stringify({
        mode: envMode,
        ...result.data,
      }),
    },
  };
});
