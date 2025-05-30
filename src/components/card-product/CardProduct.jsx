//Boton de ver más de Shadcn
import { Button } from "@/components/ui/button"

/**
 * Componente que representa una tarjeta de producto
 * 
 * Muestra la imagen, nombre, descripcion y un boton de "See more"
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - Id del producto
 * @param {string} props.nombre - Nombre del producto
 * @param {string} props.imagen - Ruta relativa de la imagen del producto
 * @param {string} props.descripcion - Descripcion del producto
 * @returns {JSX.Element} Tarjeta visual del producto
 */
const CardProduct = ({ id, nombre, imagen, descripcion }) => {

  //imageUrl es la ruta de la imagen
  const imageUrl = `http://localhost:3000/${imagen}`;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="w-auto h-60">
        <img
          className="w-full h-full object-fill"
          src={imageUrl}
          alt={id}
        />
      </div>
      <div className="p-6">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900">
            {nombre}
          </h2>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          {descripcion}
        </p>
        <div className="mt-4">
          <Button >
            See more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;