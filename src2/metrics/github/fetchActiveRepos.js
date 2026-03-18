const fetchWithRetry = require("../../utils/githubClient");

async function fetchActiveRepos() {
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().split('T')[0];
    
    const query = "topic:json-schema+is:public";
    const url = `https://api.github.com/search/repositories?q=${query}+pushed:>${dateStr}&per_page=1`;
    
    const res = await fetchWithRetry(url);

    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();

    return {
        count: data.total_count,
        query,
        definition: "Repositories with at least one push in the last 12 months",
        fetchedAt: new Date().toISOString(),
        source: "github"
    };
}

module.exports = fetchActiveRepos;