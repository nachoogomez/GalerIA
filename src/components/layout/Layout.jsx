import { useLocation } from 'react-router-dom';
import {useEffect} from 'react';

/**
 * Componente 'Layout'
 * 
 * Componente contenedor que envuelve el contenido de la aplicación.
 * 
 * Funcionalidades:
 * - Detecta cambios en la ruta actual mediante useLocation de react-router-dom.
 * - Al cambiar la ruta, hace scroll automático al inicio de la página.
 * - Renderiza sus elementos hijos dentro de un contenedor principal con estilos.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido que se renderiza dentro del layout.
 * @returns {JSX.Element} El elemento que representa el layout principal de la aplicación.
 */
const Layout = ({ children }) => {
    const { pathname } = useLocation();
    
    /**
     * Hook de efecto que se ejecuta al cambiar la ruta
     * Al cambiar la ruta, hace scroll automático al inicio de la página
     */
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    return <main className='min-h-screen flex flex-col items-center'>{children}</main>;
  };
  
  export default Layout;