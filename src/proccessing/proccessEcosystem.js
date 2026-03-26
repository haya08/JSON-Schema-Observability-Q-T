const config = require("../config/config");
const path = require("path");
const fs = require("fs");


function getActivityDistribution(repos) {
    const stats = {
        active: 0,
        inactive: 0,
        stale: 0
    };

    repos.forEach(repo => {
        if (stats[repo.activityStatus] !== undefined) {
            stats[repo.activityStatus]++;
        }
    });

    return stats;
}

function calActivityRate(activeRepos, totalRepos){
    if(totalRepos){
        return (activeRepos / totalRepos).toFixed(2);
    }
    return 0;
}

function calStaleRate(staleRepos, totalRepos){
    if(totalRepos){
        return (staleRepos / totalRepos).toFixed(2);
    }
    return 0;
}

function calGrowthRate(prevSnapshot, totalRepos){
    if(prevSnapshot){
        const prevTotalRepos = prevSnapshot.totals.reposCount;
        if(prevTotalRepos){
            return ((totalRepos - prevTotalRepos) / prevTotalRepos).toFixed(2);
        }
    }
    return 0;
}

function classifyHealth(activityRate){
    if (activityRate > 0.5) return "healthy";
    if (activityRate > 0.2) return "moderate";
    return "low";
}

function readSnapshots(folderPath) {
    const files = fs.readdirSync(folderPath).sort();

    return files.map(file => {
        const filePath = path.join(folderPath, file);
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });
}

function getPrevSnapshot(){
    const ecosystemPath = path.join(__dirname, "../../data/ecosystem/snapshots");
    const snapshots = readSnapshots(ecosystemPath);
    if(snapshots.length > 1){
        return snapshots[snapshots.length - 2];
    }
    return null;
}

function ecosystemSnapshot (data, proccededRepos) {
    const date = new Date(data.collectedAt).toISOString().split('T')[0];
    const totalRepos = data.totalRepos;
    // const activeRepos = data.activeRepos;
    const activeRepos = proccededRepos.filter(r => r.activityStatus === "active").length;
    const staleRepos = proccededRepos.filter(r => r.activityStatus === "stale").length;

    //! get the pkg name and downloads
    const npmDownloads = data.npmDownloads.map(({package, downloads}) => ({package, downloads}));
    const totalNpmDownloads = npmDownloads.reduce((total, {downloads}) => total + downloads, 0);

    //! cal activity rate
    const activityRate = calActivityRate(activeRepos, config.topReposLimit); 

    const staleRate = calStaleRate(staleRepos, config.topReposLimit);

    //! cal growth rate
    const prevSnapshot = getPrevSnapshot();
    const growthRate = calGrowthRate(prevSnapshot, totalRepos);

    const activityDistribution = getActivityDistribution(proccededRepos);

    return{
        date: date,
        totals:{
            reposCount: totalRepos,
            npmDownloads: {
                total: totalNpmDownloads,
                packages: npmDownloads
            },
        },
        metrics:{
            activityRate,
            staleRate,
            growthRate
        },
        health: classifyHealth(activityRate),
        activityDistribution
    }
}

module.exports = ecosystemSnapshot