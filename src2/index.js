require("dotenv").config();

//! collectors
const collectEcosystem = require("./collectors/collectEcosystem");
const collectRepos = require("./collectors/collectRepos");

//! processers
const proccessEcosystem = require("./proccessing/proccessEcosystem");
const proccessRepos = require("./proccessing/processRepo");

//! storage
const saveEcosystemSnapshot = require("./storage/saveEcosystemSnapshot");
const saveReposSnapshot = require("./storage/saveReposSnapshot");

const fetchAllRepos = require("./metrics/github/fetchReposGraphQL");


async function main(){

    //! testing graphQL

    console.log("total repos: ", await fetchAllRepos());


    //? repos

    //! collect data
    // const repos = await collectRepos();

    //! process data
    // const proccessedRepos = await proccessRepos(repos);

    //! save data
    // await saveReposSnapshot(proccessedRepos);

    //? ecosystem

    //! collect data
    // const ecosystem = await collectEcosystem();

    //! process data
    // const proccessedEcosystem = await proccessEcosystem(ecosystem, proccessedRepos.repos);

    //! save data
    // await saveEcosystemSnapshot(proccessedEcosystem);


    console.log("Done!");
}

main();