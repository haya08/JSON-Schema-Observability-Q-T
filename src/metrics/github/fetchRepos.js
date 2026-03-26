const fetchWithRetry = require("../../utils/githubClient");

async function fetchReposCount() {
    const query = "topic:json-schema+is:public";
    const url = `https://api.github.com/search/repositories?q=${query}&per_page=1000`;

    const res = await fetchWithRetry(url);

    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();

    return {
        count: data.total_count,
        query,
        fetchedAt: new Date().toISOString(),
        source: "github"
    };
}

module.exports = fetchReposCount;