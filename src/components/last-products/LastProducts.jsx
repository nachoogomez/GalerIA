import { Link } from 'react-router-dom'
import {formatPrice} from '../../utils/formatPrice'


const LastProducts = () => {
  
  return (
    <div className='flex flex-wrap flex-col items-center gap-7 mb-8 '>
    <div className='flex flex-wrap gap-4 justify-center'>
      <div>
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <img
            className="w-full h-full max-h-60 object-center object-fill "
            src= 'https://res.cloudinary.com/duslo5lw8/image/upload/v1730583744/Galeria/aedcmzziururvm7w4dkd.webp'
            alt= "product"
          />
          <div className="p-6">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-900">Prueba</h2>
              <p className="text-sm text-gray-600">Yo</p>
            </div>
              <p className="text-sm text-gray-500 mb-2">Año: 2024</p>
              <p className="text-sm text-gray-500 mb-2">{formatPrice(1000000)}</p>  
            </div>
        </div>
      </div>
      <div>
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <img
            className="w-full h-full max-h-60 object-center object-fill "
            src= 'https://res.cloudinary.com/duslo5lw8/image/upload/v1730583744/Galeria/aedcmzziururvm7w4dkd.webp'
            alt= "product"
          />
          <div className="p-6">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-900">Prueba</h2>
              <p className="text-sm text-gray-600">Yo</p>
            </div>
              <p className="text-sm text-gray-500 mb-2">Año: 2024</p>
              <p className="text-sm text-gray-500 mb-2">{formatPrice(1000000)}</p>  
            </div>
        </div>
      </div>
      <div>
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <img
            className="w-full h-full max-h-60 object-center object-fill "
            src= 'https://res.cloudinary.com/duslo5lw8/image/upload/v1730583744/Galeria/aedcmzziururvm7w4dkd.webp'
            alt= "product"
          />
          <div className="p-6">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-900">Prueba</h2>
              <p className="text-sm text-gray-600">Yo</p>
            </div>
              <p className="text-sm text-gray-500 mb-2">Año: 2024</p>
              <p className="text-sm text-gray-500 mb-2">{formatPrice(1000000)}</p>  
            </div>
        </div>
      </div>
    </div>
    <div className="mt-4">
          <Link to="/products" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Ver más
          </Link>
      </div>
  </div>
  )
}

export default LastProducts
