export function renderHealthBadge(data) {
    const card = document.getElementById("healthCard");
    const icon = document.getElementById("healthIcon");
    const title = document.getElementById("healthTitle");
    const desc = document.getElementById("healthDesc");

    const { health, trend } = data;

    card.className = `health-card ${health.status}`;

    title.innerHTML = `
        ${health.label} ${getTrendIcon(trend)}
    `;

    desc.innerText = getDescription(health.status, trend);

    icon.innerHTML = getHealthIcon(health.status);
}

function getHealthIcon(status) {
    if (status === "healthy") return "🟢";
    if (status === "moderate") return "⚠️";
    return "🔴";
}

function getTrendIcon(trend) {
    if (trend === "up") return `<i class="fa-solid fa-arrow-up"></i>`;
    if (trend === "down") return `<i class="fa-solid fa-arrow-down"></i>`;
    return `<i class="fa-solid fa-minus"></i>`;
}

function getDescription(status, trend) {
    if (trend === "up") return "Ecosystem is improving";
    if (trend === "down") return "Ecosystem activity is declining";

    return "Stable ecosystem activity";
}