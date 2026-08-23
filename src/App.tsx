import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

/**
 * Raíz de la aplicación.
 *
 * Se desmontaron QueryClientProvider, TooltipProvider, Toaster y Sonner: estaban
 * montados desde el andamiaje inicial pero ningún componente de la página los usaba,
 * y entraban igual al bundle principal.
 *
 * LazyMotion con el subconjunto domAnimation evita arrastrar el motor completo de
 * framer-motion —layout projection y drag, que acá no se usan—; los componentes se
 * importan como `m` en lugar de `motion`.
 */
const App = () => (
  <AuthProvider>
    <LazyMotion features={domAnimation} strict>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LazyMotion>
  </AuthProvider>
);

export default App;
