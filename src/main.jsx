import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The static <head> tags (from index.html / the per-route prerendered pages)
// are for crawlers and link previews. react-helmet-async writes its own copy
// once the app runs, so drop the static ones to avoid duplicate tags.
document.querySelectorAll('head [data-rh="true"]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
