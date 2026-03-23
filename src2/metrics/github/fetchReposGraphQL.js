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

async function fetchAllRepos() {
    let allRepos = [];
    let cursor = null;
    let hasNextPage = true;

    while (hasNextPage) {
        const res = await fetchReposGraphQL(100, cursor);

        allRepos.push(...res.repos);

        cursor = res.nextCursor;
        hasNextPage = res.hasNextPage;
    }

    return allRepos;
}

async function fetchAllNormalizedRepos() {
    const allRepos = await fetchAllRepos();

    const normalizedRepos = [];

    for (const repo of allRepos) {
        normalizedRepos.push({
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
        });
    }

    return normalizedRepos;
}

async function fetchActiveRepos() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().split('T')[0];

    const activeRepos = fetchAllNormalizedRepos().filter(repo => {
        const pushedAt = new Date(repo.pushedAt);
        return pushedAt > oneYearAgo;
    });

    return activeRepos;
}

module.exports = {
    fetchAllNormalizedRepos,
    fetchActiveRepos
};