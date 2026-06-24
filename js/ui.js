export const SECCIONES = {
  main: $ID("section-main"),
  manager: $ID("section-manager"),
  about: $ID("section-about"),
  teoria: $ID("section-teoria"),
};

export function mostrarSeccion(seccion) {
  Object.keys(SECCIONES).forEach((secciones) =>
    SECCIONES[secciones].classList.add("oculto"),
  );
  seccion.classList.remove("oculto");
}

export function actualizarBarraProgreso(valorActual, valorMaximo) {
  const barra_progress = $ID("bar-progress");
  const text_progress = $ID("text-progress");

  let porcentaje = getPorcent(valorActual, valorMaximo);

  if (porcentaje < 0) porcentaje = 0;
  if (porcentaje > 100) porcentaje = 100;

  barra_progress.style.height = porcentaje + "%";
  text_progress.textContent = porcentaje + "%";
}
