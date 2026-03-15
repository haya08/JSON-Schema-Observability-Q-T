const fetchWithRetry = require("./githubRateLimit");

async function fetchGitHubActiveRepoCount(topic) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().split('T')[0];

    const url = `https://api.github.com/search/repositories?q=topic:${topic}+pushed:>${dateStr}&per_page=1`;
    
    const res = await fetchWithRetry(url);

    const data = await res.json();

    return data.total_count;
}

module.exports = fetchGitHubActiveRepoCount;