import { $ID } from "./utils.js";
import { promedios, mostrarDetalleMateria } from "./main.js";
import { dataMaterias } from "./storage.js"; // Importación clave

let miMiniChart = null;
let graficoBarrasInstance = null;
let graficoLineasInstance = null;

export function pintarBarras() {
  const elementCanva = $ID("canva");
  if (!elementCanva) return;
  const ctx = elementCanva.getContext("2d");

  const keys = Object.keys(dataMaterias);
  const nombres = keys.map((k) => dataMaterias[k].nombre);

  // Detectamos el tema actual para que las etiquetas y cuadrículas mantengan los colores correctos
  const esOscuro = document.body.getAttribute("data-theme") === "dark";
  const colorTexto = esOscuro ? "#94a3b8" : "#718096";
  const colorLineas = esOscuro
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  if (graficoBarrasInstance !== null) {
    graficoBarrasInstance.destroy();
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

  graficoBarrasInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: nombres,
      datasets: [
        {
          label: "Promedio por Materia",
          data: promedios,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (e, elementos) => {
        if (elementos.length > 0) {
          const indiceClickeado = elementos[0].index;
          const idMateriaCorrespondiente = keys[indiceClickeado];

          mostrarDetalleMateria(idMateriaCorrespondiente);
        }
      },
      plugins: {
        legend: { labels: { color: colorTexto } },
      },
      scales: {
        x: {
          ticks: { color: colorTexto },
          grid: { color: colorLineas },
        },
        y: {
          min: 0,
          max: 10,
          ticks: {
            color: colorTexto,
            stepSize: 1, // Incremento unitario estricto
            maxTicksLimit: 11, // Muestra las 11 marcas (0, 1, 2... hasta el 10)
          },
          grid: { color: colorLineas },
        },
      },
    },
  });
}

export function pintarLineaEvolucion(idMateria, notas) {
  const elementChart = $ID("canvas-evolucion-materia");
  if (!elementChart) return;
  const ctx = elementChart.getContext("2d");

  if (graficoLineasInstance) {
    graficoLineasInstance.destroy();
  }

  const labels = notas.map((_, index) => `Eval ${index + 1}`);
  const esOscuro = document.body.getAttribute("data-theme") === "dark";
  const colorTexto = esOscuro ? "#94a3b8" : "#718096";
  const colorLineas = esOscuro
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  graficoLineasInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Evolución de Calificaciones",
          data: notas,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.2,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: colorTexto } },
      },
      scales: {
        x: {
          ticks: { color: colorTexto },
          grid: { color: colorLineas },
        },
        y: {
          min: 0,
          max: 10,
          ticks: {
            color: colorTexto,
            stepSize: 1,
            maxTicksLimit: 11,
          },
          grid: { color: colorLineas },
        },
      },
    },
  });
}

export function actualizarMiniGrafica(datosValidos, colorLinea, colorFondo) {
  if (miMiniChart) {
    miMiniChart.destroy();
  }

  let elementChart = $ID("demo-tendencia-chart");
  if (!elementChart) return;
  const ctx = elementChart.getContext("2d");
  const labelsX = datosValidos.map((_, index) => `t-${index + 1}`);

  const esOscuro = document.body.getAttribute("data-theme") === "dark";
  const colorTexto = esOscuro ? "#94a3b8" : "#718096";
  const colorLineas = esOscuro
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  miMiniChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labelsX,
      datasets: [
        {
          label: "Evolución",
          data: datosValidos,
          borderColor: colorLinea,
          backgroundColor: colorFondo,
          borderWidth: 3,
          tension: 0.2,
          pointRadius: 4,
          pointBackgroundColor: colorLinea,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: colorTexto } },
      },
      scales: {
        x: { ticks: { color: colorTexto }, grid: { color: colorLineas } },
        y: { ticks: { color: colorTexto }, grid: { color: colorLineas } },
      },
    },
  });
}

export function destruirMiniGrafica() {
  if (miMiniChart) {
    miMiniChart.destroy();
    miMiniChart = null;
  }
}
