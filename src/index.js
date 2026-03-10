const fs = require("fs");
const path = require("path");

const fetchNpmWeeklyDownloads = require("./npmMetrix");
const fetchGitHubTopicRepoCount = require("./githubMetrix");
const fetchGitHubTopicStarsCount = require("./githubStars");
const { json } = require("stream/consumers");

const OUTPUT_DIR = path.join(__dirname, "../output");

async function main() {
    const ajvDownloads = await fetchNpmWeeklyDownloads("ajv");
    const typiaDownloads = await fetchNpmWeeklyDownloads("typia");
    const jsonSchemaTopic = await fetchGitHubTopicRepoCount("json-schema");
    const ajvGithubStars = await fetchGitHubTopicStarsCount("json-schema", "ajv");
    const typiaGithubStars = await fetchGitHubTopicStarsCount("json-schema", "typia");

    const result = {
        date: new Date().toISOString().split("T")[0],
        npm_downloads: {
            ajv: ajvDownloads,
            typia: typiaDownloads
        },
        githup_repo_count: jsonSchemaTopic,
        starsCount: {
            ajv: ajvGithubStars,
            typia: typiaGithubStars
        }
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