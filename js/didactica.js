import { $ID, promediar, getModa, getPorcent, getMedian } from "./utils.js";
import { actualizarMiniGrafica, destruirMiniGrafica } from "./charts.js";

// Vectores dinámicos para capturar los datos ingresados en los laboratorios de teoría
export let notas = [];
export let edadesMedia = [];
export let datosModa = [];
export let datosTendencia = [];
export let datosAnomalias = [];

// Procesa una cadena de números separados por comas y actualiza los indicadores cromáticos del minigráfico
export function demoTendencia() {
  const inputElement = $ID("demo-tendencia-input");
  if (!inputElement) return;
  const input = inputElement.value;
  const numArr = input.split(",").map((n) => parseFloat(n.trim()));
  const datosValidos = numArr.filter((n) => !isNaN(n));

  if (datosValidos.length < 2) {
    destruirMiniGrafica();
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

// Calcula el promedio en el laboratorio didáctico experimental de notas independientes
export function promedioE() {
  if (notas.length === 0) {
    $ID("ejemplo1").innerHTML = `PROMEDIO: <span style="color: red">Sin datos ingresados</span>`;
    return;
  }
  let resultadoPromedio = promediar(notas, 2);
  $ID("ejemplo1").innerHTML = `PROMEDIO: <strong>${resultadoPromedio}</strong>`;
}

// Almacena una edad de forma secuencial en el laboratorio educativo de media aritmética
export function agregarMedia() {
  let campoInput = $ID("inputMediaEdad");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    edadesMedia.push(valorNumero);
    $ID("resultadoMedia").innerHTML = `EDADES INGRESADAS: [ ${edadesMedia.join(", ")} ]`;
  }
  campoInput.value = "";
}

// Realiza el cómputo final iterativo y despliega el valor de la media aritmética
export function calcularMedia() {
  if (edadesMedia.length === 0) return;
  let sumaEdades = 0;
  for (let i = 0; i < edadesMedia.length; i++) {
    sumaEdades = sumaEdades + edadesMedia[i];
  }
  let resultadoMedia = sumaEdades / edadesMedia.length;
  $ID("resultadoMedia").innerHTML = `MEDIA ARITMÉTICA: <strong>${resultadoMedia.toFixed(2)}</strong> de las edades`;
}

// Registra un número individual para el análisis de frecuencia absoluta o modas
export function agregarModa() {
  let campoInput = $ID("inputModa");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    datosModa.push(valorNumero);
    $ID("resultadoModa").innerHTML = `NÚMEROS INGRESADOS: [ ${datosModa.join(", ")} ]`;
  }
  campoInput.value = "";
}

// Ejecuta el extractor de frecuencias y dictamina si el conjunto es unimodal o multimodal
export function calcularModa() {
  if (datosModa.length === 0) return;
  const resultado = getModa(datosModa);
  if (resultado === null || resultado === "No hay moda") {
    $ID("resultadoModa").innerHTML = `MODA: <strong>No hay moda</strong> (Ningún valor se repite)`;
  } else if (Array.isArray(resultado)) {
    $ID("resultadoModa").innerHTML = `MODA MULTIMODAL: <strong>${resultado.join(", ")}</strong>`;
  } else {
    $ID("resultadoModa").innerHTML = `MODA: <strong>${resultado}</strong>`;
  }
}

// Procesa la relación porcentual instantánea entre una parte y su espacio total posible
export function calcularPorcentajeTeoria() {
  let parte = parseFloat($ID("inputPorcentajeParte").value);
  let total = parseFloat($ID("inputPorcentajeTotal").value);
  if (isNaN(parte) || isNaN(total) || total === 0) {
    $ID("resultadoPorcentaje").innerHTML = "PORCENTAJE: Por favor ingresa valores válidos.";
    return;
  }
  let pct = getPorcent(parte, total);
  $ID("resultadoPorcentaje").innerHTML = `PORCENTAJE: <strong>${pct.toFixed(2)}%</strong>`;
}

// Inserta un hito secuencial ordenado en el tiempo para evaluar oscilaciones en tendencias
export function agregarTendencia() {
  let campoInput = $ID("inputTendencia");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    datosTendencia.push(valorNumero);
    $ID("resultadoTendencia").innerHTML = `SERIE: [ ${datosTendencia.join(" → ")} ]`;
  }
  campoInput.value = "";
}

// Analiza los diferenciales continuos para categorizar la serie como ascendente o descendente
export function calcularTendencia() {
  if (datosTendencia.length < 2) {
    $ID("resultadoTendencia").innerHTML = "TENDENCIA: Inserta al menos 2 datos en orden para analizar.";
    return;
  }
  let contadorSubidas = 0;
  let contadorBajadas = 0;
  for (let i = 1; i < datosTendencia.length; i++) {
    let valorActual = datosTendencia[i];
    let valorAnterior = datosTendencia[i - 1];
    if (valorActual > valorAnterior) {
      contadorSubidas++;
    } else if (valorActual < valorAnterior) {
      contadorBajadas++;
    }
  }
  let diagnostico = "Estable / Oscilante";
  if (contadorSubidas > 0 && contadorBajadas === 0) {
    diagnostico = "Ascendente 📈 (¡El rendimiento mejora constantemente!)";
  } else if (contadorBajadas > 0 && contadorSubidas === 0) {
    diagnostico = "Descendente 📉 (¡Atención, va disminuyendo!)";
  }
  $ID("resultadoTendencia").innerHTML = `TENDENCIA DETECTADA: <strong>${diagnostico}</strong>`;
}

// Almacena datos para someterlos a un filtro restrictivo escolar de anomalías numéricas
export function agregarAnomalia() {
  let campoInput = $ID("inputAnomalia");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    datosAnomalias.push(valorNumero);
    $ID("resultadoAnomalia").innerHTML = `DATOS: [ ${datosAnomalias.join(", ")} ]`;
  }
  campoInput.value = "";
}

// Discrimina y aísla los valores que rompen el estándar escolar válido de notas (0 a 10)
export function calcularAnomalia() {
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
    $ID("resultadoAnomalia").innerHTML = `ANOMALÍAS DETECTADAS: <strong style="color: #e53e3e;">[ ${listaErrores.join(", ")} ]</strong> superan el rango escolar permitido (0-10).`;
  } else {
    $ID("resultadoAnomalia").innerHTML = `ANOMALÍAS DETECTADAS: <strong>Ninguna 🎉</strong>. Todos los datos están en rangos normales.`;
  }
}

// Resuelve de forma matemática interactiva la mediana de una cadena ingresada por comas
export function calcularMedianaDidactica() {
  const input = $ID("inputMedianaDatos").value;
  const valores = input.split(",").map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
  if (valores.length === 0) {
    $ID("resultadoMediana").innerHTML = "MEDIANA: Ingresa números válidos.";
    return;
  }
  let mediana = getMedian(valores);
  $ID("resultadoMediana").innerHTML = `MEDIANA: <strong>${mediana}</strong>`;
}

// Examina los inputs radio del quiz y despliega un veredicto estilizado según el número de aciertos
export function evaluarTest() {
  const CONTENEDOR = $ID("quiz-container");
  if (!CONTENEDOR) return;
  const TOTAL_PREGUNTAS = CONTENEDOR.querySelectorAll(".quiz-question").length;
  const CORRECTAS = CONTENEDOR.querySelectorAll('input:checked[value="correcto"]').length;
  const NOTA_FINAL = ((CORRECTAS / TOTAL_PREGUNTAS) * 10).toFixed(2);
  const CONTENEDOR_RESULTADO = $ID("quiz-resultado");

  if (!CONTENEDOR_RESULTADO) return;

  if (CORRECTAS === TOTAL_PREGUNTAS) {
    CONTENEDOR_RESULTADO.style.color = "#48bb78";
    CONTENEDOR_RESULTADO.innerHTML = `¡Rendimiento Perfecto! Nota: ${NOTA_FINAL}/10.00 (${CORRECTAS}/${TOTAL_PREGUNTAS} aciertos)`;
  } else if (NOTA_FINAL >= 7.0) {
    CONTENEDOR_RESULTADO.style.color = "#2b6cb0";
    CONTENEDOR_RESULTADO.innerHTML = `¡Aprobado! Nota: ${NOTA_FINAL}/10.00 (Acertaste ${CORRECTAS} de ${TOTAL_PREGUNTAS})`;
  } else if (NOTA_FINAL >= 4) {
    CONTENEDOR_RESULTADO.style.color = "#dd6b20";
    CONTENEDOR_RESULTADO.innerHTML = `Puedes mejorar. Nota: ${NOTA_FINAL}/10.00 (Acertaste ${CORRECTAS} de ${TOTAL_PREGUNTAS})`;
  } else {
    CONTENEDOR_RESULTADO.style.color = "#e53e3e";
    CONTENEDOR_RESULTADO.innerHTML = `Nota: ${NOTA_FINAL}/10.00. Te recomendamos repasar las herramientas prácticas.`;
  }
}
