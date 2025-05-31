import { Link } from 'react-router-dom';
import hero from '../../assets/hero.webp';
import { Button } from '../ui/button';

/**
 * Componente 'Hero'
 * 
 * Renderiza la seccion principal de bienvenida con:
 * - Titulo de la galeria
 * - Descripcion
 * - Boton para abrir la galeria
 * - Imagen representativa
 * 
 * Es un componente estatico y no recibe props
 * 
 * @returns {JSX.Element} El elemento Hero
 */
const Hero = () => {
  return (
    <section className="text-white body-font bg-gray-900 w-full">
      <div className="container mx-auto flex px-5 py-6 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900">Gallery Art</h1>
          <p className="mb-8 leading-relaxed">
            Explore art in an innovative and accessible way. Our virtual gallery offers an immersive experience where you can browse works of different styles and artists from any device and anywhere in the world.
            We connect creativity with technology so that every visitor can enjoy a unique journey—whether out of curiosity, inspiration, or a passion for art.
            Enter, explore, and discover art like never before
          </p>
          <div className="flex justify-center">
            {/*Link a la galeria hecha en ThreeJS*/}
            <Button>
              <Link to="#" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Open Gallery
              </Link>
            </Button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 sm:hidden md:block">
          <img className="object-cover object-center rounded" alt="hero" src={hero} />
        </div>
      </div>
    </section>
  );
};

export default Hero;