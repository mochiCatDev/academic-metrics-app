import { $ID, onClick, promediar, getPorcent, validarInput, getMedian, getModa }  from "./utils.js"
import { dataMaterias, guardarEnStorage } from "./storage.js"
import { pintarBarras, actualizarMiniGrafica } from "./charts.js"
import { SECCIONES, mostrarSeccion, actualizarBarrProgreso } from "./ui.js"

// Variables Globales
const ELEMENT_PROM_DATA = $ID("data-promedio");
const ELEMENT_MEDIANA_DATA = $ID("data-mediana");
const ElEMENT_MODA_DATA = $ID("data-moda");
const ELEMENT_MEJOR_MATERIA_DATA = $ID("data-mejor-materia");
const ELEMENT_PEOR_MATERIA_DATA = $ID("data-peor-materia");

let promedios = [0, 0, 0, 0, 0, 0];
let colorPreferido = localStorage.getItem("colorFondo") || "light";
document.body.setAttribute("data-theme", colorPreferido);

// funcion para vaciar las notas y tareas de una materia específica sin eliminarla
function limpiarNotasMateria(idMateria) {
  if (dataMaterias[idMateria]) {
    if (confirm(`¿Deseas borrar todas las notas de la materia: ${dataMaterias[idMateria].nombre}?`)) {
      dataMaterias[idMateria].notas = [];
      dataMaterias[idMateria].tareas = [];
      guardarEnStorage();
      sacarPromedios();
      alert("Notas limpiadas correctamente.");
    }
  } else {
    console.error(`La materia con ID "${idMateria}" no existe.`);
  }
}

function cambiarModos() {
  const temaActual = document.body.getAttribute("data-theme") || colorPreferido;
  const nuevoTema = temaActual === "dark" ? "light" : "dark";
  const nuevoMensaje = nuevoTema === "light" ? `<i class="fa-regular fa-sun"></i>` : `<i class="fa-regular fa-moon"></i>`;
  document.body.setAttribute("data-theme", nuevoTema);
  $ID("btn-modos").innerHTML = nuevoMensaje;
  localStorage.setItem("colorFondo", nuevoTema);

  if (barras !== null) {
    pintarBarras();
  }
  demoTendencia();
}

function sacarPromedios() {
  promedios = [];

  promedioMatematicas = promediar(dataMaterias.matematica.notas, 2);
  promedioIngles = promediar(dataMaterias.ingles.notas, 2);
  promedioQuimica = promediar(dataMaterias.quimica.notas, 2);
  promedioBiologia = promediar(dataMaterias.biologia.notas, 2);
  promedioFilosofia = promediar(dataMaterias.filosofia.notas, 2);
  promedioFisica = promediar(dataMaterias.fisica.notas, 2);

  promedios.push(
    promedioMatematicas,
    promedioIngles,
    promedioQuimica,
    promedioBiologia,
    promedioFilosofia,
    promedioFisica,
  );

  let promediosMaterias = {
    "Matematicas": promedioMatematicas,
    "Ingles": promedioIngles,
    "Quimica": promedioQuimica,
    "Biologia": promedioBiologia,
    "Filosofia": promedioFilosofia,
    "Fisica": promedioFisica
  }

  let promedioGeneral = promediar(promedios, 2);
  let medianaGeneral = getMedian(promedios);
  let modaGeneral = getModa(promedios);

  const listaMaterias = Object.entries(promediosMaterias);
  const notaMaxima = Math.max(...listaMaterias.map(m => m[1]));
  let mejorMateriaGeneral = listaMaterias.filter(m => m[1] === notaMaxima).map(([nombre]) => nombre);

  const notaMinima = Math.min(...listaMaterias.map(m => m[1]));
  let peorMateriaGeneral = listaMaterias.filter(m => m[1] === notaMinima).map(([nombre]) => nombre);

  $ID("promedios").innerHTML = `
    <h3>PROMEDIOS</h3>
    <p>Promedio matematicas: ${promedioMatematicas}</p>
    <p>Promedio ingles: ${promedioIngles}</p>
    <p>Promedio quimica: ${promedioQuimica}</p>
    <p>Promedio biologia: ${promedioBiologia}</p>
    <p>Promedio filosofia: ${promedioFilosofia}</p>
    <p>Promedio fisica: ${promedioFisica}</p>
    <p>Promedio Total: ${promedioGeneral}</p>
  `;

  const formateador = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });
  let textoMaterias = formateador.format(mejorMateriaGeneral);
  let titulo = mejorMateriaGeneral.length > 1 ? "Tus mejores materias son" : "Tu mejor materia es";
  ELEMENT_MEJOR_MATERIA_DATA.innerHTML = `<strong>${titulo}</strong><p>${textoMaterias}</p>`;

  textoMaterias = formateador.format(peorMateriaGeneral);
  titulo = peorMateriaGeneral.length > 1 ? "Tus peores materias son" : "Tu peor materia es";
  ELEMENT_PEOR_MATERIA_DATA.innerHTML = `<strong>${titulo}</strong><p>${textoMaterias}</p>`

  ELEMENT_PROM_DATA.innerHTML = `<strong>Promedio</strong><p>${promedioGeneral}</p>`;
  ELEMENT_MEDIANA_DATA.innerHTML = `<strong>Mediana</strong><p>${medianaGeneral}</p>`;
  ElEMENT_MODA_DATA.innerHTML = `<strong>Moda</strong><p>${modaGeneral}</p>`;
  pintarBarras();
  actualizarBarraProgreso(promedioGeneral, 10);
}

function agregarNota(id, arreglo, divTabla) {
  let valor = parseFloat($ID(id).value);
  arreglo.push(valor);

  guardarEnStorage();

  $ID(divTabla).innerHTML = "NOTAS" + arreglo.map(nota => `<p>${nota}</p>`).join("");
  $ID(id).value = "";
  sacarPromedios();
}

// ------------------------
// |  Seccion de Botones  |
// ------------------------

demoTendencia();
mostrarSeccion(SECCIONES.main);
pintarBarras();
