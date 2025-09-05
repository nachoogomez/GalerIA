import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase/config";

/**
 * Componente 'LastProducts' que muestra los 3 ultimos productos obtenidos desde Firebase
 * 
 * Funcionalidades:
 * - Obtiene los productos al montar el componente mediante un hook useEffect.
 * - Ordena los productos por fecha de creación y selecciona los últimos 3.
 * - Maneja el estado local para almacenar los productos.
 * - Si no hay productos, muestra un mensaje indicándolo.
 * - Renderiza tarjetas con la imagen, nombre y descripción de cada producto.
 * - Incluye un botón con enlace para ver más productos.
 * 
 * @returns {JSX.Element} El elemento LastProducts
 */
const LastProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Hook de efecto que se ejecuta al montar el componente
   * Obtiene los últimos 3 productos desde Firebase en tiempo real
   */
  useEffect(() => {
    const productsCollection = collection(db, "products");
    // Query para obtener los últimos 3 productos ordenados por fecha de creación
    const q = query(
      productsCollection, 
      orderBy("createdAt", "desc"), 
      limit(3)
    );

    // Listener en tiempo real para los productos
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching last products:", error);
      setLoading(false);
    });

    // Cleanup function para desuscribirse del listener
    return () => unsubscribe();
  }, []);

  // Componente para manejar la imagen del producto desde Firebase
  const ProductImage = ({ imagen, nombre }) => {
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
          console.log("Loading image in LastProducts:", imagen);
          
          // Si la imagen ya es una URL completa de Firebase, la usamos directamente
          if (imagen.includes('firebasestorage.googleapis.com') || imagen.startsWith('http')) {
            console.log("Using direct URL in LastProducts:", imagen);
            setImageUrl(imagen);
            setImageLoading(false);
            return;
          }

          // Si no es una URL, obtenemos la URL de descarga de Firebase Storage
          console.log("Getting download URL for path in LastProducts:", imagen);
          const imageRef = ref(storage, imagen);
          const url = await getDownloadURL(imageRef);
          console.log("Generated download URL in LastProducts:", url);
          setImageUrl(url);
          setImageLoading(false);
        } catch (error) {
          console.error("Error loading image from Firebase in LastProducts:", error);
          console.error("Image path/URL was:", imagen);
          setImageError(true);
          setImageLoading(false);
        }
      };

      loadImage();
    }, [imagen]);

    if (imageLoading) {
      return (
        <div className="w-full h-60 bg-gray-300 animate-pulse flex items-center justify-center">
          <span className="text-gray-500">Cargando...</span>
        </div>
      );
    }

    if (imageError || !imageUrl) {
      return (
        <div className="w-full h-60 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Sin imagen</span>
        </div>
      );
    }

    return (
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt={nombre}
        onError={() => setImageError(true)}
      />
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!products.length) {
    return <p>No artwork available</p>;
  }

  return (
    <div className='flex flex-col items-center gap-7 mb-8 px-4'>
      <div className='flex gap-4 flex-wrap justify-center sm:flex-col md:flex-col lg:flex-col xl:flex-row'>
        {products.map((product) => (
          <div key={product.id}>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden h-[400px] flex flex-col">
              <div className="w-full h-60 flex-shrink-0">
                <ProductImage imagen={product.imagen} nombre={product.nombre} />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2 flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{product.nombre}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3 mt-2">{product.descripcion}</p>
                </div>              
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button>
          <Link to="/products">
            See more
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LastProducts;