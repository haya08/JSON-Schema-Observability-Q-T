const fetchWithRetry = require("./githubRateLimit");

async function fetchNpmWeeklyDownloads(pkg) {
    const url = `https://api.npmjs.org/downloads/point/last-week/${pkg}`;

    const res = await fetchWithRetry(url);

    const data = await res.json();
    
    return data.downloads;
}

module.exports = fetchNpmWeeklyDownloads;