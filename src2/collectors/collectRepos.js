const fetchWithRetry = require("../utils/githubClient");
// const fetchRepoDetails = require("../metrics/github/fetchRepoDetails");
// const {fetchAllNormalizedRepos} = require("../metrics/github/fetchReposGraphQL");
const config = require("../config/config");

async function collectRepos(repos) {

    // const repos = await fetchAllNormalizedRepos();
    return repos;


    // const query = "topic:json-schema+is:public+sort:stars";
    // const url = `https://api.github.com/search/repositories?q=${query}&per_page=${config.topReposLimit}`;

    // const res = await fetchWithRetry(url);

    // if (!res.ok) {
    //     throw new Error(`GitHub API error: ${res.status}`);
    // }

    // const data = await res.json();

    // const repos = data.items;

    // const detailedRepos = [];

    // for (const repo of repos) {
    //     const details = await fetchRepoDetails(repo.full_name);
    //     detailedRepos.push(details);
    // }

    // return detailedRepos;
}

module.exports = collectRepos;