//Icons
import { MdPhone, MdMail, MdLocationOn } from 'react-icons/md'

/**
 * Componente 'ContactInfo'
 * 
 * Muestra info de contacto estatica incluyendo telefono, email y direccion
 * Utiliza iconos de 'react-icons/md' para representar cada tipo
 * Es informativo
 * 
 * @returns {JSX.Element} Informacion de contacto visual
 */
const ContactInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Contact Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <MdPhone className="w-5 h-5 text-blue-600 mr-2" />
          <span>+54 (299) 507-2494</span>
        </div>
        <div className="flex items-center">
          <MdMail className="w-5 h-5 text-blue-600 mr-2" />
          <span>contact@example.com</span>
        </div>
        <div className="flex items-center">
          <MdLocationOn className="w-5 h-5 text-blue-600 mr-2" />
          <span>Calle 123, Cipolletti, Argentina</span>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo