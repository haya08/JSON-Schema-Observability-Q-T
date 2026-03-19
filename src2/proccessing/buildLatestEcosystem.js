const fs = require("fs");
const path = require("path");

function readSnapshots(folderPath) {
    const files = fs.readdirSync(folderPath).sort();

    return files.map(file => {
        const filePath = path.join(folderPath, file);
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
}

function buildChartData(snapshots, keyPath) {
    return {
        labels: snapshots.map(s => s.date),
        data: snapshots.map(s => {
            return keyPath.split(".").reduce((obj, key) => obj[key], s);
        })
    };
}

function buildLatestEcosystem() {
    const ecosystemPath = path.join(__dirname, "../../data/ecosystem");
    const snapshotPath = path.join(ecosystemPath, "snapshots");

    const snapshots = readSnapshots(snapshotPath);

    if (snapshots.length === 0) {
        throw new Error("No ecosystem snapshots found");
    }

    const latest = snapshots[snapshots.length - 1];

    const cards = {
        totalRepos: latest.totals.reposCount,
        activeRepos: latest.totals.activeRepos,
        activityRate: latest.metrics.activityRate,
        totalDownloads: latest.totals.npmDownloads
    };

    const charts = {
        growth: buildChartData(snapshots, "totals.repos"),
        activity: buildChartData(snapshots, "metrics.activityRate"),
        activeRepos: buildChartData(snapshots, "totals.activeRepos")
    };

    const latestData = {
        collectedAt: new Date().toISOString(),
        cards,
        charts
    };

    const latestPath = path.join(ecosystemPath, "latest.json");

    fs.writeFileSync(
        latestPath,
        JSON.stringify(latestData, null, 2)
    );

    console.log("[Latest] Ecosystem latest.json updated");

    return latestData;
}

module.exports = buildLatestEcosystem;