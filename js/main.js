// Variables Globales
const main = document.getElementById("section-main");
const manager = document.getElementById("section-manager");
const about = document.getElementById("section-about");

const data = ["Matematicas","Filosofia","Lenguaje","Ingles","Biologia","Quimica"]

const todasLasSecciones = [main, manager, about];

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
    const barra_progress = document.getElementById("bar-progress");
    const text_progress = document.getElementById("text-progress");

    let porcentaje = (valorActual / valorMaximo) * 100;
    
    if (porcentaje < 0) porcentaje = 0;
    if (porcentaje > 100) porcentaje = 100;

    barra_progress.style.height = porcentaje + '%';
    text_progress.textContent = porcentaje + '%';
}


actualizarBarraProgreso(1,100);

// Eventos de clic a los botones
document.getElementById("btn-main").addEventListener("click", () => {
  mostrarSeccion(main);
  pintarBarras();
});
document.getElementById("btn-manager").addEventListener("click", () => {
  mostrarSeccion(manager);
});
document.getElementById("btn-about").addEventListener("click", () => {
  mostrarSeccion(about);
});

let barras = null;

function pintarBarras(){
  let canva = document.getElementById("canva").getContext("2d");

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
  let listado = document.getElementById("promedios")

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
}


function agregarNota(){
  let cmpNotas = parseFloat(document.getElementById("notaMath").value);
  let tabla = "NOTAS";
  let listado = document.getElementById("tabla");
  notasMath.push(cmpNotas);
  for(let i = 0; i < notasMath.length; i++){
    tabla += "<p>"+notasMath[i]+"<p/>"
  }
  listado.innerHTML=tabla
  document.getElementById("notaMath").value = ""
}
function agregarNota2(){
  let cmpNotas = parseFloat(document.getElementById("notaIng").value);
  let tabla = "NOTAS";
  let listado = document.getElementById("tabla2");
  notasIng.push(cmpNotas);
  for(let i = 0; i < notasIng.length; i++){
    tabla += "<p>"+notasIng[i]+"<p/>"
  } 
  listado.innerHTML=tabla
  document.getElementById("notaIng").value = ""
}
function agregarNota3(){
  let cmpNotas = parseFloat(document.getElementById("notaQuim").value);
  let tabla = "NOTAS";
  let listado = document.getElementById("tabla3");
  notasQuim.push(cmpNotas);
  for(let i = 0; i < notasQuim.length; i++){
    tabla += "<p>"+notasQuim[i]+"<p/>"
  } 
  listado.innerHTML=tabla
  document.getElementById("notaQuim").value = ""
}

function agregarNota4(){
  let cmpNotas = parseFloat(document.getElementById("notaBio").value);
  let tabla = "NOTAS";
  let listado = document.getElementById("tabla4");
  notasBio.push(cmpNotas);
  for(let i = 0; i < notasBio.length; i++){
    tabla += "<p>"+notasBio[i]+"<p/>"
  } 
  listado.innerHTML=tabla
  document.getElementById("notaBio").value = ""
}

function agregarNota5(){
  let cmpNotas = parseFloat(document.getElementById("notaFilo").value);
  let tabla = "NOTAS";
  let listado = document.getElementById("tabla5");
  notasFilo.push(cmpNotas);
  for(let i = 0; i < notasFilo.length; i++){
    tabla += "<p>"+notasFilo[i]+"<p/>"
  } 
  listado.innerHTML=tabla
  document.getElementById("notaFilo").value = ""
}

function agregarNota6(){
  let cmpNotas = parseFloat(document.getElementById("notaFis").value);
  let tabla = "NOTAS";
  let listado = document.getElementById("tabla6");
  notasFisi.push(cmpNotas);
  for(let i = 0; i < notasFisi.length; i++){
    tabla += "<p>"+notasFisi[i]+"<p/>"
  } 
  listado.innerHTML=tabla
  document.getElementById("notaFis").value = ""
}