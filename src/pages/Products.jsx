import { useEffect, useState } from "react";
import CardProduct from "../components/card-product/CardProduct";
import { fetchProducts } from "@/axios/products";
import Spinner from "@/components/ui/Spinner";

/**
 * Página de productos.
 * 
 * - Obtiene la lista de productos desde el backend al montar el componente.
 * - Muestra un spinner mientras se cargan los datos.
 * - Si no hay productos, muestra un mensaje.
 * - Renderiza una tarjeta (CardProduct) por cada producto disponible.
 *
 * @returns JSX.Element
 */
const Products = () => {
  const [products, setProducts] = useState([]); // useState para guardar los productos
  const [isLoading, setIsLoading] = useState(true);  // useState para mostrar el spinner

  // useEffect para obtener los productos
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();  // Función para obtener los productos
      setProducts(fetchedProducts); // Guarda los productos en el estado
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    };

    getProducts();
  }, []);

  // Si isLoading es true, muestra el spinner
  if (isLoading) return <Spinner />; 
  // Si no hay productos, muestra un mensaje
  if (!products.length) return <p className="flex items-center text-2xl font-bold h-screen">
      No items available
    </p>;

  return (
    <section className="max-w-screen-xl flex flex-wrap gap-5 justify-items-center mt-6 px-4">
      {/* Mapea los productos y muestra un CardProduct por cada uno */}
      {products.map((producto) => (
        <CardProduct {...producto} key={producto.id} />
      ))}
    </section>
  );
};

export default Products;