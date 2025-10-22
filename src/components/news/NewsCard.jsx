import DOMPurify from 'dompurify';

/**
 * Componente 'NewsCard' que representa una lista de eventos breves obtenidos de una API.
 *
 * Cada tarjeta muestra:
 * - Título enlazado
 * - Fecha del evento
 * - Breve descripción (sanitizada con DOMPurify para prevenir XSS)
 *
 * @param {object} props - Las props del componente.
 * @param {Array<Object>} props.events - Array de objetos de eventos a mostrar.
 * @returns {JSX.Element} Lista de tarjetas de noticias/eventos.
 */

/**
 * Sanitiza y limpia el HTML de una descripción, eliminando todas las etiquetas HTML.
 *
 * @param {string} description - El texto HTML a sanitizar.
 * @returns {string} Texto plano sin etiquetas HTML.
 */

const sanitizeDescription = (description) => {
  if (!description) return '';

  // Primero sanitizamos el HTML con DOMPurify para eliminar contenido malicioso
  const sanitized = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: [], // No permitimos ninguna etiqueta HTML
    ALLOWED_ATTR: [], // No permitimos ningún atributo
    KEEP_CONTENT: true // Mantenemos el contenido de texto
  });

  // Decodificamos entidades HTML si quedan (ej: &amp; -> &)
  const textArea = document.createElement('textarea');
  textArea.innerHTML = sanitized;

  return textArea.value;
};

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
                    {sanitizeDescription(item.description)}
                </p>
            )}
          </div>
        ))}
      </>
    );
};

export default NewsCard;