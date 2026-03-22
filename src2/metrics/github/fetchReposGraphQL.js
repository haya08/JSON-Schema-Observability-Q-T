const fetchWithRetry = require("../../utils/githubClient");

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
        const res = await fetchReposGraphQL(10, cursor);

        allRepos.push(...res.repos);

        cursor = res.nextCursor;
        hasNextPage = res.hasNextPage;
    }

    return allRepos;
}

module.exports = fetchAllRepos;