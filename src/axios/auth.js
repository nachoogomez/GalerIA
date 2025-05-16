import axios from 'axios';

const API_URL = import.meta.env.API_URL;

/**
 * Crea un nuevo usuario con el email y la contraseña proporcionados.
 * 
 * Metodo: POST
 * EndPoint: /user/register
 * Referencia Swagger: POST /user/register
 * 
 * @param {string} email - El email del nuevo usuario.
 * @param {string} password - La contraseña del nuevo usuario.
 * @returns {Object} - Los datos del usuario creado.
 * @throws {Error} - Si ocurre un error al crear el usuario.
 */
export const createUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, {
            email,
            password
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Inicia sesión con el email y la contraseña proporcionados.
 * 
 * Metodo: POST
 * EndPoint: /auth/login
 * Referencia Swagger: POST /auth/login
 * 
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Object} - Los datos del usuario autenticado.
 * @throws {Error} - Si el email o la contraseña son incorrectos.
 */
export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Email or password incorrect');
    }
  };

