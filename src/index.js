const fs = require("fs");
const path = require("path");

const fetchNpmWeeklyDownloads = require("./npmDownloads");
const fetchGitHubTopicRepoCount = require("./repos");
const fetchGitHubTopicStarsCount = require("./stars");
const showGrowth = require("./newRepos");
const fetchGitHubActiveRepoCount = require("./activeRepos");
const { json } = require("stream/consumers");

const OUTPUT_DIR = path.join(__dirname, "../output");

async function main() {
    const ajvDownloads = await fetchNpmWeeklyDownloads("ajv");
    const typiaDownloads = await fetchNpmWeeklyDownloads("typia");
    const jsonSchemaTopic = await fetchGitHubTopicRepoCount("json-schema");
    const totalStarCount = await fetchGitHubTopicStarsCount("json-schema");
    const growth = await showGrowth(jsonSchemaTopic);
    const activeRepos = await fetchGitHubActiveRepoCount("json-schema");

    const result = {
        date: new Date().toISOString().split("T")[0],
        npm_downloads: {
            ajv: ajvDownloads,
            typia: typiaDownloads
        },
        repo_count: jsonSchemaTopic,
        new_repos: growth,
        total_stars: totalStarCount,
        avg_stars: (totalStarCount / jsonSchemaTopic).toFixed(0),
        active_repos: activeRepos
    };

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    let metrics = [];

    if(fs.existsSync(path.join(OUTPUT_DIR, "metrics.json"))){
        const fileContent = fs.readFileSync(path.join(OUTPUT_DIR, "metrics.json"), "utf-8");
        if(fileContent !== "")
            metrics = JSON.parse(fileContent);
    }

    metrics.push(result);
    fs.writeFileSync(path.join(OUTPUT_DIR, "metrics.json"), JSON.stringify(metrics, null, 2), "utf-8");

    console.log("Metrics saved to output/metrics.json");
}

main();