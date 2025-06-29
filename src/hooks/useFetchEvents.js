import { useState, useEffect } from 'react';

/**
 * Hook personalizado para obtener los eventos mas recientes de la API de Art Institute of Chicago.
 * 
 * Realiza una peticion unica al carger el componente y devuelve los eventos obtenidos.
 * *
 *  @returns {Object} Un objeto que contiene los datos del hook:
 *  @returns {Array<Object>} data - Array de eventos obtenidos.
 *  @returns {boolean} loading - Indica si se están cargando los datos.
 *  @returns {string|null} error - Mensaje de error en caso de fallo.
 */
const useFetchEvents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLatestEvents = async () => {
      setLoading(true);
      setError(null);
      
      const API_URL = 'https://api.artic.edu/api/v1/events?sort=start_date%20desc&limit=3';

      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Error de red: ${response.statusText}`);
        }

        const json = await response.json();
        
        // La API devuelve los resultados en el campo 'data'
        setData(json.data || []); 

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // La petición se ejecuta una sola vez, esto garantiza que siempre obtengan los últimos eventos
    fetchLatestEvents();
  }, []); // El array de dependencias vacío asegura que la petición se haga solo una vez 

  return { data, loading, error };
};

export default useFetchEvents;