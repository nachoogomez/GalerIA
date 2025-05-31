import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Funcion que combina las clases de tailwind y clsx
 * 
 * @param  {...(string| undefined |false | null)} inputs - Lista de clases condicionales
 * @returns {string} Clase combinada
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
