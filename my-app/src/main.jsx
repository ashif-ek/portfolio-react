import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Analytics } from '@vercel/analytics/react';

// PWA registration
import { registerSW } from 'virtual:pwa-register'

// Auto-register Service Worker (for offline + install prompt)
registerSW({
  onNeedRefresh() {
    console.log(' New content available! Refresh to update.')
  },
  onOfflineReady() {
    console.log(' App ready to work offline!')
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)
