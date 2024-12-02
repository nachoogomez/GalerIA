import { Button } from "@/components/ui/button"

const CardProduct = ({ id, nombre, imagen, descripcion }) => {
  const imageUrl = `http://localhost:3000/${imagen}`;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="w-auto h-60">
        <img
          className="w-full h-full object-fill"
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
          <Button >
            Ver más
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;