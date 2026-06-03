// Variables Globales
const main = $ID("section-main");
const manager = $ID("section-manager");
const about = $ID("section-about");
const teoria = $ID("section-teoria");
const todasLasSecciones = [main, manager, teoria ,about];
const data = ["Matematicas","Igles","Quimica","Biologia","Filosofia","Fisica"]

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

    barra_progress.style.height = porcentaje + '%';
    text_progress.textContent = porcentaje + '%';
}

let barras = null;

function pintarBarras(){
  let canva = $ID("canva").getContext("2d");

  if(barras !== null){
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
    type: 'bar',
    data: {
      labels: data,
      datasets: [{
        label: "NOTAS GENERALES",
        data: promedios,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2
      }]
    },
    options: {
        scales: {
                y: {
                      beginAtZero: true,
                      min: 0,
                      max: 10
        }
      }
    }
    });

}


function promediar(){
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
  let listado = $ID("promedios")

  notasMath.forEach((nota) => {
    sumaMath = sumaMath + nota
  });
  docM= (sumaMath / notasMath.length).toFixed(2);
  promedioM = parseFloat(docM);
  promedios.push(promedioM);

  notasIng.forEach((nota) => {
    sumaIng = sumaIng + nota
  });
  docI= (sumaIng / notasIng.length).toFixed(2);
  promedioI = parseFloat(docI);
  promedios.push(promedioI);

  notasQuim.forEach((nota) =>{
    sumaQuim = sumaQuim + nota
  });
  docQ= (sumaQuim / notasQuim.length).toFixed(2);
  promedioQ = parseFloat(docQ);
  promedios.push(promedioQ);

  notasBio.forEach((nota) =>{
    sumaBio = sumaBio + nota
  });
  docB= (sumaBio / notasBio.length).toFixed(2);
  promedioB = parseFloat(docB);
  promedios.push(promedioB);
  
  notasFilo.forEach((nota) =>{
    sumaFilo = sumaFilo + nota
  });
  docFilo= (sumaFilo / notasFilo.length).toFixed(2);
  promedioFilo = parseFloat(docFilo);
  promedios.push(promedioFilo);

  notasFisi.forEach((nota) =>{
    sumaFisi = sumaFisi + nota
  });
  docFis= (sumaFisi / notasFisi.length).toFixed(2);
  promedioFis = parseFloat(docFis);
  promedios.push(promedioFis);

  promedioGeneral = ((promedioM + promedioI + promedioQ + promedioB + promedioFilo + promedioFis) / 6).toFixed(2);

  tabla = `
    <p>Promedio matematicas: ${promedioM}</p>
    <p>Promedio ingles: ${promedioI}</p>
    <p>Promedio quimica: ${promedioQ}</p>
    <p>Promedio biologia: ${promedioB}</p>
    <p>Promedio filosofia: ${promedioFilo}</p>
    <p>Promedio fisica: ${promedioFis}</p>
    <p>Promedio Total: ${promedioGeneral}</p>
  `

  listado.innerHTML= tabla;
  pintarBarras();
  actualizarBarraProgreso(promedioGeneral, 10);
}


function agregarNota(id, arreglo, divTabla){
  let cmpNotas = parseFloat($ID(id).value);
  let tabla = "NOTAS";
  let listado = $ID(divTabla);
  arreglo.push(cmpNotas);
  for(let i = 0; i < arreglo.length; i++){
    tabla += "<p>"+arreglo[i]+"<p/>"
  }
  listado.innerHTML=tabla
  $ID(id).value = ""
}

// Botones
onClick("#btn-notaMath", () => { agregarNota("notaMath", notasMath, "tabla") });
onClick("#btn-notaIng", () => { agregarNota("notaIng", notasIng, "tabla2") });
onClick("#btn-notaQuim", () => { agregarNota("notaQuim", notasQuim, "tabla3") });
onClick("#btn-notaBio", () => { agregarNota("notaBio", notasBio, "tabla4") });
onClick("#btn-notaFilo", () => { agregarNota("notaFilo", notasFilo, "tabla5") });
onClick("#btn-notaFis", () => { agregarNota("notaFis", notasFisi, "tabla6") });
onClick("#btn-main", () => { mostrarSeccion(main) });
onClick("#btn-manager", () => { mostrarSeccion(manager) });
onClick("#btn-teoria", () => { mostrarSeccion(teoria) });
onClick("#btn-about", () => { mostrarSeccion(about) });

mostrarSeccion(main);
pintarBarras();