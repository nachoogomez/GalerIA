/**
 * Componente que muestra la información visual de un producto en forma de tarjeta.
 * 
 * Incluye una imagen (con placeholder o estado de carga), el nombre, la descripción
 * y un botón para ver más detalles.  
 * Maneja los estados de carga y error de la imagen para mejorar la experiencia visual.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.nombre - Nombre o título del producto.
 * @param {string} props.descripcion - Descripción breve del producto.
 * @param {string} props.imagenUrl - URL principal de la imagen del producto.
 * @param {string} props.placeholderUrl - Imagen base64 de baja resolución usada como placeholder.
 * 
 * @returns {JSX.Element} Tarjeta con los datos del producto.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";

const CardProduct = ({ nombre, descripcion, imagenUrl, placeholderUrl }) => {
  // Estado para manejar la carga y errores de la imagen
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden h-[480px] flex flex-col">
      <div className="w-full h-60 bg-gray-200 relative flex items-center justify-center">
        <img
          src={imagenUrl || placeholderUrl}
          alt={nombre || "Producto"}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoading ? "blur-sm scale-105" : "blur-0 scale-100"
          }`}
          loading="lazy"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageError(true)}
        />
        {imageLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Uploading...</span>
          </div>
        )}
        {imageError && (
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{nombre}</h2>
        <p className="text-sm text-gray-700 mb-4 flex-grow line-clamp-3">{descripcion}</p>
        <Button>See more</Button>
      </div>
    </div>
  );
};

export default CardProduct;

