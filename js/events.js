import { limpiarDatosGenerales } from "./storage.js"

// Boton para cambiar de modo claro/oscuro
onClick("#btn-modos", () => { cambiarModos() })

// Botones de limpieza
onClick("#btn-resetear-todo", limpiarDatosGenerales);

document.querySelectorAll(".btn-limpiar-materia").forEach(boton => {
  boton.addEventListener("click", () => {
    const idMateria = boton.getAttribute("data-materia");
    limpiarNotasMateria(idMateria);
  });
});

// Botones para agregar notas
onClick("#btn-notaMath", () => {
  if (validarInput("notaMath", "numero", "error-notaMath")) {
    agregarNota("notaMath", DATOS_MATERIAS.matematica.notas, "tabla");
  }
});
onClick("#btn-notaIng", () => {
  if (validarInput("notaIng", "numero", "error-notaIng")) {
    agregarNota("notaIng", DATOS_MATERIAS.ingles.notas, "tabla2");
  }
});
onClick("#btn-notaQuim", () => {
  if (validarInput("notaQuim", "numero", "error-notaQuim")) {
    agregarNota("notaQuim", DATOS_MATERIAS.quimica.notas, "tabla3");
  }
});
onClick("#btn-notaBio", () => {
  if (validarInput("notaBio", "numero", "error-notaBio")) {
    agregarNota("notaBio", DATOS_MATERIAS.biologia.notas, "tabla4");
  }
});
onClick("#btn-notaFilo", () => {
  if (validarInput("notaFilo", "numero", "error-notaFilo")) {
    agregarNota("notaFilo", DATOS_MATERIAS.filosofia.notas, "tabla5");
  }
});
onClick("#btn-notaFis", () => {
  if (validarInput("notaFis", "numero", "error-notaFis")) {
    agregarNota("notaFis", DATOS_MATERIAS.fisica.notas, "tabla6");
  }
});

// Botones para mostrar secciones
onClick("#btn-main", () => {
  mostrarSeccion(SECCIONES.main);
});
onClick("#btn-manager", () => {
  mostrarSeccion(SECCIONES.manager);
});
onClick("#btn-teoria", () => {
  mostrarSeccion(SECCIONES.teoria);
});
onClick("#btn-about", () => {
  mostrarSeccion(SECCIONES.about);
});

onClick("#btn-evaluar-quiz", () => {
  evaluarTest();
});

onClick("#demo-tendencia-input", () => {
  const inputTendencia = $ID("demo-tendencia-input");
  if (inputTendencia) {
    inputTendencia.addEventListener("input", demoTendencia);
  }
});

// botones seccion didactica
onClick("#btn-add", () => {
  agregarNota("ejemploProm", notas, "ejemplo1");
});
onClick("#btn-prueba", () => {
  promedioE();
});
onClick("#btn-addMedia", () => {
  agregarMedia();
});
onClick("#btn-calcMedia", () => {
  calcularMedia();
});
onClick("#btn-addModa", () => {
  agregarModa();
});
onClick("#btn-calcModa", () => {
  calcularModa();
});
onClick("#btn-calcPorcentaje", () => {
  calcularPorcentajeTeoria();
});
onClick("#btn-addTendencia", () => {
  agregarTendencia();
});
onClick("#btn-calcTendencia", () => {
  calcularTendencia();
});
onClick("#btn-addAnomalia", () => {
  agregarAnomalia();
});
onClick("#btn-calcAnomalia", () => {
  calcularAnomalia();
});
