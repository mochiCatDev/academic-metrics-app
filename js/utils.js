const $ID = (id) => { return document.getElementById(id) };
/*
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

// Funcion para promediar
const promediar = (arreglo, decimales) => {
  let sumaTotal = arreglo.reduce((acomulador, numeroActual) => { return acomulador + numeroActual }, 0);
  return parseFloat((sumaTotal/arreglo.length).toFixed(decimales));
};
