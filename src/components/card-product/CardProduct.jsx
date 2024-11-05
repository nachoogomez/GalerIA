import { formatPrice } from "../../utils/formatPrice"

const CardProduct = ({title, price, imageUrl, artist, description, year}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <img
        className="w-full h-full max-h-60 object-center object-fill "
        src= {imageUrl}
        alt= {title}
      />
      <div className="p-6">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{artist}</p>
        </div>
        <p className="text-sm text-gray-500 mb-2">Año: {year}</p>
        <p className="text-sm text-gray-500 mb-2">{formatPrice(price)}</p>
        <p className="text-sm text-gray-700 mb-4">
          {description}
        </p>
        <div className="mt-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Ver más
          </button>
        </div>
      </div>
  </div>
  )
}

export default CardProduct