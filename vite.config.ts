import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        './src/App.tsx',
        './src/main.tsx',
      ]
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary / array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'andpack',
      // Proper extensions will be added
      fileName: 'andpack',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global vars to use in UMD build for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
});
