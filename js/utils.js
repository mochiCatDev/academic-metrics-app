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
 * @returns {void}
 */
export const promediar = (arreglo, decimales = 2) => {
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
export const getPorcent = (parcial, total, decimales = 2) => {
  if (!total || total === 0) return 0;

  const porcentaje = (parcial / total) * 100;
  return parseFloat(porcentaje.toFixed(decimales));
};

/**
 * Valida si el valor de un input cumple con las reglas según su tipo.
 * @param {string} id - El ID del elemento input en el HTML.
 * @param {string} tipo - El tipo de validación ('texto', 'numero', 'email', 'vacio').
 * @param {string} span - El ID del elemento span en el HTML.
 * @returns {void}
 */
export function validarInput(id, tipo, span) {
    const inputElement = $ID(id);
    const spanElement = $ID(span);
    const tipoInput = tipo.toLowerCase();

    if (!inputElement) {
        console.error(`No se encontró ningún elemento con el ID: ${id}`);
        return false;
    }
    if (!spanElement) {
        console.error(`No se encontró ningún span con el ID: ${span}`);
        return false;
    }

    let valor = inputElement.value.trim();
    spanElement.classList.add("oculto");
    spanElement.textContent = "";

    if (valor === "") {
        spanElement.classList.remove("oculto");
        spanElement.textContent = `El campo está vacío.`;
        return false;
    }

    if (tipoInput == "texto") {
        const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regexTexto.test(valor)) {
            spanElement.classList.remove("oculto");
            spanElement.textContent = `El campo debe contener solo texto`;
            return false;
        }
    }
    else if (tipoInput == "numero") {
        if (isNaN(valor) || isNaN(Number(valor))) {
            spanElement.classList.remove("oculto");
            spanElement.textContent = `El campo debe ser estrictamente un número.`;
            return false;
        }
    }
    else {
        console.warn(`Se desconoce el tipo: ${tipo}`)
        return false;
    }

    return true;
}

/**
 * Calcula la mediana de un array de números.
 * @param {Array<number>} numbers - El array de números a evaluar.
 * @returns {number} La mediana de los números.
 * @throws {Error} Si el parámetro no es un array válido o está vacío.
 */
export const getMedian = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("El argumento debe ser un array no vacío de números.");
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
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
  if (!Array.isArray(arreglo) || arreglo.length === 0) return null;

  const frecuencias = {};
  let maxRepeticiones = 0;

  arreglo.forEach((numero) => {
    frecuencias[numero] = (frecuencias[numero] || 0) + 1;
    if (frecuencias[numero] > maxRepeticiones) {
      maxRepeticiones = frecuencias[numero];
    }
  });

  if (maxRepeticiones === 1) return null;

  const modas = [];
  for (const numero in frecuencias) {
    if (frecuencias[numero] === maxRepeticiones) {
      modas.push(Number(numero));
    }
  }

  return modas.length === 1 ? modas[0] : modas;
};
