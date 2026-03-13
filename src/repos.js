
async function fetchGitHubTopicRepoCount(topic) {
    const url = `https://api.github.com/search/repositories?q=topic:${topic}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();

        return data.total_count;

    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return null;
    }
}

module.exports = fetchGitHubTopicRepoCount;