import { sacarPromedios, renderizarMaterias } from "./main.js";

// Estructura limpia inicial por defecto para las asignaturas
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
  localStorage.setItem("datosMaterias", JSON.stringify(dataMaterias));
}

// Remueve el almacenamiento, limpia la memoria y recarga UI
export function limpiarDatosGenerales() {
  if (confirm("¿Estás seguro de que deseas borrar TODOS los datos y reiniciar la aplicación?")) {
    localStorage.removeItem("datosMaterias");
    dataMaterias = JSON.parse(JSON.stringify(MATERIAS_POR_DEFECTO));
    guardarEnStorage();
    sacarPromedios();
    renderizarMaterias();
    alert("Aplicación reiniciada con éxito.");
  }
}

// Genera ID, agrega materia y refresca el DOM
export function crearNuevaMateria(nombre) {
  if (!nombre || nombre.trim() === "") return null;
  
  const idMateria = nombre.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "_");
  
  if (dataMaterias[idMateria]) {
    alert(`La materia "${nombre}" ya existe.`);
    return null;
  }

  dataMaterias[idMateria] = {
    nombre: nombre.trim(),
    notas: [],
    tareas: []
  };

  guardarEnStorage();
  sacarPromedios(); 
  renderizarMaterias();

  return idMateria;
}

// Borra materia específica
window.eliminarMateria = (idMateria) => {
    if (confirm(`¿Borrar la materia ${dataMaterias[idMateria].nombre}?`)) {
        delete dataMaterias[idMateria];
        guardarEnStorage();
        sacarPromedios();
        renderizarMaterias();
    }
};