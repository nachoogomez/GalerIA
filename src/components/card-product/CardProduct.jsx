


import { useState } from "react";
import { Button } from "@/components/ui/button";

const CardProduct = ({ nombre, descripcion, imagenUrl, placeholderUrl }) => {
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
            <span className="text-gray-500">Cargando...</span>
          </div>
        )}
        {imageError && (
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
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

