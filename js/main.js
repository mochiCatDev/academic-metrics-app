// Variables Globales
const DATOS_MATERIAS = {
  matematica: {
  	nombre: "Matemática",
  	notas: []
  },
  ingles: {
  	nombre: "Inglés",
  	notas: []
  },
  quimica: {
    nombre: "Química",
  	notas: []
  },
  biologia: {
    nombre: "Biología",
  	notas: []
  },
  filosofia: {
  	nombre: "Filosofía",
  	notas: []
  },
  fisica: {
  	nombre: "Física",
  	notas: []
  }
};
const SECCIONES = {
  main: $ID("section-main"),
  manager: $ID("section-manager"),
  about: $ID("section-about"),
  teoria: $ID("section-teoria")
};

let miMiniChart = null;
let promedios = [];

// Funcion para mostrar una seccion y ocultar las demas de manera automatica
function mostrarSeccion(seccion) {
  Object.keys(SECCIONES).forEach(secciones => SECCIONES[secciones].classList.add("oculto"));
  seccion.classList.remove("oculto");
}

// Funcion para que la barra se llene con el porcentaje que se le de
function actualizarBarraProgreso(valorActual, valorMaximo) {
  const barra_progress = $ID("bar-progress");
  const text_progress = $ID("text-progress");

  let porcentaje = obtenerPorcentajeDelTotal(valorActual, valorMaximo);

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

  promedios.forEach(nota => {
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
      labels: Object.keys(DATOS_MATERIAS),
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
          step: 1
        },
      },
    },
  });
}

function sacar_promedios() {
  promedios = [];

  promedioMatematicas = promediar(DATOS_MATERIAS.matematica.notas, 2);
  promedioIngles = promediar(DATOS_MATERIAS.ingles.notas, 2);
  promedioQuimica = promediar(DATOS_MATERIAS.quimica.notas, 2);
  promedioBiologia = promediar(DATOS_MATERIAS.biologia.notas, 2);
  promedioFilosofia = promediar(DATOS_MATERIAS.filosofia.notas, 2);
  promedioFisica = promediar(DATOS_MATERIAS.fisica.notas, 2);

  promedios.push(
    promedioMatematicas,
    promedioIngles,
    promedioQuimica,
    promedioBiologia,
    promedioFilosofia,
    promedioFisica
  );
  
  promedioGeneral = promediar(promedios, 2);

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

  pintarBarras();
  actualizarBarraProgreso(promedioGeneral, 10);
}

function agregarNota(id, arreglo, divTabla) {
  let tabla = "NOTAS";
  arreglo.push(parseFloat($ID(id).value));
  arreglo.forEach(nota => tabla += `<p>${nota}</p>`);
    
  $ID(divTabla).innerHTML = tabla;
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
  
  let porcentajeCalculado = obtenerPorcentajeDelTotal(parte, total);
  $ID("resultadoPorcentaje").innerHTML = `PORCENTAJE: <strong>${porcentajeCalculado}%</strong>`;
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


// ---------------------
// |  Mini-Test Final  |
// ---------------------

function evaluarTest() {
  const CONTENEDOR = $ID("quiz-container");
  const TOTAL_PREGUNTAS = CONTENEDOR.querySelectorAll(".quiz-question").length;
  const CORRECTAS = CONTENEDOR.querySelectorAll('input:checked[value="correcto"]').length;
  const NOTA_FINAL = ((CORRECTAS / TOTAL_PREGUNTAS) * 10).toFixed(2);
  const CONTENEDOR_RESULTADO = $ID("quiz-resultado");

  if (CORRECTAS === TOTAL_PREGUNTAS) {
    CONTENEDOR_RESULTADO.style.color = "#48bb78"; // Verde exito
    CONTENEDOR_RESULTADO.innerHTML = `¡Rendimiento Perfecto! Nota: ${NOTA_FINAL}/10.00 (${CORRECTAS}/${TOTAL_PREGUNTAS} aciertos)`;
  } else if (NOTA_FINAL >= 7.00) {
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

// Botones para agregar notas
onClick("#btn-notaMath", () => { agregarNota("notaMath", DATOS_MATERIAS.matematica.notas, "tabla");  });
onClick("#btn-notaIng", () => { agregarNota("notaIng", DATOS_MATERIAS.ingles.notas, "tabla2");  });
onClick("#btn-notaQuim", () => { agregarNota("notaQuim", DATOS_MATERIAS.quimica.notas, "tabla3");  });
onClick("#btn-notaBio", () => { agregarNota("notaBio", DATOS_MATERIAS.biologia.notas, "tabla4");	});
onClick("#btn-notaFilo", () => { agregarNota("notaFilo", DATOS_MATERIAS.filosofia.notas, "tabla5"); });
onClick("#btn-notaFis", () => { agregarNota("notaFis", DATOS_MATERIAS.fisica.notas, "tabla6"); });

// Botones para mostrar secciones
onClick("#btn-main", () => { mostrarSeccion(SECCIONES.main) });
onClick("#btn-manager", () => { mostrarSeccion(SECCIONES.manager) });
onClick("#btn-teoria", () => { mostrarSeccion(SECCIONES.teoria) });
onClick("#btn-about", () => { mostrarSeccion(SECCIONES.about) });

onClick("#btn-evaluar-quiz", () => { evaluarTest() });

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
mostrarSeccion(SECCIONES.main);
pintarBarras();
