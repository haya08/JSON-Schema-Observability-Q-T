export function renderActivityChart(data) {
    const ctx = document.getElementById("activityChart");

    const chartData = data.charts.activity;

    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: "Activity Rate",
                    data: chartData.data,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => (ctx.raw * 100).toFixed(1) + "%"
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: (value) => (value * 100) + "%"
                    }
                }
            }
        }
    });
}