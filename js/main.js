// Variables Globales
const main = $ID("section-main");
const manager = $ID("section-manager");
const about = $ID("section-about");
const teoria = $ID("section-teoria");
const todasLasSecciones = [main, manager, teoria ,about];
const data = ["Matematicas","Filosofia","Lenguaje","Ingles","Biologia","Quimica"]

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

    let porcentaje = (valorActual / valorMaximo) * 100;
    
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

  barras = new Chart(canva, {
    type: 'bar',
    data: {
      labels: data,
      datasets: [{
        label: "NOTAS GENERALES",
        data: promedios,
        backgroundColor: ["#000fff56", "#ae678956", "#3456ff56"],
        borderColor: ["#000fff", "#ae6789", "#3456ff"],
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
  promedioM= (sumaMath / notasMath.length).toFixed(2);
  promedioM = parseFloat(promedioM);
  promedios.push(promedioM);

  notasIng.forEach((nota) => {
    sumaIng = sumaIng + nota
  });
  promedioI= (sumaIng / notasIng.length).toFixed(2);
  promedioI = parseFloat(promedioI);
  promedios.push(promedioI);

  notasQuim.forEach((nota) =>{
    sumaQuim = sumaQuim + nota
  });
  promedioQ= (sumaQuim / notasQuim.length).toFixed(2);
  promedioQ = parseFloat(promedioQ);
  promedios.push(promedioQ);

  notasBio.forEach((nota) =>{
    sumaBio = sumaBio + nota
  });
  promedioB= (sumaBio / notasBio.length).toFixed(2);
  promedioB = parseFloat(promedioB);
  promedios.push(promedioB);
  
  notasFilo.forEach((nota) =>{
    sumaFilo = sumaFilo + nota
  });
  promedioFilo= (sumaFilo / notasFilo.length).toFixed(2);
  promedioFilo = parseFloat(promedioFilo);
  promedios.push(promedioFilo);

  notasFisi.forEach((nota) =>{
    sumaFisi = sumaFisi + nota
  });
  promedioFis= (sumaFisi / notasFisi.length).toFixed(2);
  promedioFis = parseFloat(promedioFis);
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