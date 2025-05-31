import jwtDecode from "jwt-decode";

/**
 * Decodifica un token JWT.
 * 
 * @param {string} token - El token JWT a decodificar.
 * @returns {object|null} El contenido decodificado del token o null si es inválido.
 */
export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Token inválido:', error);
        return null;
    }
};
