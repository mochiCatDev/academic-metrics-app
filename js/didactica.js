import { actualizarMiniGrafica } from './charts.js';

let notas = [];
let edadesMedia = [];
let datosModa = [];
let datosTendencia = [];
let datosAnomalias = [];

export function demoTendencia() {
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

export function promedioE() {
  if (notas.length === 0) {
    $ID("ejemplo1").innerHTML =
      `PROMEDIO: <span style="color: red">Sin datos ingresados</span>`;
    return;
  }

  let resultadoPromedio = promediar(notas, 2);

  $ID("ejemplo1").innerHTML = `PROMEDIO: <strong>${resultadoPromedio}</strong>`;
}

export function agregarMedia() {
  let campoInput = $ID("inputMediaEdad");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    edadesMedia.push(valorNumero);
    $ID("resultadoMedia").innerHTML =
      `EDADES INGRESADAS: [ ${edadesMedia.join(", ")} ]`;
  }
  campoInput.value = "";
}

export function calcularMedia() {
  if (edadesMedia.length === 0) return;
  let sumaEdades = 0;
  for (let i = 0; i < edadesMedia.length; i++) {
    sumaEdades = sumaEdades + edadesMedia[i];
  }

  let resultadoMedia = sumaEdades / edadesMedia.length;
  $ID("resultadoMedia").innerHTML =
    `MEDIA ARITMÉTICA: <strong>${resultadoMedia.toFixed(2)}</strong> de las edades`;
}

export function agregarModa() {
  let campoInput = $ID("inputModa");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosModa.push(valorNumero);
    $ID("resultadoModa").innerHTML =
      `NÚMEROS INGRESADOS: [ ${datosModa.join(", ")} ]`;
  }
  campoInput.value = "";
}

export function calcularModa() {
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

export function calcularPorcentajeTeoria() {
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

export function agregarTendencia() {
  let campoInput = $ID("inputTendencia");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosTendencia.push(valorNumero);
    $ID("resultadoTendencia").innerHTML =
      `SERIE: [ ${datosTendencia.join(" → ")} ]`;
  }
  campoInput.value = "";
}

export function calcularTendencia() {
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

export function agregarAnomalia() {
  let campoInput = $ID("inputAnomalia");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosAnomalias.push(valorNumero);
    $ID("resultadoAnomalia").innerHTML =
      `DATOS: [ ${datosAnomalias.join(", ")} ]`;
  }
  campoInput.value = "";
}

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
    $ID("resultadoAnomalia").innerHTML =
      `ANOMALÍAS DETECTADAS: <strong style="color: var(--accent-color);">[ ${listaErrores.join(", ")} ]</strong> superan el rango escolar permitido (0-10).`;
  } else {
    $ID("resultadoAnomalia").innerHTML =
      `ANOMALÍAS DETECTADAS: <strong>Ninguna</strong>. Todos los datos están en rangos normales.`;
  }
}

export function evaluarTest() {
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
