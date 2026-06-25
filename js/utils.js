/**
 * Busca y retorna un elemento del DOM utilizando su atributo `id`.
 * Es un alias para `document.getElementById`.
 *
 * @param {string} id - El identificador único (ID) del elemento HTML que se desea
 * seleccionar.
 * @returns {HTMLElement|null} El elemento del DOM correspondiente al ID especificado,
 * o `null` si no se encuentra ninguna coincidencia.
*/
export const $ID = (id) => document.getElementById(id);

/**
 * Funcion que asigna un evento de click de manera facil y segura.
 * @param {string} selector - Selector (ej: '#btn', '.btn-enviar', 'button')
 * @param {Function} callback - Función a ejecutar
 * @returns {void}
 */
export const onClick = (selector, callback) => {
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
export const promediar = (arreglo, decimales = 2) => {
  if (!Array.isArray(arreglo) || arreglo.length === 0) return 0;
  const suma = arreglo.reduce((acc, val) => acc + val, 0);
  return parseFloat((suma / arreglo.length).toFixed(decimales));
};

/**
 * Calcula qué porcentaje representa una cantidad parcial respecto a un total.
 * Ej: 10 de un total de 50 representa el 20%.
 *
 * @param {number} valorActual - La cantidad o parte actual.
 * @param {number} valorMaximo - La cantidad máxima o total (representa el 100%).
 * @returns {number} El porcentaje que representa la parte parcial (de 0 a 100).
 */
export const getPorcent = (valorActual, valorMaximo) => {
  if (valorMaximo === 0) return 0;
  return (valorActual / valorMaximo) * 100;
};

/**
 * Calcula la mediana de un array de números.
 * @param {Array<number>} numbers - El array de números a evaluar.
 * @returns {number} La mediana de los números.
 * @throws {Error} Si el parámetro no es un array válido o está vacío.
 */
export const getMedian = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/**
 * Calcula la moda de un array de números.
 * Puede retornar un número (unimodal), un array de números (multimodal)
 * o null si no existe ninguna moda.
 *
 * @param {number[]} arreglo - Array de números a evaluar.
 * @returns {number|number[]|null} La moda, un array de modas, o null si no hay moda.
 */
export const getModa = (arreglo) => {
  if (!Array.isArray(arreglo) || arreglo.length === 0) return "N/A";
  const frecuencias = {};
  let maxRepeticiones = 0;
  arreglo.forEach((numero) => {
    frecuencias[numero] = (frecuencias[numero] || 0) + 1;
    if (frecuencias[numero] > maxRepeticiones) {
      maxRepeticiones = frecuencias[numero];
    }
  });
  if (maxRepeticiones <= 1) return "No hay moda";
  const modas = Object.keys(frecuencias).filter((numero) => frecuencias[numero] === maxRepeticiones).map(Number);
  return modas.length === 1 ? modas[0] : modas;
};

/**
 * Valida si el valor de un input cumple con las reglas según su tipo.
 * @param {string} id - El ID del elemento input en el HTML.
 * @param {string} tipo - El tipo de validación ('texto', 'numero', 'email', 'vacio').
 * @param {string} idError - El ID del elemento span en el HTML.
 * @returns {void}
 */
export const validarInput = (id, tipo, idError) => {
  const input = $ID(id);
  const errorElement = $ID(idError);
  if (!input) return false;

  let valido = true;
  let valor = input.value.trim();

  if (tipo === "numero") {
    const num = parseFloat(valor);
    if (isNaN(num) || num < 0 || num > 10) {
      valido = false;
    }
  } else if (valor === "") {
    valido = false;
  }

  if (errorElement) {
    errorElement.style.display = valido ? "none" : "block";
  }
  return valido;
};
