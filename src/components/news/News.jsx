import NewsCard from "./NewsCard";
import useFetchEvents from "../../hooks/useFetchEvents";

/**
 * Componente ´News` 
 * 
 * Muestra la sección de últimas noticias de arte.
 *
 * Incluye:
 * - Título
 * - Imagen destacada con texto (estática)
 * - Una lista de eventos recientes en tarjetas (dinámicas desde la API)
 *
 * @returns {JSX.Element} Sección visual con noticias de arte obtenidas de la API.
 */
const News = () => {
    // Se usa para obtener los datos de la API.
    const { data: events, loading, error } = useFetchEvents();

    // Si la información está cargando o hay un error, muestra un mensaje.
    if (loading) {
        return <p className="text-white text-center mt-10">Cargando eventos...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center mt-10">Error al cargar los eventos: {error}</p>;
    }

    return (
        // Estructura de la sección de noticias
        <section>
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900 text-center mt-10">
                Latest Art News
            </h1>
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:flex lg:-mx-6">
                    {/* Imagen destacada*/}
                    <div className="lg:w-3/4 lg:px-6">
                        <img 
                            className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl" 
                            src="https://images.pexels.com/photos/3779191/pexels-photo-3779191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Imagen destacada de arte"
                        />
                    </div>

                    {/* Lista de tarjetas de noticias */}
                    <div className="mt-8 lg:w-1/4 lg:mt-4 lg:px-6 flex gap-10 flex-col">
                        {events.length > 0 ? (
                            <NewsCard events={events} /> 
                        ) : (
                            <p className="text-white">No se encontraron eventos recientes.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;