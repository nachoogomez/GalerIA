import CardProduct from "../components/card-product/CardProduct";
import Spinner from "@/components/ui/Spinner";
import { useProducts } from "@/hooks/useProducts";

/**
 * Página de productos.
 * 
 * - Obtiene la lista de productos desde Firebase en tiempo real.
 * - Muestra un spinner mientras se cargan los datos.
 * - Si no hay productos, muestra un mensaje.
 * - Renderiza una tarjeta (CardProduct) por cada producto disponible.
 *
 * @returns {JSX.Element} Página de productos
 */
const Products = () => {
  const { products, loading: isLoading, error } = useProducts();

  // Si isLoading es true, muestra el spinner
  if (isLoading) return <Spinner />; 
  // Si hay un error, muestra el mensaje de error
  if (error) return <p className="flex items-center text-2xl font-bold h-screen text-red-500">
      Error: {error}
    </p>;
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