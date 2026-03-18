const fetchWithRetry = require("../../utils/githubClient");

async function fetchRepoDetails(fullName) {
    const url = `https://api.github.com/repos/${fullName}`;

    const res = await fetchWithRetry(url);

    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
    }

    const repo = await res.json();

    return {
        name: repo.full_name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        issues: repo.open_issues_count,
        watchers: repo.watchers_count,
        updatedAt: repo.updated_at
    };
}

module.exports = fetchRepoDetails;