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

// Laboratorio Interactivo

function demoTendencia() {
  const input = $ID("demo-tendencia-input").value;
  const numArr = input.split(",").map((n) => parseFloat(n.trim()));

  const datosValidos = numArr.filter((n) => !isNaN(n));

  if (datosValidos.length < 2) {
    if (miMiniChart) {
      miMiniChart.destroy();
      miMiniChart = null;
    }
    return;
  }

  const primerPunto = datosValidos[0];
  const ultimoPunto = datosValidos[datosValidos.length - 1];

  let colorGrafica = "#718096";
  let colorFondoSutil = "rgba(113, 128, 150, 0.1)";

  if (ultimoPunto > primerPunto) {
    colorGrafica = "#48bb78";
    colorFondoSutil = "rgba(72, 187, 120, 0.1)";
  } else if (ultimoPunto < primerPunto) {
    colorGrafica = "#e53e3e";
    colorFondoSutil = "rgba(229, 62, 62, 0.1)";
  }

  actualizarMiniGrafica(datosValidos, colorGrafica, colorFondoSutil);
}

// --------------------------
// |  Funciones didacticas  |
// --------------------------

//  PROMEDIO
let notas = [];

function promedioE() {
  if (notas.length === 0) {
    $ID("ejemplo1").innerHTML =
      `PROMEDIO: <span style="color: red">Sin datos ingresados</span>`;
    return;
  }

  let resultadoPromedio = promediar(notas, 2);

  $ID("ejemplo1").innerHTML = `PROMEDIO: <strong>${resultadoPromedio}</strong>`;
}

//  MEDIA ARITMÉTICA
let edadesMedia = [];

function agregarMedia() {
  let campoInput = $ID("inputMediaEdad");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    edadesMedia.push(valorNumero);
    $ID("resultadoMedia").innerHTML =
      `EDADES INGRESADAS: [ ${edadesMedia.join(", ")} ]`;
  }
  campoInput.value = "";
}

function calcularMedia() {
  if (edadesMedia.length === 0) return;
  let sumaEdades = 0;
  for (let i = 0; i < edadesMedia.length; i++) {
    sumaEdades = sumaEdades + edadesMedia[i];
  }

  let resultadoMedia = sumaEdades / edadesMedia.length;
  $ID("resultadoMedia").innerHTML =
    `MEDIA ARITMÉTICA: <strong>${resultadoMedia.toFixed(2)}</strong> de las edades`;
}

//  MODA
let datosModa = [];

function agregarModa() {
  let campoInput = $ID("inputModa");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosModa.push(valorNumero);
    $ID("resultadoModa").innerHTML =
      `NÚMEROS INGRESADOS: [ ${datosModa.join(", ")} ]`;
  }
  campoInput.value = "";
}

function calcularModa() {
  if (datosModa.length === 0) return;

  const resultado = getModa(datosModa);

  if (resultado === null) {
    $ID("resultadoModa").innerHTML =
      `MODA: <strong>No hay moda</strong> (Ningún valor se repite)`;
  } else if (Array.isArray(resultado)) {
    $ID("resultadoModa").innerHTML =
      `MODA MULTIMODAL: <strong>${resultado.join(", ")}</strong>`;
  } else {
    $ID("resultadoModa").innerHTML =
      `MODA: <strong>${resultado}</strong>`;
  }
}

//  PORCENTAJE
function calcularPorcentajeTeoria() {
  let parte = parseFloat($ID("inputPorcentajeParte").value);
  let total = parseFloat($ID("inputPorcentajeTotal").value);

  if (isNaN(parte) || isNaN(total) || total === 0) {
    $ID("resultadoPorcentaje").innerHTML =
      "PORCENTAJE: Por favor ingresa valores válidos.";
    return;
  }

  let porcentajeCalculado = getPorcent(parte, total);
  $ID("resultadoPorcentaje").innerHTML =
    `PORCENTAJE: <strong>${porcentajeCalculado}%</strong>`;
}

//  ANÁLISIS DE TENDENCIAS
let datosTendencia = [];

function agregarTendencia() {
  let campoInput = $ID("inputTendencia");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosTendencia.push(valorNumero);
    $ID("resultadoTendencia").innerHTML =
      `SERIE: [ ${datosTendencia.join(" → ")} ]`;
  }
  campoInput.value = "";
}

function calcularTendencia() {
  if (datosTendencia.length < 2) {
    $ID("resultadoTendencia").innerHTML =
      "TENDENCIA: Inserta al menos 2 datos en orden para analizar.";
    return;
  }
  let contadorSubidas = 0;
  let contadorBajadas = 0;

  for (let i = 1; i < datosTendencia.length; i++) {
    let valorActual = datosTendencia[i];
    let valorAnterior = datosTendencia[i - 1];

    if (valorActual > valorAnterior) {
      contadorSubidas = contadorSubidas + 1;
    } else if (valorActual < valorAnterior) {
      contadorBajadas = contadorBajadas + 1;
    }
  }

  let diagnostico = "Estable / Oscilante";
  if (contadorSubidas > 0 && contadorBajadas === 0) {
    diagnostico = "Ascendente 📈 (¡El rendimiento mejora constantemente!)";
  } else if (contadorBajadas > 0 && contadorSubidas === 0) {
    diagnostico = "Descendente 📉 (¡Atención, va disminuyendo!)";
  }

  $ID("resultadoTendencia").innerHTML =
    `TENDENCIA DETECTADA: <strong>${diagnostico}</strong>`;
}

// DETECCIÓN DE ANOMALÍAS
let datosAnomalias = [];

function agregarAnomalia() {
  let campoInput = $ID("inputAnomalia");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosAnomalias.push(valorNumero);
    $ID("resultadoAnomalia").innerHTML =
      `DATOS: [ ${datosAnomalias.join(", ")} ]`;
  }
  campoInput.value = "";
}

function calcularAnomalia() {
  if (datosAnomalias.length === 0) return;

  let limiteMaximoEscolar = 10;
  let listaErrores = [];

  for (let i = 0; i < datosAnomalias.length; i++) {
    let dato = datosAnomalias[i];
    if (dato > limiteMaximoEscolar || dato < 0) {
      listaErrores.push(dato);
    }
  }

  if (listaErrores.length > 0) {
    $ID("resultadoAnomalia").innerHTML =
      `ANOMALÍAS DETECTADAS: <strong style="color: var(--accent-color);">[ ${listaErrores.join(", ")} ]</strong> superan el rango escolar permitido (0-10).`;
  } else {
    $ID("resultadoAnomalia").innerHTML =
      `ANOMALÍAS DETECTADAS: <strong>Ninguna 🎉</strong>. Todos los datos están en rangos normales.`;
  }
}

// ---------------------
// |  Mini-Test Final  |
// ---------------------

function evaluarTest() {
  const CONTENEDOR = $ID("quiz-container");
  const TOTAL_PREGUNTAS = CONTENEDOR.querySelectorAll(".quiz-question").length;
  const CORRECTAS = CONTENEDOR.querySelectorAll(
    'input:checked[value="correcto"]',
  ).length;
  const NOTA_FINAL = ((CORRECTAS / TOTAL_PREGUNTAS) * 10).toFixed(2);
  const CONTENEDOR_RESULTADO = $ID("quiz-resultado");

  if (CORRECTAS === TOTAL_PREGUNTAS) {
    CONTENEDOR_RESULTADO.style.color = "#48bb78"; // Verde exito
    CONTENEDOR_RESULTADO.innerHTML = `¡Rendimiento Perfecto! Nota: ${NOTA_FINAL}/10.00 (${CORRECTAS}/${TOTAL_PREGUNTAS} aciertos)`;
  } else if (NOTA_FINAL >= 7.0) {
    CONTENEDOR_RESULTADO.style.color = "#2b6cb0"; // Azul enfoque (Aprobado)
    CONTENEDOR_RESULTADO.innerHTML = `¡Aprobado! Nota: ${NOTA_FINAL}/10.00 (Acertaste ${CORRECTAS} de ${TOTAL_PREGUNTAS})`;
  } else if (NOTA_FINAL >= 4) {
    CONTENEDOR_RESULTADO.style.color = "#dd6b20"; // Naranja advertencia sutil
    CONTENEDOR_RESULTADO.innerHTML = `Puedes mejorar. Nota: ${NOTA_FINAL}/10.00 (Acertaste ${CORRECTAS} de ${TOTAL_PREGUNTAS})`;
  } else {
    CONTENEDOR_RESULTADO.style.color = "#e53e3e"; // Rojo error
    CONTENEDOR_RESULTADO.innerHTML = `Nota: ${NOTA_FINAL}/10.00. Te recomendamos repasar las herramientas prácticas.`;
  }
}

// ------------------------
// |  Seccion de Botones  |
// ------------------------

demoTendencia();
mostrarSeccion(SECCIONES.main);
pintarBarras();
