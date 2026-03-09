const fs = require("fs");
const path = require("path");

const fetchNpmWeeklyDownloads = require("./npmMetrix");
const fetchGitHubTopicRepoCount = require("./githubMetrix");

const OUTPUT_DIR = path.join(__dirname, "../output");

async function main() {
    const npmMetric = await fetchNpmWeeklyDownloads("ajv");

    const githubMetric = await fetchGitHubTopicRepoCount("json-schema");

    const result = {
        date: new Date().toISOString(),
        metrics: {
        npm: npmMetric,
        github: githubMetric
        }
    };

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(
        path.join(OUTPUT_DIR, "metrics.json"),
        JSON.stringify(result, null, 2)
    );

    console.log("Metrics saved to output/metrics.json");
}

main();