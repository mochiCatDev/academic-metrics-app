let barras = null;
let miMiniChart = null;

export function pintarBarras() {
  let canva = $ID("canva").getContext("2d");

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

  // Detectamos si el modo oscuro está activo
  const esOscuro = document.body.getAttribute("data-theme") === "dark";
  const colorTexto = esOscuro ? "#94a3b8" : "#718096";
  const colorLineas = esOscuro ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  barras = new Chart(canva, {
    type: "bar",
    data: {
      labels: Object.keys(dataMaterias),
      datasets: [
        {
          label: "NOTAS GENERALES",
          data: promedios,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: { font: { size: 12 }, color: colorTexto }
        }
      },
      scales: {
        x: {
          grid: { color: colorLineas },
          ticks: { color: colorTexto }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 10,
          step: 1,
          grid: { color: colorLineas },
          ticks: { color: colorTexto }
        },
      },
    },
  });
}

export function actualizarMiniGrafica(datosValidos, colorLinea, colorFondo) {
  if (miMiniChart) {
    miMiniChart.destroy();
  }

  const labelsX = datosValidos.map((_, index) => `t-${index + 1}`);
  const ctx = $ID("demo-tendencia-chart").getContext("2d");

  const esOscuro = document.body.getAttribute("data-theme") === "dark";
  const colorTexto = esOscuro ? "#94a3b8" : "#718096";
  const colorLineas = esOscuro ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const colorPunto = esOscuro ? "#90cdf4" : "#1a365d";

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
          pointBackgroundColor: colorPunto,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 }, color: colorTexto }
        },
        y: {
          grid: { color: colorLineas },
          ticks: { font: { size: 10 }, color: colorTexto }
        },
      },
    },
  });
}
