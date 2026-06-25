import { $ID, promediar, getMedian, getModa } from "./utils.js";
import { dataMaterias, guardarEnStorage } from "./storage.js";
import { pintarBarras } from "./charts.js";
import { actualizarBarraProgreso } from "./ui.js";

// Inicialización controlada de variables globales y de renderizado básico de estilos
export let promedios = [];

const ELEMENT_DATA = {
  promedio: $ID("data-promedio"),
  mediana: $ID("data-mediana"),
  moda: $ID("data-moda"),
  mejorMateria: $ID("data-mejor-materia"),
  peorMateria: $ID("data-peor-materia")
}

let colorPreferido = localStorage.getItem("colorFondo") || "light";
document.body.setAttribute("data-theme", colorPreferido);

// Calcula promedios parciales por materia, halla los extremos absolutos y actualiza todo el bloque informativo del DOM
export function sacarPromedios() {
  const keys = Object.keys(dataMaterias);
  let todasLasNotas = [];
  promedios = []; // Reseteamos el arreglo global de promedios

  let maxProm = -1;
  let minProm = 11;
  let mejorMateriaGeneral = [];
  let peorMateriaGeneral = [];

  keys.forEach((key) => {
    const notasMateria = dataMaterias[key].notas || [];
    const prom = promediar(notasMateria);
    promedios.push(prom);

    if (notasMateria.length > 0) {
      todasLasNotas.push(...notasMateria);
    }

    if (prom > maxProm && notasMateria.length > 0) {
      maxProm = prom;
      mejorMateriaGeneral = [dataMaterias[key].nombre];
    } else if (prom === maxProm && notasMateria.length > 0) {
      mejorMateriaGeneral.push(dataMaterias[key].nombre);
    }

    if (prom < minProm && notasMateria.length > 0) {
      minProm = prom;
      peorMateriaGeneral = [dataMaterias[key].nombre];
    } else if (prom === minProm && notasMateria.length > 0) {
      peorMateriaGeneral.push(dataMaterias[key].nombre);
    }
  });

  const promedioGeneral = promediar(promedios);
  const medianaGeneral = getMedian(todasLasNotas);
  const modaGeneral = getModa(todasLasNotas);

  if (ELEMENT_DATA.promedio) ELEMENT_DATA.promedio.innerHTML = `<strong>Promedio</strong><p>${promedioGeneral}</p>`;
  if (ELEMENT_DATA.mediana) ELEMENT_DATA.mediana.innerHTML = `<strong>Mediana</strong><p>${medianaGeneral}</p>`;
  if (ELEMENT_DATA.moda) { ELEMENT_DATA.moda.innerHTML = `<strong>Moda</strong><p>${Array.isArray(modaGeneral) ? modaGeneral.join(', ') : modaGeneral}</p>`; }

  const formateador = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

  if (ELEMENT_DATA.mejorMateria && mejorMateriaGeneral.length > 0) {
    let textoMaterias = formateador.format(mejorMateriaGeneral);
    let titulo = mejorMateriaGeneral.length > 1 ? "Tus mejores materias son" : "Tu mejor materia es";
    ELEMENT_DATA.mejorMateria.innerHTML = `<strong>${titulo}</strong><p>${textoMaterias}</p>`;
  } else if (ELEMENT_DATA.mejorMateria) {
    ELEMENT_DATA.mejorMateria.innerHTML = `<strong>Tu mejor materia es</strong><p>?</p>`;
  }

  if (ELEMENT_DATA.peorMateria && peorMateriaGeneral.length > 0) {
    let textoMaterias = formateador.format(peorMateriaGeneral);
    let titulo = peorMateriaGeneral.length > 1 ? "Tus peores materias son" : "Tu peor materia es";
    ELEMENT_DATA.peorMateria.innerHTML = `<strong>${titulo}</strong><p>${textoMaterias}</p>`;
  } else if (ELEMENT_DATA.peorMateria) {
    ELEMENT_DATA.peorMateria.innerHTML = `<strong>Tu peor materia es</strong><p>?</p>`;
  }

  pintarBarras();
  actualizarBarraProgreso(promedioGeneral, 10);
}

// Agrega notas leyendo dinámicamente el ID de la materia
export function agregarNota(idMateria) {
  let inputElem = $ID(`input-nota-${idMateria}`);
  if (!inputElem) return;
  
  let valor = parseFloat(inputElem.value);
  if (!isNaN(valor) && valor >= 0 && valor <= 10) {
    if (!dataMaterias[idMateria].notas) dataMaterias[idMateria].notas = [];
    dataMaterias[idMateria].notas.push(valor);
    guardarEnStorage();
    sacarPromedios();
    renderizarMaterias(); 
  } else {
    alert("Por favor, ingresa una nota válida entre 0 y 10.");
  }
}

// Vacía por completo las calificaciones de un área específica
export function limpiarNotasMateria(idMateria) {
  if (dataMaterias[idMateria]) {
    if (confirm(`¿Deseas borrar todas las notas de la materia: ${dataMaterias[idMateria].nombre}?`)) {
      dataMaterias[idMateria].notas = [];
      dataMaterias[idMateria].tareas = [];
      guardarEnStorage();
      sacarPromedios();
      renderizarMaterias();
    }
  }
}

// Renderiza el HTML completo y funcional de las tarjetas dinámicas
export function renderizarMaterias() {
    const contenedor = $ID('contenedor-gestor-materias');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';

    Object.keys(dataMaterias).forEach(id => {
        const materia = dataMaterias[id];
        const div = document.createElement('div');
        
        // Estructura visual exacta a la original
        div.innerHTML = `
            <h2>${materia.nombre}</h2>
            <div class="input-group">
                <label>Ingresar nueva calificación:</label>
                <div class="input-inline-row">
                    <input type="number" class="input-academic" id="input-nota-${id}" placeholder="Ej. 8.5" step="0.01" min="0" max="10">
                    <button class="btn-icon btn-agregar-nota" data-materia="${id}" title="Agregar Nota"><i class="fa-solid fa-check"></i></button>
                    <button class="btn-limpiar-materia btn-limpiar-notas" data-materia="${id}" title="Limpiar Notas"><i class="fa-solid fa-eraser"></i></button>
                    <button class="btn-limpiar-materia btn-eliminar-materia" data-materia="${id}" title="Eliminar Materia" style="color: var(--danger-color); border-color: var(--danger-color);"><i class='fa-solid fa-trash'></i></button>
                </div>
            </div>
            <div id="tabla-${id}" style="display: flex; flex-wrap: wrap; gap: var(--space-2); min-height: 32px; margin-top: 10px;">
                ${(materia.notas || []).map(nota => `<span class="nota-badge">${nota.toFixed(2)}</span>`).join('')}
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// Alterna la propiedad cromática 'data-theme'
export function cambiarModos() {
  const temaActual = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", temaActual);
  localStorage.setItem("colorFondo", temaActual);
  pintarBarras();
}

// Ejecución inicial obligatoria
sacarPromedios();
renderizarMaterias(); // Importante llamarla al cargar para ver las tarjetas

import "./events.js";