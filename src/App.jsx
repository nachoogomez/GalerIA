import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'

import Layout from './components/layout/Layout'
import Routes from './routes/Routes'

/**
 * Función principal de la aplicación
 * 
 * Renderiza la barra de navegación, el contenido de las rutas y el pie de página
 * 
 * @returns {JSX.Element} Componente principal de la aplicación
 */
function App() {

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