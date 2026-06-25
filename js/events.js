import { onClick, validarInput, $ID } from "./utils.js";
import { limpiarDatosGenerales, dataMaterias } from "./storage.js";
import { mostrarSeccion, SECCIONES } from "./ui.js";
import {
  evaluarTest, demoTendencia, notas, promedioE, agregarMedia, calcularMedia,
  agregarModa, calcularModa, calcularPorcentajeTeoria, agregarTendencia,
  calcularTendencia, agregarAnomalia, calcularAnomalia, calcularMedianaDidactica
} from "./didactica.js";
import { cambiarModos, limpiarNotasMateria, agregarNota, sacarPromedios } from "./main.js";

// Escucha el botón superior encargado de alternar la paleta de color claro/oscuro
onClick("#btn-modos", () => { cambiarModos(); });

// Escucha la limpieza absoluta del registro histórico de datos
onClick("#btn-resetear-todo", limpiarDatosGenerales);

// Vincula de manera modular el botón manual para calcular estadísticas académicas
onClick("#btn-calcular-promedios-manual", sacarPromedios);

// Asigna eventos dinámicos a cada uno de los botones para borrar materias específicas en la vista gestora
document.querySelectorAll(".btn-limpiar-materia").forEach(boton => {
  boton.addEventListener("click", () => {
    const idMateria = boton.getAttribute("data-materia");
    limpiarNotasMateria(idMateria);
  });
});

// Enlace interactivo para inserción de calificaciones en Matemática
onClick("#btn-notaMath", () => {
  if (validarInput("notaMath", "numero", "error-notaMath")) {
    agregarNota("notaMath", dataMaterias.matematica.notas, "tabla");
  }
});

// Enlace interactivo para inserción de calificaciones en Inglés
onClick("#btn-notaIng", () => {
  if (validarInput("notaIng", "numero", "error-notaIng")) {
    agregarNota("notaIng", dataMaterias.ingles.notas, "tabla2");
  }
});

// Enlace interactivo para inserción de calificaciones en Química
onClick("#btn-notaQuim", () => {
  if (validarInput("notaQuim", "numero", "error-notaQuim")) {
    agregarNota("notaQuim", dataMaterias.quimica.notas, "tabla3");
  }
});

// Enlace interactivo para inserción de calificaciones en Biología
onClick("#btn-notaBio", () => {
  if (validarInput("notaBio", "numero", "error-notaBio")) {
    agregarNota("notaBio", dataMaterias.biologia.notas, "tabla4");
  }
});

// Enlace interactivo para inserción de calificaciones en Filosofía (ID CORREGIDO)
onClick("#btn-notaFilo", () => {
  if (validarInput("notaFilo", "numero", "error-notaFilo")) {
    agregarNota("notaFilo", dataMaterias.filosofia.notas, "tabla5");
  }
});

// Enlace interactivo para inserción de calificaciones en Física
onClick("#btn-notaFis", () => {
  if (validarInput("notaFis", "numero", "error-notaFis")) {
    agregarNota("notaFis", dataMaterias.fisica.notas, "tabla6");
  }
});

// Controladores de navegación modular: muestra Panel Principal
onClick("#btn-main", () => { mostrarSeccion(SECCIONES.main); });

// Controladores de navegación modular: muestra Gestor de Asignaturas
onClick("#btn-manager", () => { mostrarSeccion(SECCIONES.manager); });

// Controladores de navegación modular: muestra Aula Didáctica / Teórica
onClick("#btn-teoria", () => { mostrarSeccion(SECCIONES.teoria); });

// Controladores de navegación modular: muestra Información de Desarrolladores
onClick("#btn-about", () => { mostrarSeccion(SECCIONES.about); });

// Escucha el botón que procesa las respuestas del cuestionario interactivo
onClick("#btn-evaluar-quiz", () => { evaluarTest(); });

// Vincula el campo de tendencias estadísticas para recalcular interactivamente al tipear
const inputTendencia = $ID("demo-tendencia-input");
if (inputTendencia) {
  inputTendencia.addEventListener("input", demoTendencia);
}

// --- BOTONES COMPLETO: SECCIÓN DIDÁCTICA Y LABORATORIOS DE TEORÍA ---

// Adición y ejecución analítica de la Media Aritmética
onClick("#btn-addMedia", () => { agregarMedia(); });
onClick("#btn-calcMedia", () => { calcularMedia(); });

// Cálculo dinámico de la Mediana Didáctica por cadena de caracteres
onClick("#btn-calcMediana", () => { calcularMedianaDidactica(); });

// Adición y discriminación de la Moda estadística
onClick("#btn-addModa", () => { agregarModa(); });
onClick("#btn-calcModa", () => { calcularModa(); });

// Resolución algebraica del porcentaje didáctico
onClick("#btn-calcPorcentaje", () => { calcularPorcentajeTeoria(); });

// Inserción estructurada y aislamiento automatizado de Anomalías
onClick("#btn-addAnomalia", () => { agregarAnomalia(); });
onClick("#btn-calcAnomalia", () => { calcularAnomalia(); });
