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

/**
 * Valida si el valor de un input cumple con las reglas según su tipo.
 * @param {string} id - El ID del elemento input en el HTML.
 * @param {string} tipo - El tipo de validación ('texto', 'numero', 'email', 'vacio').
 * @returns {boolean} - true si es válido, false si no cumple las condiciones.
 */
function validarInput(id, tipo) {
    const inputElement = $ID(id);
    
    // Verificamos si el elemento realmente existe en el DOM
    if (!inputElement) {
        console.error(`No se encontró ningún elemento con el ID: ${id}`);
        return false;
    }

    const valor = inputElement.value.trim(); // Limpiamos espacios al inicio y al final

    // Validación general - Que no este vacio
    if (valor === "") {
        console.warn(`El campo con ID "${id}" está vacío.`);
        return false;
    }

    // Validaciones especificas según el tipo
    switch (tipo.toLowerCase()) {
        case 'texto':
            // Expresion regular: Solo letras (incluyendo acentos y espacios)
            const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!regexTexto.test(valor)) {
                console.warn(`El campo "${id}" debe contener solo texto (no números ni caracteres especiales).`);
                return false;
            }
            break;

        case 'numero':
            // Verificamos que sea un numero valido y que no sea un NaN (Not a Number)
            if (isNaN(valor) || isNaN(Number(valor))) {
                console.warn(`El campo "${id}" debe ser estrictamente un número.`);
                return false;
            }
            break;

        case 'email':
            // Validacion básica de estructura de correo electronico
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(valor)) {
                console.warn(`El campo "${id}" no tiene un formato de email válido.`);
                return false;
            }
            break;

        default:
            console.warn(`El tipo de validación "${tipo}" no está soportado. Se considerará válido solo por no estar vacío.`);
            break;
    }

    // Si paso todas las pruebas, es válido
    return true;
}
