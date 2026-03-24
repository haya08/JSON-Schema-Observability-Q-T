let active, inactive, stale;

const centerTextPlugin = {
  id: "centerText",

  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const data = chart.config.data.datasets[0].data;

    // نحسب total
    const total = data.reduce((a, b) => a + b, 0);

    // نحسب active %
    const active = data[0]; // أول value = active
    const percent = Math.round((active / total) * 100);

    let label = "Active";
    if (percent < 40) label = "Low";
    else if (percent < 70) label = "Moderate";
    else label = "Healthy";

    ctx.save();

    // النص الكبير
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(percent + "%", width / 2, height / 2);

    // النص الصغير تحت
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#777";

    ctx.fillText(label, width / 2, height / 2 + 20);

    ctx.restore();
  }
};

function renderLegend(data) {
  const container = document.getElementById("activityLegend");

  container.innerHTML = `
    <div class="legend-item">
      <span class="dot green"></span>
      Active ${active}%
    </div>

    <div class="legend-item">
      <span class="dot yellow"></span>
      Inactive ${inactive}%
    </div>

    <div class="legend-item">
      <span class="dot red"></span>
      Stale ${stale}%
    </div>
  `;
}

export function renderActivityDistribution(data) {

  const ctx = document.getElementById("activityDistributionChart");

  active = data.cards.activityRate * 100;
  stale = data.cards.staleRate * 100;
  inactive = 100 - active - stale;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Active", "Inactive", "Stale"],
      datasets: [{
        data: [active, inactive, stale],

        // 🎨 نفس vibe الصورة
        backgroundColor: [
          "#22c55e", // green
          "#eab308", // yellow
          "#ef4444"  // red
        ],

        borderWidth: 0
      }]
    },

    options: {
      cutout: "65%", // حجم الدائرة من جوه
      plugins: {
        legend: {
          display: false // هنعمل legend custom
        }
      }
    },

    plugins: [centerTextPlugin]
  });


  renderLegend(data);
}
