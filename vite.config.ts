import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // исп. именованный экспорт {ReactCompoent as SVG}
      // exportAsDefault: true,
      svgrOptions: {
        exportType: 'default'
      }
    }),
  ],
  resolve: {
    alias: [
      // чтобы должно заменяться когда алиас добавляем
      { find: '@', replacement: '/src' }
    ]
  },
  define: {
    // обяз в JSON.stringify
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:8000'),
    __PROJECT__: JSON.stringify('frontend'),
  }
})

// есть цсс модули, алиасы