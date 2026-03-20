const fs = require("fs");
const path = require("path");

function readSnapshots(folderPath) {
    const files = fs.readdirSync(folderPath)
        .filter(f => f !== "latest.json")
        .sort();

    return files.map(file => {
        const filePath = path.join(folderPath, file);
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
}

function buildTrendingRepos() {
    const snapshotsPath = path.join(__dirname, "../../data/repos/snapshots");

    const snapshots = readSnapshots(snapshotsPath);

    if (snapshots.length < 2) {
        return [];
    }

    const latest = snapshots[snapshots.length - 1].repos;
    const prev = snapshots[snapshots.length - 2].repos;

    // 🟢 map (past one)
    const prevMap = new Map();
    prev.forEach(repo => {
        prevMap.set(repo.name, repo);
    });

    // 🟣 growth
    const trending = latest.map(repo => {
        const old = prevMap.get(repo.name);

        const growth = old
            ? repo.stars - old.stars
            : repo.stars; // new repo

        return {
            ...repo,
            growth
        };
    });

    //  sort
    trending.sort((a, b) => b.growth - a.growth);

    return trending.slice(0, 10);
}

module.exports = buildTrendingRepos;