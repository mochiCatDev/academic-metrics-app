import { $ID, promediar, getMedian, getModa } from "./utils.js";
import { dataMaterias, guardarEnStorage } from "./storage.js";
import { pintarBarras } from "./charts.js";
import { actualizarBarraProgreso } from "./ui.js";

// Inicialización controlada de variables globales y de renderizado básico de estilos
export let promedios = [0, 0, 0, 0, 0, 0];
const ELEMENT_PROM_DATA = $ID("data-promedio");
const ELEMENT_MEDIANA_DATA = $ID("data-mediana");
const ElEMENT_MODA_DATA = $ID("data-moda");
const ELEMENT_MEJOR_MATERIA_DATA = $ID("data-mejor-materia");
const ELEMENT_PEOR_MATERIA_DATA = $ID("data-peor-materia");

let colorPreferido = localStorage.getItem("colorFondo") || "light";
document.body.setAttribute("data-theme", colorPreferido);

// Calcula promedios parciales por materia, halla los extremos absolutos y actualiza todo el bloque informativo del DOM
export function sacarPromedios() {
  const keys = ["matematica", "ingles", "quimica", "biologia", "filosofia", "fisica"];
  let todasLasNotas = [];

  let maxProm = -1;
  let minProm = 11;
  let mejorMateriaGeneral = [];
  let peorMateriaGeneral = [];

  keys.forEach((key, idx) => {
    const notasMateria = dataMaterias[key].notas || [];
    const prom = promediar(notasMateria);
    promedios[idx] = prom;

    if (notasMateria.length > 0) {
      todasLasNotas.push(...notasMateria);
    }

    if (prom > maxProm) {
      maxProm = prom;
      mejorMateriaGeneral = [dataMaterias[key].nombre];
    } else if (prom === maxProm) {
      mejorMateriaGeneral.push(dataMaterias[key].nombre);
    }

    if (prom < minProm) {
      minProm = prom;
      peorMateriaGeneral = [dataMaterias[key].nombre];
    } else if (prom === minProm) {
      peorMateriaGeneral.push(dataMaterias[key].nombre);
    }
  });

  const promedioGeneral = promediar(promedios);
  const medianaGeneral = getMedian(todasLasNotas);
  const modaGeneral = getModa(todasLasNotas);

  if (ELEMENT_PROM_DATA) ELEMENT_PROM_DATA.innerHTML = `<strong>Promedio</strong><p>${promedioGeneral}</p>`;
  if (ELEMENT_MEDIANA_DATA) ELEMENT_MEDIANA_DATA.innerHTML = `<strong>Mediana</strong><p>${medianaGeneral}</p>`;
  if (ElEMENT_MODA_DATA) {
    ElEMENT_MODA_DATA.innerHTML = `<strong>Moda</strong><p>${Array.isArray(modaGeneral) ? modaGeneral.join(', ') : modaGeneral}</p>`;
  }

  const formateador = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

  if (ELEMENT_MEJOR_MATERIA_DATA && mejorMateriaGeneral.length > 0) {
    let textoMaterias = formateador.format(mejorMateriaGeneral);
    let titulo = mejorMateriaGeneral.length > 1 ? "Tus mejores materias son" : "Tu mejor materia es";
    ELEMENT_MEJOR_MATERIA_DATA.innerHTML = `<strong>${titulo}</strong><p>${textoMaterias}</p>`;
  }

  if (ELEMENT_PEOR_MATERIA_DATA && peorMateriaGeneral.length > 0) {
    let textoMaterias = formateador.format(peorMateriaGeneral);
    let titulo = peorMateriaGeneral.length > 1 ? "Tus peores materias son" : "Tu peor materia es";
    ELEMENT_PEOR_MATERIA_DATA.innerHTML = `<strong>${titulo}</strong><p>${textoMaterias}</p>`;
  }

  pintarBarras();
  actualizarBarraProgreso(promedioGeneral, 10);
}

// Agrega valores numéricos válidos a un vector objetivo, guardando el cambio en memoria externa y refrescando vistas
export function agregarNota(id, arreglo, divTabla) {
  let inputElem = $ID(id);
  if (!inputElem) return;
  let valor = parseFloat(inputElem.value);
  if (!isNaN(valor)) {
    arreglo.push(valor);
    guardarEnStorage();
    sacarPromedios();
    inputElem.value = "";

    let tabla = $ID(divTabla);
    if (tabla) {
      let fila = document.createElement("span");
      fila.className = "nota-badge";
      fila.textContent = valor.toFixed(2);
      tabla.appendChild(fila);
    }
  }
}

// Vacía por completo las calificaciones de un área específica solicitando previa ratificación del usuario
export function limpiarNotasMateria(idMateria) {
  if (dataMaterias[idMateria]) {
    if (confirm(`¿Deseas borrar todas las notas de la materia: ${dataMaterias[idMateria].nombre}?`)) {
      dataMaterias[idMateria].notas = [];
      dataMaterias[idMateria].tareas = [];
      guardarEnStorage();
      sacarPromedios();
    }
  }
}

// Alterna la propiedad cromática 'data-theme' del body guardando la preferencia del usuario
export function cambiarModos() {
  const temaActual = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", temaActual);
  localStorage.setItem("colorFondo", temaActual);
  pintarBarras();
}

// Ejecución inicial obligatoria para popular la app al cargar
sacarPromedios();

// Carga por efecto secundario los eventos del DOM vinculados
import "./events.js";
