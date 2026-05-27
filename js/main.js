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

// Funcion para que la barra se llene con el porcentaje que se le de
function actualizarBarraProgreso(valorActual, valorMaximo) {
    const barra_progress = document.getElementById("bar-progress");
    const text_progress = document.getElementById("text-progress");

    let porcentaje = (valorActual / valorMaximo) * 100;
    
    if (porcentaje < 0) porcentaje = 0;
    if (porcentaje > 100) porcentaje = 100;

    barra_progress.style.height = porcentaje + '%';
    text_progress.textContent = porcentaje + '%';
}


actualizarBarraProgreso(1,100);

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