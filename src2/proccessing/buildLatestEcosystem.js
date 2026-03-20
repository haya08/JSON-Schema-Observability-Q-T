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

function calculateHealth(cards, charts) {
    const activity = cards.activityRate;

    const growthData = charts.growth.data;
    const last = growthData[growthData.length - 1];
    const prev = growthData[growthData.length - 2] || last;

    const isGrowing = last >= prev;

    if (activity > 0.3 && isGrowing) {
        return { status: "healthy", label: "Healthy" };
    }

    if (activity > 0.15) {
        return { status: "moderate", label: "Moderate" };
    }

    return { status: "risk", label: "At Risk" };
}

function calculateTrend(charts) {
    const activityData = charts.activity.data;

    if (activityData.length < 2) {
        return "stable";
    }

    const last = activityData[activityData.length - 1];
    const prev = activityData[activityData.length - 2];

    if (last > prev) return "up";
    if (last < prev) return "down";
    return "stable";
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

    const health = calculateHealth(cards, charts);

    const trend = calculateTrend(charts);

    const latestData = {
        collectedAt: new Date().toISOString(),
        cards,
        charts,
        health,
        trend
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