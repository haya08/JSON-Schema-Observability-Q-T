const fetchWithRetry = require("../../utils/npmClient");

async function fetchDownloadsSinglePackage(pkg, period = "last-week") {
    const url = `https://api.npmjs.org/downloads/point/${period}/${pkg}`;

    const res = await fetchWithRetry(url);

    if(!res.ok) {
        throw new Error(`NPM API error: ${res.status}`);
    }

    const data = await res.json();
    
    return {
        package: pkg,
        downloads: data.downloads,
        period,
        fetchedAt: new Date().toISOString(),
        source: "npm"
    };
}

async function fetchDownloadsMultiplePackages(pkgs, period = "last-week") {
    const result = [];
    for(const pkg of pkgs) {
        const data = await fetchDownloadsSinglePackage(pkg, period);
        result.push(data);
    }
    return Promise.all(result);
}

module.exports = {
    fetchDownloadsSinglePackage,
    fetchDownloadsMultiplePackages
};