import { onClick, validarInput, $ID } from "./utils.js";
import { limpiarDatosGenerales, dataMaterias, crearNuevaMateria } from "./storage.js";
import { mostrarSeccion, SECCIONES } from "./ui.js";
import {
  evaluarTest, demoTendencia, notas, promedioE, agregarMedia, calcularMedia,
  agregarModa, calcularModa, calcularPorcentajeTeoria, agregarTendencia,
  calcularTendencia, agregarAnomalia, calcularAnomalia, calcularMedianaDidactica
} from "./didactica.js";
import { cambiarModos, limpiarNotasMateria, agregarNota, sacarPromedios, renderizarMaterias } from "./main.js";

// Agregar nueva materia
onClick("#btn-agregar-materia", () => {
    const input = document.getElementById("input-nueva-materia");
    const nombre = input.value;
    if (crearNuevaMateria(nombre)) {
        input.value = "";
    }
});

onClick("#btn-modos", () => { cambiarModos(); });
onClick("#btn-resetear-todo", limpiarDatosGenerales);

// DELEGACIÓN DE EVENTOS: Escucha los clics de elementos dinámicos
const contenedorGestor = $ID("contenedor-gestor-materias");
if (contenedorGestor) {
    contenedorGestor.addEventListener("click", (e) => {
        // Intercepta el botón "Agregar Nota" (icono de check)
        const btnAgregar = e.target.closest(".btn-agregar-nota");
        if (btnAgregar) {
            const idMateria = btnAgregar.getAttribute("data-materia");
            agregarNota(idMateria);
            return;
        }

        // Intercepta el botón "Limpiar Notas" (icono de borrador)
        const btnLimpiar = e.target.closest(".btn-limpiar-notas");
        if (btnLimpiar) {
            const idMateria = btnLimpiar.getAttribute("data-materia");
            limpiarNotasMateria(idMateria);
            return;
        }

        // Intercepta el botón "Eliminar Materia" (icono de basura)
        const btnEliminar = e.target.closest(".btn-eliminar-materia");
        if (btnEliminar) {
            const idMateria = btnEliminar.getAttribute("data-materia");
            window.eliminarMateria(idMateria);
            return;
        }
    });
}

// Controladores de navegación modular
onClick("#btn-main", () => { mostrarSeccion(SECCIONES.main); });
onClick("#btn-manager", () => { mostrarSeccion(SECCIONES.manager); });
onClick("#btn-teoria", () => { mostrarSeccion(SECCIONES.teoria); });
onClick("#btn-about", () => { mostrarSeccion(SECCIONES.about); });
onClick("#btn-evaluar-quiz", () => { evaluarTest(); });

// Eventos interactivos de teoría
const inputTendencia = $ID("demo-tendencia-input");
if (inputTendencia) {
  inputTendencia.addEventListener("input", demoTendencia);
}

onClick("#btn-addMedia", () => { agregarMedia(); });
onClick("#btn-calcMedia", () => { calcularMedia(); });
onClick("#btn-calcMediana", () => { calcularMedianaDidactica(); });
onClick("#btn-addModa", () => { agregarModa(); });
onClick("#btn-calcModa", () => { calcularModa(); });
onClick("#btn-calcPorcentaje", () => { calcularPorcentajeTeoria(); });
onClick("#btn-addAnomalia", () => { agregarAnomalia(); });
onClick("#btn-calcAnomalia", () => { calcularAnomalia(); });