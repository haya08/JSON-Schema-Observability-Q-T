export function renderOverview(data) {
    const cards = data.cards;

    document.getElementById("totalRepos").innerText = 
        formatNumber(cards.totalRepos);

    document.getElementById("activityRate").innerText =
        (cards.activityRate * 100).toFixed(1) + "%";

    document.getElementById("downloads").innerText =
        formatNumber(cards.totalDownloads.total);

    const health = renderHealth(data);

    document.getElementById("health").innerText = 
        health.level;

    document.getElementById("healthDesc").innerText = 
        health.message;

}

//  format numbers (1M, 2.5K)
function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
}

function renderHealth(data){
    const activityRate = data.cards.activityRate;
    const staleRate = data.cards.staleRate;

    console.log(staleRate);

    let level = "moderate";
    let message = "Stable activity";

    if (activityRate > 0.6 && staleRate < 0.2) {
        level = "healthy";
        message = "Strong activity";
    } else if (activityRate < 0.3 || staleRate > 0.4) {
        level = "at_risk";
        message = "Low activity";
    }

    return{
        level,
        message
    }
}
