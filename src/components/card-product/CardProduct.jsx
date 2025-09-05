//Boton de ver más de Shadcn
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase/config";

/**
 * Componente que representa una tarjeta de producto
 * 
 * Muestra la imagen, nombre, descripcion y un boton de "See more"
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - Id del producto
 * @param {string} props.nombre - Nombre del producto
 * @param {string} props.imagen - Path de Firebase Storage o URL de descarga de la imagen
 * @param {string} props.descripcion - Descripcion del producto
 * @returns {JSX.Element} Tarjeta visual del producto
 */
const CardProduct = ({ id, nombre, imagen, descripcion }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!imagen) {
        setImageLoading(false);
        setImageError(true);
        return;
      }

      try {
        console.log("Loading image:", imagen);
        
        // Si la imagen ya es una URL completa de Firebase (contiene firebasestorage.googleapis.com), la usamos directamente
        if (imagen.includes('firebasestorage.googleapis.com') || imagen.startsWith('http')) {
          console.log("Using direct URL:", imagen);
          setImageUrl(imagen);
          setImageLoading(false);
          return;
        }

        // Si no es una URL, asumimos que es un path de Firebase Storage
        console.log("Getting download URL for path:", imagen);
        const imageRef = ref(storage, imagen);
        const url = await getDownloadURL(imageRef);
        console.log("Generated download URL:", url);
        setImageUrl(url);
        setImageLoading(false);
      } catch (error) {
        console.error("Error loading image from Firebase:", error);
        console.error("Image path/URL was:", imagen);
        setImageError(true);
        setImageLoading(false);
      }
    };

    loadImage();
  }, [imagen]);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden h-[480px] flex flex-col">
      <div className="w-auto h-60 bg-gray-200 flex items-center justify-center flex-shrink-0">
        {imageLoading ? (
          <div className="animate-pulse bg-gray-300 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Cargando...</span>
          </div>
        ) : imageError || !imageUrl ? (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        ) : (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={nombre || "Producto"}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
            {nombre}
          </h2>
        </div>
        <p className="text-sm text-gray-700 mb-4 flex-grow line-clamp-3">
          {descripcion}
        </p>
        <div className="mt-auto">
          <Button >
            See more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;