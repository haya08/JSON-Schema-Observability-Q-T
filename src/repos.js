require("dotenv").config();

const fetchWithRetry = require("./githubRateLimit");

async function fetchGitHubTopicRepoCount(topic, since) {
    const url = `https://api.github.com/search/repositories?q=topic:${topic}+pushed:>${since}&per_page=100`;
    
    const res = await fetchWithRetry(url);

    const data = await res.json();

    return data.total_count;
}

module.exports = fetchGitHubTopicRepoCount;