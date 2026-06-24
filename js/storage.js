const MATERIAS_POR_DEFECTO = {
  matematica: { nombre: "Matemática", notas: [], tareas: [] },
  ingles:     { nombre: "Inglés",     notas: [], tareas: [] },
  quimica:    { nombre: "Química",    notas: [], tareas: [] },
  biologia:   { nombre: "Biología",   notas: [], tareas: [] },
  filosofia:  { nombre: "Filosofía",  notas: [], tareas: [] },
  fisica:     { nombre: "Física",     notas: [], tareas: [] }
};

export let dataMaterias = JSON.parse(localStorage.getItem("datosMaterias")) || MATERIAS_POR_DEFECTO;

export function guardarEnStorage() {
  localStorage.setItem("datosMaterias", JSON.stringify(DATOS_MATERIAS));
}

export function limpiarDatosGenerales() {
  if (confirm("¿Estás seguro de que deseas borrar TODOS los datos y reiniciar la aplicación?")) {
    localStorage.removeItem("datosMaterias");
    DATOS_MATERIAS = JSON.parse(JSON.stringify(MATERIAS_POR_DEFECTO));
    guardarEnStorage();
    sacarPromedios();
    alert("Aplicación reiniciada con éxito.");
  }
}
