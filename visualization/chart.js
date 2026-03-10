async function loadChart() {

    const response = await fetch("../output/metrics.json");
    const metrics = await response.json();

    const dates = metrics.map(item => item.date);
    const npmDownloads = metrics.map(item => item.npm_downloads.ajv);
    // const typiaDownloads = metrics.map(item => item.npm_downloads.typia);
    const githubRepoCount = metrics.map(item => item.githup_repo_count);
    // const ajvGithubStars = metrics.map(item => item.starsCount.ajv);
    // const typeiaGithubStars = metrics.map(item => item.starsCount.typia);

    console.log(githubRepoCount)

    const data = {
        labels: dates,
        datasets: [
            {
                label: "AJV npm weekly downloads",
                data: npmDownloads,
                borderColor: "blue",
                fill: false,
                tension: 0.1
            },
            // {
            //     label: "TYPIA npm weekly downloads",
            //     data: typiaDownloads,
            //     borderColor: "green",
            //     fill: false,
            //     tension: 0.1
            // },
            {
                label: "GitHub repos with json-schema topic",
                data: githubRepoCount,
                borderColor: "red",
                fill: false,
                tension: 0.1
            },
            // {
            //     label: "GitHub stars count for AJV",
            //     data: ajvGithubStars,
            //     borderColor: "yellow",
            //     fill: false,
            //     tension: 0.1
            // }
        ]
    };

    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "JSON Schema Ecosystem Trends"
                }
            }
        }
    };

    new Chart(
        document.getElementById("myChart"),
        config
    );

}

loadChart();










// async function loader(){
//     let data;
//     try{
//         const res = await fetch("../output/metrics.json");
//         if(!res.ok){
//             throw new Error(`Failed to fetch metrics: ${res.status}`);
//         }
//         data = await res.json();
//     }catch(err){
//         console.log(err);
//     }

//     const npmDownloads = data.map(a => a.metrics.npm.downloads);
//     const githubRepoCount = data.map(a => a.metrics.github.repo_count);

//     const ctx = document.getElementById('myChart');

//     const chart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: ["AJV npm weekly downloads", "GitHub repos with json-schema topic"],
//             datasets: [{
//                 label: 'analysis result',
//                 data: [npmDownloads, githubRepoCount],
//                 borderWidth: 1,
//                 backgroundColor: [
//                     "rgba(54,162,235,0.6)",
//                     "rgba(255,99,132,0.6)"
//                 ],
//                 borderRadius: 10
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }


// loader();