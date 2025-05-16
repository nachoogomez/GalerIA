/**
 * Valida la estructura básica de un email según reglas comunes.
 * 
 * @type {RegExp}
 */
export const regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;