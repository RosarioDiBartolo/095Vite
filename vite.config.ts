// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA  } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(),
    VitePWA ({
   
    // Caching configuration for arc/assets folder
    workbox: {
      globPatterns: [
        'src/assets/**/*.{js,css,png,jpg,gif,svg,woff,woff2,eot,ttf,otf,ico,mp3,wav}',
        'public/**/*.{js,css,png,jpg,gif,svg,woff,woff2,eot,ttf,otf,ico,mp3,wav}'
      ],
      runtimeCaching: [
        {
          urlPattern: /\/src\/assets\/.*\.(?:mp3|wav)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'audio-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            },
          },
        },
        {
          urlPattern: /\/public\/.*\.(?:js|css|png|jpg|gif|svg|woff|woff2|eot|ttf|otf|ico|mp3|wav)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'public-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            },
          },
        },
      ],
    }
  })],
  resolve: {
     
  },
  server: {
    port: 3000,
  },
});
