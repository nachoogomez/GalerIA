import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../axios/products';

const LastProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const lastThreeProducts = fetchedProducts.sort((a, b) => b.id - a.id).slice(0, 3);
        setProducts(lastThreeProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    getProducts();
  }, []);

  if (!products.length) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className='flex flex-wrap flex-col items-center gap-7 mb-8 '>
      <div className='flex flex-wrap gap-4 justify-center'>
        {products.map((product) => (
          <div key={product.id}>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="w-full h-60">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:3000/${product.imagen}`} 
                  alt={product.nombre}
                />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{product.nombre}</h2>
                  <p className="text-sm text-gray-600">{product.descripcion}</p>
                </div>              
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/products" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default LastProducts;
