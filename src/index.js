require("dotenv").config();

//! config
const config = require("./config/config");

//! collectors
const collectEcosystem = require("./collectors/collectEcosystem");
const collectRepos = require("./collectors/collectRepos");

//! processers
const proccessEcosystem = require("./proccessing/proccessEcosystem");
const proccessRepos = require("./proccessing/processRepo");

//! storage
const saveEcosystemSnapshot = require("./storage/saveEcosystemSnapshot");
const saveReposSnapshot = require("./storage/saveReposSnapshot");

const { fetchAllNormalizedRepos, fetchActiveRepos } = require("./metrics/github/fetchReposGraphQL");
const { fetchDownloadsMultiplePackages } = require("./metrics/npm/fetchDownloads");

async function compareAPIs() {
    const { performance } = require("perf_hooks");

    // // REST
    // let start = performance.now();

    // console.time("REST");

    // await fetchReposCount();
    // await fetchActiveRepos();

    // const query = "topic:json-schema+is:public+sort:stars";
    // const url = `https://api.github.com/search/repositories?q=${query}&per_page=${100}`;

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

    // console.log(detailedRepos.length);

    // console.timeEnd("REST");

    // let restTime = performance.now() - start;

    // GraphQL
    // start = performance.now();
    console.time("GraphQL");

    const reposCount = (await fetchAllNormalizedRepos()).length;

    console.timeEnd("GraphQL");
    console.log(reposCount)

    // let gqlTime = performance.now() - start;

    // console.log("REST Time:", restTime);
    // console.log("GraphQL Time:", gqlTime);
}


async function main(){
    console.time("Total execution time");

    //* data fetched
    const {totalCount, repos} = await fetchAllNormalizedRepos();
    const activeRepos = await fetchActiveRepos();

    //? repos

    //! collect data
    const collectedRepos = await collectRepos(repos);

    //! process data
    const proccessedRepos = await proccessRepos(collectedRepos);

    // console.log(proccessedRepos.date);

    //! save data
    await saveReposSnapshot(proccessedRepos);

    //? ecosystem

    //! collect data
    const ecosystem = await collectEcosystem(totalCount, activeRepos.length, await fetchDownloadsMultiplePackages(config.trackedPackages));

    // console.log(ecosystem);

    //! process data
    const proccessedEcosystem = await proccessEcosystem(ecosystem, proccessedRepos.repos);

    //! save data
    await saveEcosystemSnapshot(proccessedEcosystem);

    console.timeEnd("Total execution time");

    console.log("Done!");
}

main();