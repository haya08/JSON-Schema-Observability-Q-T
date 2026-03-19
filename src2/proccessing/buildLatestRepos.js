const fs = require("fs");
const path = require("path");

function readSnapshots(folderPath) {
    const files = fs.readdirSync(folderPath).sort();

    return files.map(file => {
        const filePath = path.join(folderPath, file);
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
}

function calculateScore(repo) {
    return repo.stars + repo.forks * 2;
}

function classifyHealth(repo) {
    if (repo.stars > 10000) return "high";
    if (repo.stars > 1000) return "medium";
    return "low";
}

function buildLatestRepos() {
    const snapshotsPath = path.join(__dirname, "../../data/repos/snapshots");

    const snapshots = readSnapshots(snapshotsPath);

    if (snapshots.length === 0) {
        throw new Error("No repo snapshots found");
    }

    const latestSnapshot = snapshots[snapshots.length - 1];

    let repos = latestSnapshot.repos;

    //  add derived metrics
    repos = repos.map(repo => ({
        ...repo,
        score: calculateScore(repo),
        health: classifyHealth(repo)
    }));

    //  sort
    repos.sort((a, b) => b.score - a.score);

    const topRepos = repos.slice(0, 20);

    //  summary
    const summary = {
        totalRepos: repos.length,
        avgStars: Math.round(
            repos.reduce((sum, r) => sum + r.stars, 0) / repos.length
        )
    };

    const latestData = {
        generatedAt: new Date().toISOString(),
        topRepos,
        allRepos: repos,
        summary
    };

    //  save
    const outputPath = path.join(__dirname, "../../data/repos/latest.json");

    fs.writeFileSync(
        outputPath,
        JSON.stringify(latestData, null, 2)
    );

    console.log("[Latest] Repos updated");

    return latestData;
}

module.exports = buildLatestRepos;