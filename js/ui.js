import { $ID, getPorcent } from "./utils.js";

// Agrupa y expone las referencias del DOM para las cuatro vistas principales
export const SECCIONES = {
  main: $ID("section-main"),
  manager: $ID("section-manager"),
  about: $ID("section-about"),
  teoria: $ID("section-teoria"),
};

// Itera sobre todas las secciones agregando la clase 'oculto' y remueve dicha clase de la seleccionada
export function mostrarSeccion(seccion) {
  Object.keys(SECCIONES).forEach((sec) => {
    if (SECCIONES[sec]) SECCIONES[sec].classList.add("oculto");
  });
  if (seccion) seccion.classList.remove("oculto");
}

// Modifica las dimensiones físicas de altura y el texto indicador del porcentaje de aprobación general
export function actualizarBarraProgreso(valorActual, valorMaximo) {
  const barra_progress = $ID("bar-progress");
  const text_progress = $ID("text-progress");

  let porcentaje = getPorcent(valorActual, valorMaximo);

  if (porcentaje < 0) porcentaje = 0;
  if (porcentaje > 100) porcentaje = 100;

  if (barra_progress) barra_progress.style.height = porcentaje + "%";
  if (text_progress) text_progress.textContent = porcentaje.toFixed(2) + "%";
}
