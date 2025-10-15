import CardProduct from "@/components/card-product/CardProduct";
import Spinner from "@/components/ui/Spinner";
import { useProducts } from "@/hooks/useProducts";

/**
 * Componente Products
 * 
 * Renderiza las obras de arte
 * Maneja los estados de carga, error y lista vacia
 * 
 * - Muestra un spinner mientras los datos se estan cargando
 * - Muestra un mensaje de error en caso de fallo
 * - Muestra un mensaje si no hay obras de arte disponibles
 * - Renderiza las obras de arte en tarjetas
 */
const Products = () => {
  //Hook personalizado para obtener los productos y estados de carga/error
  const { products, loading, error } = useProducts();

  //Muestra el spinner
  if (loading) return <Spinner />;

  //Muestra el mensaje de error
  if (error) return <p className="text-red-500 text-2xl">{error}</p>;

  //Muestra un mensaje si no hay obras de arte
  if (!products.length) return <p className="text-2xl">No items available</p>;

  //Renderiza las obras de arte
  return (
    <section className="max-w-screen-xl flex flex-wrap gap-5 justify-items-center mt-6 px-4">
      {products.map((product) => (
        <CardProduct key={product.id} nombre={product.nombre} descripcion={product.descripcion} imagenUrl={product.imagen} />
      ))}
    </section>
  );
};

export default Products;
