import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
if (!import.meta.env.VITE_FEATHERLESS_API_KEY) {
  throw new Error(
    'Missing Featherless API key. Please add VITE_FEATHERLESS_API_KEY to your .env file.'
  );
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
