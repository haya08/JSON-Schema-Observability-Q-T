function classifyHealth(score, activityStatus){
    if (activityStatus === "stale") {
        return "risk";
    }

    if (score > 1000) return "high";
    if (score > 100) return "medium";

    return "low";
}

function classifyActivity(repo) {
    const lastPush = new Date(repo.pushed_at);
    const now = new Date();

    const diffDays = (now - lastPush) / (1000 * 60 * 60 * 24);

    if (diffDays < 30) return "active";
    if (diffDays < 180) return "inactive";
    return "stale";
}

function poccessRepo(repo){
    const popularityScore = repo.stars + repo.forks * 2;

    const pushed_at = new Date(repo.pushed_at);

    const activityStatus = classifyActivity(repo);

    const health = classifyHealth(popularityScore, activityStatus);

    return{
        ...repo,
        pushed_at,
        popularityScore,
        activityStatus,
        health
    }
}

function proccessRepos(repos) {
    const proccedRepos = [];
    for(const repo of repos){
        proccedRepos.push(poccessRepo(repo));
    }

    return{
        date: new Date().toISOString().split('T')[0],
        repos: proccedRepos
    }
}

module.exports = proccessRepos;