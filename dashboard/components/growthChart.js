export function renderGrowthChart(data) {
    const ctx = document.getElementById("growthChart");

    const chartData = data.charts.growth;

    if(!chartData || chartData.data.length === 0){
        console.warn("No growth data");
        return;
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: "Total Repositories",
                    data: chartData.data,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                    label: (ctx) => ctx.raw.toLocaleString()
                    }
                }
            },
            fill: true
        }
    });
}