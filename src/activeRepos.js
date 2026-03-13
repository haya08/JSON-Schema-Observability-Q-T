async function fetchGitHubActiveRepoCount(topic) {
    const url = `https://api.github.com/search/repositories?q=topic:${topic}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();

        //! calculate the total number of active repos
        const today = new Date();
        const pastYear = today.getFullYear() - 1;
        today.setFullYear(pastYear);
        const active_repos = data.items.filter(p => new Date(p.pushed_at) > today).length;

        return active_repos;

    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return null;
    }
}

module.exports = fetchGitHubActiveRepoCount;