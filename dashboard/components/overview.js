export function renderOverview(data) {
    const cards = data.cards;

    document.getElementById("totalRepos").innerText = cards.totalRepos;

    document.getElementById("activeRepos").innerText = cards.activeRepos;

    document.getElementById("activityRate").innerText =
        (cards.activityRate * 100).toFixed(1) + "%";

    document.getElementById("downloads").innerText =
        formatNumber(cards.totalDownloads.total);
}

//  format numbers (1M, 2.5K)
function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
}