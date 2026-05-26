import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// StrictMode is intentionally disabled: it causes Lenis to double-initialize
// in development (StrictMode runs effects twice), which breaks the smooth scroll
// wiring. Lenis handles its own singleton pattern via the smoothScroll module.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
