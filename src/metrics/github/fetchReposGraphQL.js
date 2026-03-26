const fetchWithRetry = require("../../utils/githubClient");
const config = require("../../config/config");

async function fetchReposGraphQL(limit = 50, cursor = null) {
    const after = cursor ? `, after: "${cursor}"` : "";

    const query = `
    {
        search(query: "topic:json-schema", type: REPOSITORY, first: ${limit}${after}) {
            repositoryCount
            nodes {
                ... on Repository {
                    name
                    url
                    stargazerCount
                    forkCount
                    issues(states: OPEN) {
                        totalCount
                    }
                    pullRequests(states: OPEN) {
                        totalCount
                    }
                    watchers {
                        totalCount
                    }
                    primaryLanguage {
                        name
                    }
                    updatedAt
                    pushedAt
                }
            }
        }
    }
    `;

    const res = await fetchWithRetry(
        "https://api.github.com/graphql",   
        {
            method: "POST",
            body: JSON.stringify({ query })
        }
    );

    const json = await res.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    const data = json.data.search;

    return{
        repositoryCount: data.repositoryCount,
        repos: data.nodes
    }
}

async function fetchAllRepos(limit = 100) {
    let allRepos = [];
    let cursor = null;
    let hasNextPage = true;
    let totalCount = 0;

    while (hasNextPage && allRepos.length < limit) {
        const res = await fetchReposGraphQL(100, cursor);

        if (!totalCount) {
            totalCount = res.repositoryCount;
        }

        allRepos.push(...res.repos);

        cursor = res.nextCursor;
        hasNextPage = res.hasNextPage;
    }

    return {
        totalCount,
        repos: allRepos.slice(0, limit)
    };
}

async function fetchAllNormalizedRepos() {
    const { totalCount, repos } = await fetchAllRepos();

    const normalizedRepos = repos.map(repo => ({
        name: repo.name,
        url: repo.url,

        stars: repo.stargazerCount,
        forks: repo.forkCount,

        issues: repo.issues?.totalCount || 0,
        pullRequests: repo.pullRequests?.totalCount || 0,
        watchers: repo.watchers?.totalCount || 0,

        language: repo.primaryLanguage?.name || "Unknown",

        updatedAt: repo.updatedAt,
        pushed_at: repo.pushedAt
    }));

    return {
        totalCount,
        repos: normalizedRepos
    };
}

async function fetchActiveRepos() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const data = await fetchAllNormalizedRepos();

    const repos = data.repos;

    return repos.filter(repo => {
        const pushedAt = new Date(repo.pushed_at);
        return pushedAt > oneYearAgo;
    });
}

// const allRepos = fetchAllNormalizedRepos();
// const activeRepos = fetchActiveRepos(allRepos);

module.exports = {
    fetchAllNormalizedRepos,
    fetchActiveRepos
};