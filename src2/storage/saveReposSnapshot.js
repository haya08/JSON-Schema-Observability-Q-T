const fs = require("fs");
const path = require("path");

function saveReposSnapshot(data){
    const dataPath = path.join(__dirname, "../../data");
    if(!fs.existsSync(dataPath)){
        fs.mkdirSync(dataPath);
    }

    const snapshotsPath = path.join(dataPath, "snapshots");
    if(!fs.existsSync(snapshotsPath)){
        fs.mkdirSync(snapshotsPath);
    }

    const reposPath = path.join(snapshotsPath, 'repos');
    if(!fs.existsSync(reposPath)){
        fs.mkdirSync(reposPath);
    }

    const date = new Date().toISOString().split('T')[0];

    const filePath = path.join(reposPath, `${date}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { recursive: true });
}

module.exports = saveReposSnapshot;