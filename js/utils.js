/**
 * Busca y retorna un elemento del DOM utilizando su atributo `id`.
 * Es un alias minimalista para `document.getElementById`.
 *
 * @param {string} id - El identificador único (ID) del elemento HTML que se desea seleccionar.
 * @returns {HTMLElement|null} El elemento del DOM correspondiente al ID especificado, 
 * o `null` si no se encuentra ninguna coincidencia.
 */
 
const $ID = (id) => document.getElementById(id);

/**
 * Helper para asignar eventos click de forma segura y sencilla
 * @param {string} selector - Selector CSS (ej: '#btn', '.btn-enviar', 'button')
 * @param {Function} callback - Función a ejecutar
 */
 
const onClick = (selector, callback) => {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener("click", callback);
  } else {
    console.warn(`onClick: El elemento "${selector}" no se encontró en el DOM.`);
  }
};

/**
 * Calcula el promedio de los números en un arreglo, 
 * redondeado a una cantidad específica de decimales.
 *
 * @param {number[]} arreglo - Array de números a promediar.
 * @param {number} [decimales=2] - Número de decimales para el redondeo (por defecto es 2).
 * @returns {number} El promedio de los números, o 0 si el arreglo está vacío.
 */
 
const promediar = (arreglo, decimales = 2) => {
  if (!arreglo || arreglo.length === 0) return 0;
  const sumaTotal = arreglo.reduce((acumulador, numeroActual) => acumulador + numeroActual, 0);
  return parseFloat((sumaTotal / arreglo.length).toFixed(decimales));
};

/**
 * Calcula qué porcentaje representa una cantidad parcial respecto a un total.
 * Ej: 10 de un total de 50 representa el 20%.
 *
 * @param {number} parcial - La cantidad o parte actual.
 * @param {number} total - La cantidad máxima o total (representa el 100%).
 * @param {number} [decimales=2] - Cantidad de decimales para el redondeo (por defecto 2).
 * @returns {number} El porcentaje que representa la parte parcial (de 0 a 100).
 */
 
const obtenerPorcentajeDelTotal = (parcial, total, decimales = 2) => {
  if (!total || total === 0) return 0;
  
  const porcentaje = (parcial / total) * 100;
  return parseFloat(porcentaje.toFixed(decimales));
};
