import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { guestUserService } from './services/guestUserService'
import { supabase } from './integrations/supabase/client'

// Expose services globally for testing
if (typeof window !== 'undefined') {
  (window as any).guestUserService = guestUserService;
  (window as any).supabase = supabase;
}

createRoot(document.getElementById("root")!).render(<App />);
