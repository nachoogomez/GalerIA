/**
 * Componente 'NewsCard' que representa una lista de eventos breves obtenidos de una API.
 *
 * Cada tarjeta muestra:
 * - Título enlazado
 * - Fecha del evento
 * - Breve descripción
 *
 * @param {object} props - Las props del componente.
 * @param {Array<Object>} props.events - Array de objetos de eventos a mostrar.
 * @returns {JSX.Element} Lista de tarjetas de noticias/eventos.
 */

const NewsCard = ({ events = [] }) => {
    return (
      <>
        {events.map((item, index) => (
          <div key={item.id || index}>

            {/* Título enlazado al evento */}
            <a 
              href={`https://www.artic.edu/events/${item.id}`}
              className="block mt-2 font-medium text-black-700 hover:underline hover:text-gray-500" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {item.title}
            </a>

            {/* Fecha del evento */}
            {item.start_date && (
                <p className="text-gray-500 text-sm mt-1">
                    Date: {new Date(item.start_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            )}
            
            {/* Breve descripción del evento */}
            {item.description && (
                <p className="text-gray-600 text-sm mt-2 truncate">
                    {item.description.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
            )}
          </div>
        ))}
      </>
    );
};

export default NewsCard;