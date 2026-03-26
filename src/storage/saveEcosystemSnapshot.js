const fs = require("fs");
const path = require("path");
const buildLatestEcosystem = require("../proccessing/buildLatestEcosystem");

function saveEcosystemSnapshot(data) {
    // const fontEndPath = path.join(__dirname, "../../frontend");
    // if(!fs.existsSync(fontEndPath)){
    //     fs.mkdirSync(fontEndPath);
    // }

    const dataPath = path.join(__dirname, "../../data");
    if(!fs.existsSync(dataPath)){
        fs.mkdirSync(dataPath);
    }

    const ecosystemPath = path.join(dataPath, 'ecosystem');
    if(!fs.existsSync(ecosystemPath)){
        fs.mkdirSync(ecosystemPath);
    }

    const snapshotsPath = path.join(ecosystemPath, 'snapshots');
    if(!fs.existsSync(snapshotsPath)){
        fs.mkdirSync(snapshotsPath);
    }

    const date = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Africa/Cairo'
    });

    const filePath = path.join(snapshotsPath, `${date}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { recursive: true });

    buildLatestEcosystem();
}

module.exports = saveEcosystemSnapshot