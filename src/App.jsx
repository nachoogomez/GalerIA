import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Layout from './components/layout/Layout'
import Routes from './routes/Routes'
import { useAuthSync } from './hooks/useAuthSync'

/**
 * Función principal de la aplicación
 *
 * Renderiza la barra de navegación, el contenido de las rutas y el pie de página.
 * Sincroniza automáticamente el estado de Auth0 con Redux.
 *
 * @returns {JSX.Element} Componente principal de la aplicación
 */
function App() {
  // Sincronizar Auth0 con Redux automáticamente
  useAuthSync();

  return (
    <>
    <Layout>
      <Navbar/>
      <Routes/>
      <Footer/>
    </Layout>
    </>
  );
};

export default App;