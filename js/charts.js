import { $ID } from "./utils.js";
import { promedios } from "./main.js";

let barras = null;
let miMiniChart = null;

// Reconstruye el gráfico de barras comparativo adaptando los colores de fondo según la nota
export function pintarBarras() {
  let elementCanva = $ID("canva");
  if (!elementCanva) return;
  let canva = elementCanva.getContext("2d");

  if (barras !== null) {
    barras.destroy();
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

  const esOscuro = document.body.getAttribute("data-theme") === "dark";
  const colorTexto = esOscuro ? "#94a3b8" : "#718096";
  const colorLineas = esOscuro ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  barras = new Chart(canva, {
    type: "bar",
    data: {
      labels: ["Matemática", "Inglés", "Química", "Biología", "Filosofía", "Física"],
      datasets: [{
        label: "Promedio por Materia",
        data: promedios,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          grid: { color: colorLineas },
          ticks: { color: colorTexto }
        },
        x: {
          grid: { color: colorLineas },
          ticks: { color: colorTexto }
        }
      },
      plugins: {
        legend: { labels: { color: colorTexto } }
      }
    }
  });
}

// Modifica o instancia dinámicamente un gráfico de líneas para la sección interactiva de tendencias
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
  const colorLineas = esOscuro ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

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
          pointBackgroundColor: colorLinea
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { grid: { color: colorLineas }, ticks: { color: colorTexto } },
        x: { grid: { color: colorLineas }, ticks: { color: colorTexto } }
      },
      plugins: { legend: { labels: { color: colorTexto } } }
    }
  });
}

// Destruye de forma segura el gráfico miniatura y limpia su espacio de memoria
export function destruirMiniGrafica() {
  if (miMiniChart) {
    miMiniChart.destroy();
    miMiniChart = null;
  }
}
