// Variables Globales
const main = $ID("section-main");
const manager = $ID("section-manager");
const about = $ID("section-about");
const teoria = $ID("section-teoria");
const todasLasSecciones = [main, manager, teoria, about];
const data = [
  "Matematicas",
  "Inglés",
  "Química",
  "Biología",
  "Filosofía",
  "Física",
];

let miMiniChart = null;
let notasMath = [];
let notasIng = [];
let notasQuim = [];
let notasBio = [];
let notasFilo = [];
let notasFisi = [];
let promedios = [];

// Funcion para mostrar una seccion y ocultar las demas de manera automatica
function mostrarSeccion(seccion) {
  todasLasSecciones.forEach((seccion) => {
    seccion.classList.add("oculto");
  });

  seccion.classList.remove("oculto");
}

// Funcion para que la barra se llene con el porcentaje que se le de
function actualizarBarraProgreso(valorActual, valorMaximo) {
  const barra_progress = $ID("bar-progress");
  const text_progress = $ID("text-progress");

  let porcentaje = ((valorActual / valorMaximo) * 100).toFixed(2);

  if (porcentaje < 0) porcentaje = 0;
  if (porcentaje > 100) porcentaje = 100;

  barra_progress.style.height = porcentaje + "%";
  text_progress.textContent = porcentaje + "%";
}

let barras = null;

function pintarBarras() {
  let canva = $ID("canva").getContext("2d");

  if (barras !== null) {
    barras.destroy();
  }

  let backgroundColors = [];
  let borderColors = [];

  promedios.forEach((nota) => {
    if (nota < 5) {
      backgroundColors.push("rgba(255, 99, 132, 0.6)");
      borderColors.push("rgba(255, 99, 132, 1)");
    } else if (nota >= 5 && nota <= 7) {
      backgroundColors.push("rgba(255, 206, 86, 0.6)");
      borderColors.push("rgba(255, 206, 86, 1)");
    } else {
      backgroundColors.push("rgba(75, 192, 192, 0.6)");
      borderColors.push("rgba(75, 192, 192, 1)");
    }
  });

  barras = new Chart(canva, {
    type: "bar",
    data: {
      labels: data,
      datasets: [
        {
          label: "NOTAS GENERALES",
          data: promedios,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 10,
        },
      },
    },
  });
}

function promediar() {
  promedios = [];
  let sumaMath = 0;
  let sumaIng = 0;
  let sumaQuim = 0;
  let sumaBio = 0;
  let sumaFilo = 0;
  let sumaFisi = 0;
  let promedioM;
  let promedioI;
  let promedioQ;
  let promedioB;
  let promedioFilo;
  let promedioFis;
  let promedioGeneral;
  let tabla = "PROMEDIOS";
  let listado = $ID("promedios");

  notasMath.forEach((nota) => {
    sumaMath = sumaMath + nota;
  });
  docM = (sumaMath / notasMath.length).toFixed(2);
  promedioM = parseFloat(docM);
  promedios.push(promedioM);

  notasIng.forEach((nota) => {
    sumaIng = sumaIng + nota;
  });
  docI = (sumaIng / notasIng.length).toFixed(2);
  promedioI = parseFloat(docI);
  promedios.push(promedioI);

  notasQuim.forEach((nota) => {
    sumaQuim = sumaQuim + nota;
  });
  docQ = (sumaQuim / notasQuim.length).toFixed(2);
  promedioQ = parseFloat(docQ);
  promedios.push(promedioQ);

  notasBio.forEach((nota) => {
    sumaBio = sumaBio + nota;
  });
  docB = (sumaBio / notasBio.length).toFixed(2);
  promedioB = parseFloat(docB);
  promedios.push(promedioB);

  notasFilo.forEach((nota) => {
    sumaFilo = sumaFilo + nota;
  });
  docFilo = (sumaFilo / notasFilo.length).toFixed(2);
  promedioFilo = parseFloat(docFilo);
  promedios.push(promedioFilo);

  notasFisi.forEach((nota) => {
    sumaFisi = sumaFisi + nota;
  });
  docFis = (sumaFisi / notasFisi.length).toFixed(2);
  promedioFis = parseFloat(docFis);
  promedios.push(promedioFis);

  promedioGeneral = (
    (promedioM +
      promedioI +
      promedioQ +
      promedioB +
      promedioFilo +
      promedioFis) /
    6
  ).toFixed(2);

  tabla = `
    <p>Promedio matematicas: ${promedioM}</p>
    <p>Promedio ingles: ${promedioI}</p>
    <p>Promedio quimica: ${promedioQ}</p>
    <p>Promedio biologia: ${promedioB}</p>
    <p>Promedio filosofia: ${promedioFilo}</p>
    <p>Promedio fisica: ${promedioFis}</p>
    <p>Promedio Total: ${promedioGeneral}</p>
  `;

  listado.innerHTML = tabla;
  pintarBarras();
  actualizarBarraProgreso(promedioGeneral, 10);
}

function agregarNota(id, arreglo, divTabla) {
  let cmpNotas = parseFloat($ID(id).value);
  let tabla = "NOTAS";
  let listado = $ID(divTabla);
  arreglo.push(cmpNotas);
  for (let i = 0; i < arreglo.length; i++) {
    tabla += "<p>" + arreglo[i] + "<p/>";
  }
  listado.innerHTML = tabla;
  $ID(id).value = "";
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

function actualizarMiniGrafica(datosValidos, colorLinea, colorFondo) {
  if (miMiniChart) {
    miMiniChart.destroy();
  }

  const labelsX = datosValidos.map((_, index) => `t-${index + 1}`);
  const ctx = $ID("demo-tendencia-chart").getContext("2d");

  miMiniChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labelsX,
      datasets: [
        {
          label: "Evolución",
          data: datosValidos,
          borderColor: colorLinea,
          backgroundColor: colorFondo,
          borderWidth: 3,
          tension: 0.2,
          pointRadius: 4,
          pointBackgroundColor: "#1a365d",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { ticks: { font: { size: 10 } } },
      },
    },
  });
}

// Función para evaluar el mini-Test estadistico
function evaluarTest() {
  const totalPreguntas = 20;
  let correctas = 0;

  for (let i = 1; i <= totalPreguntas; i++) {
    const opcionSeleccionada = document.querySelector(`input[name="p${i}"]:checked`);
    
    if (opcionSeleccionada && opcionSeleccionada.value === "correcto") {
      correctas++;
    }
  }

  const notaFinal = ((correctas / totalPreguntas) * 10).toFixed(2);
  const contenedorResultado = $ID("quiz-resultado");

  if (correctas === totalPreguntas) {
    contenedorResultado.style.color = "#48bb78"; // Verde exito
    contenedorResultado.innerHTML = `¡Rendimiento Perfecto! Nota: ${notaFinal}/10.00 (${correctas}/${totalPreguntas} aciertos)`;
  } else if (notaFinal >= 7.00) {
    contenedorResultado.style.color = "#2b6cb0"; // Azul enfoque (Aprobado)
    contenedorResultado.innerHTML = `¡Aprobado! Nota: ${notaFinal}/10.00 (Acertaste ${correctas} de ${totalPreguntas})`;
  } else if (correctas > 0) {
    contenedorResultado.style.color = "#dd6b20"; // Naranja advertencia sutil
    contenedorResultado.innerHTML = `Puedes mejorar. Nota: ${notaFinal}/10.00 (Acertaste ${correctas} de ${totalPreguntas})`;
  } else {
    contenedorResultado.style.color = "#e53e3e"; // Rojo error
    contenedorResultado.innerHTML = `Nota: ${notaFinal}/10.00. Te recomendamos repasar las herramientas prácticas.`;
  }
}

// --------------------------
// |  Funciones didacticas  |
// --------------------------

//  PROMEDIO 
let notas = []; 

function promedioE() { 
  if (notas.length === 0) {
    $ID("ejemplo1").innerHTML = `PROMEDIO: <span style="color: red">Sin datos ingresados</span>`;
    return;
  }

  let sumaTotal = 0;
  notas.forEach(nota => { sumaTotal = sumaTotal + nota; });

  let resultadoPromedio = (sumaTotal / notas.length).toFixed(2);
  $ID("ejemplo1").innerHTML = `PROMEDIO: <strong>${resultadoPromedio}</strong>`;
}


//  MEDIA ARITMÉTICA 
let edadesMedia = [];

function agregarMedia() {
  let campoInput = $ID("inputMediaEdad");
  let valorNumero = parseFloat(campoInput.value);
  if (!isNaN(valorNumero)) {
    edadesMedia.push(valorNumero); 
    $ID("resultadoMedia").innerHTML = `EDADES INGRESADAS: [ ${edadesMedia.join(", ")} ]`;
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
  $ID("resultadoMedia").innerHTML = `MEDIA ARITMÉTICA: <strong>${resultadoMedia.toFixed(2)}</strong> de las edades`;
}


//  MODA 
let datosModa = [];

function agregarModa() {
  let campoInput = $ID("inputModa");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosModa.push(valorNumero);
    $ID("resultadoModa").innerHTML = `NÚMEROS INGRESADOS: [ ${datosModa.join(", ")} ]`;
  }
  campoInput.value = "";
}

function calcularModa() {
  if (datosModa.length === 0) return;
  let frecuencias = {}; 
  
  datosModa.forEach(n => frecuencias[n] = (frecuencias[n] || 0) + 1);
  let maxRepeticiones = Math.max(...Object.values(frecuencias));
  let modasEncontradas = Object.keys(frecuencias).filter(n => frecuencias[n] === maxRepeticiones && maxRepeticiones > 1);
  
  if (modasEncontradas.length === 0) {
    $ID("resultadoModa").innerHTML = `MODA: <strong>No hay moda</strong> (Ningún valor se repite)`;
  } 
  else {
    $ID("resultadoModa").innerHTML = `MODA: <strong>${modasEncontradas.join(", ")}</strong> (Se repite ${maxRepeticiones} veces)`;
  }
}


//  PORCENTAJE
function calcularPorcentajeTeoria() {
  let parte = parseFloat($ID("inputPorcentajeParte").value);
  let total = parseFloat($ID("inputPorcentajeTotal").value);
  
  if (isNaN(parte) || isNaN(total) || total === 0) {
    $ID("resultadoPorcentaje").innerHTML = "PORCENTAJE: Por favor ingresa valores válidos.";
    return;
  }
  
  let porcentajeCalculado = (parte / total) * 100;
  $ID("resultadoPorcentaje").innerHTML = `PORCENTAJE: <strong>${porcentajeCalculado.toFixed(2)}%</strong>`;
}


//  ANÁLISIS DE TENDENCIAS
let datosTendencia = [];

function agregarTendencia() {
  let campoInput = $ID("inputTendencia");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosTendencia.push(valorNumero);
    $ID("resultadoTendencia").innerHTML = `SERIE: [ ${datosTendencia.join(" → ")} ]`;
  }
  campoInput.value = "";
}

function calcularTendencia() {
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
      contadorSubidas = contadorSubidas + 1; 
    }
    else if (valorActual < valorAnterior) {
      contadorBajadas = contadorBajadas + 1; 
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


// DETECCIÓN DE ANOMALÍAS
let datosAnomalias = [];

function agregarAnomalia() {
  let campoInput = $ID("inputAnomalia");
  let valorNumero = parseFloat(campoInput.value);

  if (!isNaN(valorNumero)) {
    datosAnomalias.push(valorNumero);
    $ID("resultadoAnomalia").innerHTML = `DATOS: [ ${datosAnomalias.join(", ")} ]`;
  }
  campoInput.value = "";
}

function calcularAnomalia() {
  if (datosAnomalias.length === 0) return;

  let limiteMaximoEscolar = 10;
  let listaErrores = [];
 
  for (let i = 0; i < datosAnomalias.length; i++) {
    let dato = datosAnomalias[i];
    if (dato > limiteMaximoEscolar || dato < 0) { listaErrores.push(dato); }
  }
  
  if (listaErrores.length > 0) {
    $ID("resultadoAnomalia").innerHTML = `ANOMALÍAS DETECTADAS: <strong style="color: var(--accent-color);">[ ${listaErrores.join(", ")} ]</strong> superan el rango escolar permitido (0-10).`;
  }
  else {
    $ID("resultadoAnomalia").innerHTML = `ANOMALÍAS DETECTADAS: <strong>Ninguna 🎉</strong>. Todos los datos están en rangos normales.`;
  }
}

// Función para evaluar el mini-Test estadistico
function evaluarTest() {
  const totalPreguntas = 20;
  let correctas = 0;

  for (let i = 1; i <= totalPreguntas; i++) {
    const opcionSeleccionada = document.querySelector(`input[name="p${i}"]:checked`);
    
    if (opcionSeleccionada && opcionSeleccionada.value === "correcto") {
      correctas++;
    }
  }

  const notaFinal = ((correctas / totalPreguntas) * 10).toFixed(2);
  const contenedorResultado = $ID("quiz-resultado");

  if (correctas === totalPreguntas) {
    contenedorResultado.style.color = "#48bb78"; // Verde exito
    contenedorResultado.innerHTML = `¡Rendimiento Perfecto! Nota: ${notaFinal}/10.00 (${correctas}/${totalPreguntas} aciertos)`;
  } else if (notaFinal >= 7.00) {
    contenedorResultado.style.color = "#2b6cb0"; // Azul enfoque (Aprobado)
    contenedorResultado.innerHTML = `¡Aprobado! Nota: ${notaFinal}/10.00 (Acertaste ${correctas} de ${totalPreguntas})`;
  } else if (correctas > 0) {
    contenedorResultado.style.color = "#dd6b20"; // Naranja advertencia sutil
    contenedorResultado.innerHTML = `Puedes mejorar. Nota: ${notaFinal}/10.00 (Acertaste ${correctas} de ${totalPreguntas})`;
  } else {
    contenedorResultado.style.color = "#e53e3e"; // Rojo error
    contenedorResultado.innerHTML = `Nota: ${notaFinal}/10.00. Te recomendamos repasar las herramientas prácticas.`;
  }
}

// ------------------------
// |  Seccion de Botones  |
// ------------------------

// Botones para agregar notas
onClick("#btn-notaMath", () => { agregarNota("notaMath", notasMath, "tabla");  });
onClick("#btn-notaIng", () => { agregarNota("notaIng", notasIng, "tabla2");  });
onClick("#btn-notaQuim", () => { agregarNota("notaQuim", notasQuim, "tabla3");  });
onClick("#btn-notaBio", () => { agregarNota("notaBio", notasBio, "tabla4");	});
onClick("#btn-notaFilo", () => { agregarNota("notaFilo", notasFilo, "tabla5"); });
onClick("#btn-notaFis", () => { agregarNota("notaFis", notasFisi, "tabla6"); });

// Botones para mostrar secciones
onClick("#btn-main", () => { mostrarSeccion(main); });
onClick("#btn-manager", () => { mostrarSeccion(manager); });
onClick("#btn-teoria", () => { mostrarSeccion(teoria); });
onClick("#btn-about", () => { mostrarSeccion(about); });

onClick("#btn-evaluar-quiz", () => { evaluarTest(); });
onClick("#demo-tendencia-input", () => {
  const inputTendencia = $ID("demo-tendencia-input");
  if (inputTendencia) {
    inputTendencia.addEventListener("input", demoTendencia);
  }
});

// botones seccion didactica
onClick("#btn-add", () => { agregarNota("ejemploProm", notas, "ejemplo1"); });
onClick("#btn-prueba", () => { promedioE(); });
onClick("#btn-addMedia", () => { agregarMedia(); });
onClick("#btn-calcMedia", () => { calcularMedia(); });
onClick("#btn-addModa", () => { agregarModa(); });
onClick("#btn-calcModa", () => { calcularModa(); });
onClick("#btn-calcPorcentaje", () => { calcularPorcentajeTeoria(); });
onClick("#btn-addTendencia", () => { agregarTendencia(); });
onClick("#btn-calcTendencia", () => { calcularTendencia(); });
onClick("#btn-addAnomalia", () => { agregarAnomalia(); });
onClick("#btn-calcAnomalia", () => { calcularAnomalia(); });


demoTendencia();
mostrarSeccion(main);
pintarBarras();
