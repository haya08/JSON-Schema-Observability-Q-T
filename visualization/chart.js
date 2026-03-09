async function loader(){
    let data;
    try{
        const res = await fetch("../output/metrics.json");
        if(!res.ok){
            throw new Error(`Failed to fetch metrics: ${res.status}`);
        }
        data = await res.json();
    }catch(err){
        console.log(err);
    }

    const npmDownloads = data.metrics.npm.downloads;
    const githubRepoCount = data.metrics.github.repo_count;

    const ctx = document.getElementById('myChart');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["AJV npm weekly downloads", "GitHub repos with json-schema topic"],
            datasets: [{
                label: 'analysis result',
                data: [npmDownloads, githubRepoCount],
                borderWidth: 1,
                backgroundColor: [
                    "rgba(54,162,235,0.6)",
                    "rgba(255,99,132,0.6)"
                ],
                borderRadius: 10
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


loader();