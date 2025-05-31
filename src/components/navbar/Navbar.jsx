import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import ModalUser from "./ModalUser";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Componente 'Navbar' que renderiza la barra de navegación principal de la aplicación.
 * 
 * Funcionalidades:
 * - Muestra el logo con enlace a la página principal.
 * - Links de navegación: About Us, Products, Contact Us.
 * - Controla autenticación con Auth0 para mostrar botones de Sign In o Logout.
 * - En pantallas grandes muestra el menú horizontalmente.
 * - En pantallas pequeñas muestra un menú hamburguesa desplegable.
 * - Al hacer scroll, cierra el menú desplegable si está abierto.
 * - Cuando el usuario está autenticado, muestra el componente ModalUser en móvil.
 *
 * @returns {JSX.Element} El elemento que representa la barra de navegación.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado
 
  /**
   * Función para abrir o cerrar el menú hamburguesa
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Función para cerrar el menú si se hace scroll
   */
  const handleScroll = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  /**
   * Efecto para añadir o quitar el evento de scroll
   */
  useEffect(() => { 
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  /**
   * Hook para manejar la autenticación con Auth0
   */
  const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0();

  //console.log(user);
  
  return (
    <nav className="bg-gray-900 p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          GalerIA
        </Link>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/about" className="text-white hover:text-gray-200">
            About Us
          </Link>
          <Link to="/products" className="text-white hover:text-gray-200">
            Products
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-200">
            Contact Us
          </Link>
          {
            isAuthenticated ? (
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="inline-flex text-white items-center bg-[#4F46E5] border-0 py-1 px-3 focus:outline-none hover:bg-[#8f89ee] rounded text-base mt-4 md:mt-0"
              >
                Sign In
                <FaArrowRight />
              </button>
            )
          }
        </div>

        {/* Icono hamburguesa para pantallas pequeñas */}
        <div className="md:hidden flex gap-5">
          {isAuthenticated ? <ModalUser /> : null}  {/* Mostrar el componente ModalUser si el usuario esta autenticado */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menu desplegable para moviles */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 items-center">
          <Link to="/about" className="block py-2 px-4 text-white hover:bg-blue-700">
            About Us
          </Link>
          <Link to="/products" className="block py-2 px-4 text-white hover:bg-blue-700">
            Products
          </Link>
          <Link to="/contact" className="block py-2 px-4 text-white hover:bg-blue-700">
            Contact Us
          </Link>
          {!isAuthenticated ? <button onClick={() => loginWithRedirect()} className="inline-flex text-white items-center bg-[#4F46E5] border-0 py-1 px-3 focus:outline-none hover:bg-[#8f89ee] rounded text-base mt-4 md:mt-0">
            Sign In
            <FaArrowRight />
          </button> : null }
        </div>
      )}
    </nav>
  );
}

export default Navbar;
