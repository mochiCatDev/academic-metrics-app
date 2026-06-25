import { sacarPromedios } from "./main.js";

// Estructura limpia inicial por defecto para las asignaturas del sistema académico
const MATERIAS_POR_DEFECTO = {
  matematica: { nombre: "Matemática", notas: [], tareas: [] },
  ingles:     { nombre: "Inglés",     notas: [], tareas: [] },
  quimica:    { nombre: "Química",    notas: [], tareas: [] },
  biologia:   { nombre: "Biología",   notas: [], tareas: [] },
  filosofia:  { nombre: "Filosofía",  notas: [], tareas: [] },
  fisica:     { nombre: "Física",     notas: [], tareas: [] }
};

// Carga las materias existentes desde el espacio local o inicializa el objeto por defecto
export let dataMaterias = JSON.parse(localStorage.getItem("datosMaterias")) || MATERIAS_POR_DEFECTO;

// Almacena permanentemente el estado actualizado de las asignaturas en formato JSON
export function guardarEnStorage() {
  localStorage.setItem("datosMaterias", JSON.stringify(dataMaterias));
}

// Remueve el almacenamiento, limpia la memoria volátil y fuerza el recálculo general de la app
export function limpiarDatosGenerales() {
  if (confirm("¿Estás seguro de que deseas borrar TODOS los datos y reiniciar la aplicación?")) {
    localStorage.removeItem("datosMaterias");
    dataMaterias = JSON.parse(JSON.stringify(MATERIAS_POR_DEFECTO));
    guardarEnStorage();
    sacarPromedios();
    alert("Aplicación reiniciada con éxito.");
  }
}
