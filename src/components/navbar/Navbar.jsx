import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 p-4">
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
          <Link to="/login" className="inline-flex text-white items-center bg-[#4F46E5] border-0 py-1 px-3 focus:outline-none  hover:bg-[#8f89ee] rounded text-base mt-4 md:mt-0">
          Sign In
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        </div>

        

        {/* Hamburger Icon for smaller screens */}
        <div className="md:hidden">
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

      {/* Dropdown menu for mobile */}
      {isOpen && (
        <div className="md:hidden">
          <a href="#about" className="block py-2 px-4 text-white hover:bg-blue-700">
            About
          </a>
          <a href="#services" className="block py-2 px-4 text-white hover:bg-blue-700">
            Products
          </a>
          <a href="#contact" className="block py-2 px-4 text-white hover:bg-blue-700">
            Contact
          </a>
          <button className="inline-flex text-white items-center bg-[#4F46E5] border-0 py-1 px-3 focus:outline-none  hover:bg-[#8f89ee] rounded text-base mt-4 md:mt-0">
          Sign In
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;


