// Variables Globales
const main = document.getElementById("section-main");
const manager = document.getElementById("section-manager");
const about = document.getElementById("section-about");

const todasLasSecciones = [main, manager, about];

// Funcion para mostrar una seccion y ocultar las demas de manera automatica
function mostrarSeccion(seccion) {
  todasLasSecciones.forEach((seccion) => {
    seccion.classList.add("oculto");
  });

  seccion.classList.remove("oculto");
}

// Eventos de clic a los botones
document.getElementById("btn-main").addEventListener("click", () => {
  mostrarSeccion(main);
});
document.getElementById("btn-manager").addEventListener("click", () => {
  mostrarSeccion(manager);
});
document.getElementById("btn-about").addEventListener("click", () => {
  mostrarSeccion(about);
});