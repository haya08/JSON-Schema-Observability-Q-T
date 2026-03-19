function calActivityRate(activeRepos, totalRepos){
    if(totalRepos){
        return (activeRepos / totalRepos).toFixed(2);
    }
    return 0;
}

function calGrowthRate(prevSnapshot, totalRepos){
    if(prevSnapshot){
        const prevTotalRepos = prevSnapshot;
        if(prevTotalRepos){
            return ((totalRepos - prevTotalRepos) / prevTotalRepos).toFixed(2);
        }
    }
    return null;
}

function classifyHealth(activityRate){
    if (activityRate > 0.5) return "healthy";
    if (activityRate > 0.2) return "moderate";
    return "low";
}

function ecosystemSnapshot (data, prevSnapshot = null) {
    const date = data.collectedAt;
    const totalRepos = data.totalRepos.count;
    const activeRepos = data.activeRepos.count;
    //! get the pkg name and downloads
    const npmDownloads = data.npmDownloads.map(({package, downloads}) => ({package, downloads}));
    const totalNpmDownloads = npmDownloads.reduce((total, {downloads}) => total + downloads, 0);

    //! cal activity rate
    const activityRate = calActivityRate(activeRepos, totalRepos); 

    //! cal growth rate
    const growthRate = calGrowthRate(prevSnapshot, totalRepos);

    return{
        date: date,
        totals:{
            reposCount: totalRepos,
            activeRepos: activeRepos,
            npmDownloads: {
                total: totalNpmDownloads,
                packages: npmDownloads
            },
        },
        metrics:{
            activityRate: activityRate,
            growthRate: growthRate
        },
        health: classifyHealth(activityRate)
    }
}

module.exports = ecosystemSnapshot