require("dotenv").config();

//! collectors
const collectEcosystem = require("./collectors/collectEcosystem");
const collectRepos = require("./collectors/collectRepos");

//! processers
const proccessEcosystem = require("./proccessing/proccessEcosystem");
const processRepo = require("./proccessing/processRepo");

//! storage
const saveEcosystemSnapshot = require("./storage/saveEcosystemSnapshot");
const saveReposSnapshot = require("./storage/saveReposSnapshot");


async function main(){
    //? ecosystem

    //! collect data
    const ecosystem = await collectEcosystem();

    //! process data
    await proccessEcosystem(ecosystem);

    //! save data
    await saveEcosystemSnapshot(ecosystem);

    //? repos

    //! collect data
    const repos = await collectRepos();

    //! process data
    await processRepo(repos);

    //! save data
    await saveReposSnapshot(repos);

    console.log("Done!");
}

main();