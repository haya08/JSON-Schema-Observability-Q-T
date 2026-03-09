async function fetchNpmWeeklyDownloads(pkg) {
    const url = `https://api.npmjs.org/downloads/point/last-week/${pkg}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`npm API error: ${res.status}`);
        }

        const data = await res.json();

        return {
            package: pkg,
            downloads: data.downloads,
            start: data.start,
            end: data.end
        };

    } catch (error) {
        console.error("Failed to fetch npm downloads:", error);
        return null;
    }
}

module.exports = fetchNpmWeeklyDownloads;