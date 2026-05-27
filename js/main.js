// Variables Globales
const main = $ID("section-main");
const manager = $ID("section-manager");
const about = $ID("section-about");
const todasLasSecciones = [main, manager, about];
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
  let sumaFisi = 0
  let promedioM;
  let promedioI;
  let promedioQ;
  let promedioB;
  let promedioFilo;
  let promedioFis;
  let tabla = "PROMEDIOS";
  let listado = $ID("promedios")

  notasMath.forEach((nota) => {
    sumaMath = sumaMath + nota
  });
  promedioM= (sumaMath / notasMath.length).toFixed(2); 
  promedios.push(promedioM);

  notasIng.forEach((nota) => {
    sumaIng = sumaIng + nota
  });
  promedioI= (sumaIng / notasIng.length).toFixed(2);
  promedios.push(promedioI);

  notasQuim.forEach((nota) =>{
    sumaQuim = sumaQuim + nota
  });
  promedioQ= (sumaQuim / notasQuim.length).toFixed(2);
  promedios.push(promedioQ);

  notasBio.forEach((nota) =>{
    sumaBio = sumaBio + nota
  });
  promedioB= (sumaBio / notasBio.length).toFixed(2);
  promedios.push(promedioB);
  
  notasFilo.forEach((nota) =>{
    sumaFilo = sumaFilo + nota
  });
  promedioFilo= (sumaFilo / notasFilo.length).toFixed(2);
  promedios.push(promedioFilo);

  notasFisi.forEach((nota) =>{
    sumaFisi = sumaFisi + nota
  });
  promedioFis= (sumaFisi / notasFisi.length).toFixed(2);
  promedios.push(promedioFis);

  tabla += "<p>"+"Promedio matematicas: "+promedioM+"<p/>"
  tabla += "<p>"+"Promedio ingles: "+promedioI+"<p/>"
  tabla += "<p>"+"Promedio quimica: "+promedioQ+"<p/>"
  tabla += "<p>"+"Promedio biologia: "+promedioB+"<p/>"
  tabla += "<p>"+"Promedio filosofia: "+promedioFilo+"<p/>"
  tabla += "<p>"+"Promedio fisica: "+promedioFis+"<p/>"

  listado.innerHTML= tabla;
  pintarBarras();
}


function agregarNota(id, arreglo){
  let cmpNotas = parseFloat($ID(id).value);
  let tabla = "NOTAS";
  let listado = $ID("tabla");
  arreglo.push(cmpNotas);
  for(let i = 0; i < arreglo.length; i++){
    tabla += "<p>"+arreglo[i]+"<p/>"
  }
  listado.innerHTML=tabla
  $ID(id).value = ""
}

// Botones
$ID("btn-notaMath").addEventListener('click', () => { agregarNota("notaMath", notasMath) });
$ID("btn-notaIng").addEventListener('click', () => { agregarNota("notaIng", notasIng) });
$ID("btn-notaQuim").addEventListener('click', () => { agregarNota("notaQuim", notasQuim) });
$ID("btn-notaBio").addEventListener('click', () => { agregarNota("notaBio", notasBio) });
$ID("btn-notaFilo").addEventListener('click', () => { agregarNota("notaFilo", notasFilo) });
$ID("btn-notaFis").addEventListener('click', () => { agregarNota("notaFis", notasFisi) });
$ID("btn-main").addEventListener("click", () => { mostrarSeccion(main); actualizarBarraProgreso(1, 100) ;pintarBarras(); });
$ID("btn-manager").addEventListener("click", () => { mostrarSeccion(manager); });
$ID("btn-about").addEventListener("click", () => { mostrarSeccion(about); });