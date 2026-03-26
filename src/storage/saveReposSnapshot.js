const fs = require("fs");
const path = require("path");
const buildLatestRepos = require("../proccessing/buildLatestRepos");

function saveReposSnapshot(data){
    const dataPath = path.join(__dirname, "../../data");
    if(!fs.existsSync(dataPath)){
        fs.mkdirSync(dataPath);
    }

    const reposPath = path.join(dataPath, 'repos');
    if(!fs.existsSync(reposPath)){
        fs.mkdirSync(reposPath);
    }

    const snapshotsPath = path.join(reposPath, 'snapshots');
    if(!fs.existsSync(snapshotsPath)){
        fs.mkdirSync(snapshotsPath);
    }

    const date = new Date().toISOString().split('T')[0];

    const latestFilePath = path.join(reposPath, 'latest.json');
    fs.writeFileSync(latestFilePath, JSON.stringify(data, null, 2), { recursive: true });

    const filePath = path.join(snapshotsPath, `${date}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { recursive: true });

    buildLatestRepos();
}

module.exports = saveReposSnapshot;