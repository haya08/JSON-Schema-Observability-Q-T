function classifyHealth(stars){
    if(stars > 1000) return "high";
    else if(stars > 100) return "medium";
    else return "low";
}

function poccessRepo(repo){
    const popularityScore = repo.stars + repo.forks * 2;

    const health = classifyHealth(popularityScore);

    return{
        ...repo,
        popularityScore: popularityScore,
        health: health
    }
}

module.exports = poccessRepo;