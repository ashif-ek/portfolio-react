import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      //  this ensures generated file name consistency
      manifestFilename: 'manifest.webmanifest',

      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'favicon-96x96.png',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png'
      ],

      manifest: {
        name: 'Ashif E.K | Portfolio',
        short_name: 'Ashif',
        description: 'Portfolio of Ashif E.K — React & Django Developer',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      },

      //  safest default Workbox setup for Vite
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        navigateFallback: '/offline.html',
      },
    })
  ],
})
