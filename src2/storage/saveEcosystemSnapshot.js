const fs = require("fs");
const path = require("path");

function saveEcosystemSnapshot(data) {
    const dataPath = path.join(__dirname, "../../data");
    if(!fs.existsSync(dataPath)){
        fs.mkdirSync(dataPath);
    }

    const snapshotsPath = path.join(dataPath, "snapshots");
    if(!fs.existsSync(snapshotsPath)){
        fs.mkdirSync(snapshotsPath);
    }

    const ecosystemPath = path.join(snapshotsPath, 'ecosystem');
    if(!fs.existsSync(ecosystemPath)){
        fs.mkdirSync(ecosystemPath);
    }

    const date = new Date().toISOString().split('T')[0];

    const filePath = path.join(ecosystemPath, `${date}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { recursive: true });
}

module.exports = saveEcosystemSnapshot