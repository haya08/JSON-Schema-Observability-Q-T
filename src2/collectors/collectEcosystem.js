const fetchReposCount = require("../metrics/github/fetchRepos");
const fetchActiveRepos = require("../metrics/github/fetchActiveRepos");
const {fetchDownloadsMultiplePackages} = require("../metrics/npm/fetchDownloads");
const config = require("../config/config");

async function collectEcosystem() {
    try {
        const [
            totalRepos,
            activeRepos,
            npmDownloads
        ] = await Promise.all([
            fetchReposCount(),
            fetchActiveRepos(),
            fetchDownloadsMultiplePackages(config.trackedPackages)
        ]);

        return {
            collectedAt: new Date().toISOString(),
            sources: ["github", "npm"],
            totalRepos,
            activeRepos,
            npmDownloads
        };

    } catch (err) {
        console.error("Error collecting ecosystem data:", err);
        throw err;
    }
}

module.exports = collectEcosystem;