async function loadData(){

    const res = await fetch("../output/metrics.json")
    const data = await res.json()

    const dates = data.map(d => d.date)

    const repoCounts = data.map(d => d.repo_count);
    const newRepos = data.map(d => d.new_repos);
    const stars = data.map(d => d.total_stars);
    const avgStars = data.map(d => d.avg_stars);
    const ajvDownloads = data.map(d => d.npm_downloads.ajv);

    // update KPI cards

    const latest = data[data.length-1];
    console.log(latest);

    document.getElementById("repoCount").innerText =
    latest.repo_count;

    document.getElementById("newReposCount").innerText =
    latest.new_repos;

    document.getElementById("starsCount").innerText =
    latest.total_stars;

    document.getElementById("ajvDownloads").innerText =
    latest.npm_downloads.ajv;

    document.getElementById("lastUpdated").innerText =
    "Last update: " + latest.date

    // Repo chart

    new Chart(document.getElementById("repoChart"),{
        type:"line",
        data:{
            labels:dates,
            datasets:[{
                label:"Repo Count",
                data:repoCounts
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                    color: "#ffffff"
                    }
                },
                y: {
                    ticks: {
                    color: "#ffffff"
                    }
                }
            }
        }
    })

    // NPM chart

    new Chart(document.getElementById("npmChart"),{
        type:"line",
        data:{
            labels:dates,
            datasets:[{
                label:"AJV Downloads",
                data:ajvDownloads
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                    color: "#ffffff"
                    }
                },
                y: {
                    ticks: {
                    color: "#ffffff"
                    }
                }
            }
        }
    })

    // Stars chart

    new Chart(document.getElementById("starsChart"),{
        type:"line",
        data:{
            labels:dates,
            datasets:[{
                label:"Stars",
                data:stars
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                    color: "#ffffff"
                    }
                },
                y: {
                    ticks: {
                    color: "#ffffff"
                    }
                }
            }
        }
    })
}

loadData()