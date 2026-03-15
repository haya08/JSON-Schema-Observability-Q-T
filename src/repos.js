require("dotenv").config();

const fetchWithRetry = require("./githubRateLimit");

async function fetchGitHubTopicRepoCount(topic, since) {
    const url = `https://api.github.com/search/repositories?q=topic:${topic}`;
    
    const res = await fetchWithRetry(url);

    const data = await res.json();

    return data.total_count;
}

module.exports = fetchGitHubTopicRepoCount;