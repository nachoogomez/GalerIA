import { useEffect, useState } from "react";
import CardProduct from "../components/card-product/CardProduct";
import { fetchProducts } from "@/axios/products";
import Spinner from "@/components/ui/Spinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    };

    getProducts();
  }, []);

  if (isLoading) return <Spinner />; 
  if (!products.length) return <p className="flex items-center text-2xl font-bold h-screen">
      No hay productos disponibles.
    </p>;

  return (
    <section className="max-w-screen-xl flex flex-wrap gap-5 justify-items-center mt-6 px-4">
      {products.map((producto) => (
        <CardProduct {...producto} key={producto.id} />
      ))}
    </section>
  );
};

export default Products;