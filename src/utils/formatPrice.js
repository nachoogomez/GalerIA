/**
 * Formatea un número como precio en dólares estadounidenses.
 * @param {number} price - El valor numérico a formatear.
 * @returns {string} El precio formateado como cadena (ej. "$1,000.00").
 */
export const formatPrice = price => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};