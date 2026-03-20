export function renderHealthBadge(data) {
    const card = document.getElementById("healthCard");
    const icon = document.getElementById("healthIcon");
    const title = document.getElementById("healthTitle");
    const desc = document.getElementById("healthDesc");

    const health = data.health;

    card.className = `health-card ${health.status}`;

    title.innerText = health.label;
    desc.innerText = getDescription(health.status);

    icon.innerHTML = getIcon(health.status);
}

function getIcon(status) {
    if (status === "healthy") return "🟢";
    if (status === "moderate") return "⚠️";
    return "🔴";
}

function getDescription(status) {
    if (status === "healthy") return "Strong growth and high activity";
    if (status === "moderate") return "Normal growth with stable activity";
    return "Low activity or declining growth";
}