export function renderActivityDistribution(data) {
    const ctx = document.getElementById("activityDistributionChart");

    const dist = data.activityDistribution;

    // new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //         labels: ["Active", "Inactive", "Stale"],
    //         datasets: [{
    //             data: [
    //                 dist.active,
    //                 dist.inactive,
    //                 dist.stale
    //             ]
    //         }]
    //     },
    //     plugins: {
    //         legend: {
    //             position: "bottom",
    //             labels: {
    //                 usePointStyle: true,
    //                 padding: 15
    //             },
    //             borderWidth: 0
    //         }
    //     }
    // });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Active", "Inactive", "Stale"],
            datasets: [{
                data: [
                    dist.active,
                    dist.inactive,
                    dist.stale
                ],
                backgroundColor: [
                    "#22c55e",
                    "#eab308",
                    "#ef4444"
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "70%",
            plugins: {
            legend: {
                position: "bottom",
                labels: {
                usePointStyle: true,
                padding: 15
                }
            }
            },
        //     // plugins: [{
        //     // id: 'centerText',
        //     // beforeDraw(chart) {
        //     //     const { width } = chart;
        //     //     const { height } = chart;
        //     //     const ctx = chart.ctx;

        //     //     ctx.restore();
        //     //     ctx.font = "bold 18px sans-serif";
        //     //     ctx.textAlign = "center";
        //     //     ctx.textBaseline = "middle";

        //     //     ctx.fillText("Repos", width / 2, height / 2 - 10);
        //     //     ctx.fillText(total, width / 2, height / 2 + 15);

        //     //     ctx.save();
        //     // }
        // }]
        },
        
    });
}