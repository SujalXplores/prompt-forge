import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Initialize OpenRouter configuration
import './lib/openrouter';

createRoot(document.getElementById('root')!).render(<App />);
