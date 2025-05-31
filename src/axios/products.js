import axios from "axios";  

const API_URL = "http://localhost:3000/api/v1";

/**
 * Obtiene la lista de productos disponibles
 * 
 * Metodo: GET
 * EndPoint: /producto
 * Referencia Swagger: GET /producto
 * 
 * @async
 * @function fetchProducts
 * @returns {Promise<Object>} Lista de productos
 * @throws {Error} Si ocurre un error al obtener los productos 
 */
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/producto`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
}

/**
 * Crea un nuevo producto con los datos proporcionados
 * 
 * Metodo: POST
 * EndPoint: /producto
 * Referencia Swagger: POST /producto
 * 
 * @async
 * @function createProduct
 * @param {FormData} productData - Datos del producto 
 * @param {string} token - Token JWT de autenticacion del Super 
 * @returns {Promise<Object>} Producto creado
 * @throws {Error} Si ocurre un error al crear el producto
 */
export const createProduct = async (productData, token) => {
    try {
        const response = await axios.post(`${API_URL}/producto`, productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
}

/**
 * Actualiza un producto existente por su ID
 * 
 * Metodo: PATCH
 * EndPoint: /producto/:id
 * Referencia Swagger: PATCH /producto/{id} 
 *
 * @async
 * @function updateProduct
 * @param {string} id - ID del producto a actualizar
 * @param {FormData} productData - Datos nuevos del producto 
 * @param {string} token - Token JWT de autenticacion del Super 
 * @returns {Promise<Object>} Producto actualizado
 * @throws {Error} Si ocurre un error al actualizar el producto
 */
export const updateProduct = async (id, productData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/producto/${id}`, productData, {
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'multipart/form-data',
                
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
}

/**
 * Elimina un producto por su ID
 * 
 * Metodo: DELETE
 * EndPoint: /producto/:id
 * Referencia Swagger: DELETE /producto/{id}
 * 
 * @async
 * @function deleteProduct
 * @param {string} id - ID del producto a eliminar 
 * @param {string} token - Token JWT de autenticacion del Super 
 * @returns {Promise<void>} No retorna datos si la eliminacion es exitosa
 * @throws {Error} Si ocurre un error al eliminar el producto
 */
export const deleteProduct = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/producto/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
};