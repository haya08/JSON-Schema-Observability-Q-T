const fetchWithRetry = require("./githubRateLimit");

async function fetchGitHubTopicStarsCount(topic){
    const url = `https://api.github.com/search/repositories?q=topic:${topic}`;
    
    const res = await fetchWithRetry(url);

    const data = await res.json();

    const totalStars = data.items.reduce((acc, item) => acc + item.stargazers_count, 0);

    return totalStars;
}

module.exports = fetchGitHubTopicStarsCount;