/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true, // Handled perfectly by Vite's type system
  },
});

export default mergeConfig(
  viteConfig,
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup-env.ts'],
    },
  })
);
