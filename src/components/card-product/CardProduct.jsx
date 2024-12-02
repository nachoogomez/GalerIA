const CardProduct = ({ id, nombre, imagen, descripcion }) => {

  const imageUrl = `http://localhost:3000/${imagen}`;  
         
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden scroll-px-2"> 
      <div className="w-full h-60">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={id}
          />
       </div>
      <div className="p-6">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900">{nombre}</h2>
        </div>
        <p className="text-sm text-gray-700 mb-4">    
          {descripcion}
        </p>
        <div className="mt-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;