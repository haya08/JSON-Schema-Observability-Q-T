export function renderHealthCard(data) {
    const container = document.getElementById("health-card");

    const activityRate = data.cards.activityRate;
    const staleRate = (data.cards.staleRepos / data.cards.totalRepos);

    console.log(staleRate);

    // 🧠 تحديد الحالة
    let level = "moderate";

    if (activityRate > 0.6 && staleRate < 0.2) {
        level = "healthy";
    } else if (activityRate < 0.3 || staleRate > 0.4) {
        level = "at_risk";
    }

    // 🟡 messages
    const statusMap = {
        healthy: {
            icon: "fas fa-heart-pulse",
            title: "Healthy Growth",
            desc: "Strong ecosystem activity"
        },
        moderate: {
            icon: "fas fa-heart-pulse",
            title: "Moderate Growth",
            desc: "Stable ecosystem activity"
        },
        at_risk: {
            icon: "🔴",
            title: "At Risk",
            desc: "Low activity or high stagnation"
        }
    };

    const status = statusMap[level];

    // 🟢 details (explanation)
    const details = [
        `• ${Math.round(activityRate * 100)}% of repos are active`,
        `• ${Math.round(staleRate * 100)}% are stale`
    ];

    // ✨ render
    container.innerHTML = `
        <div class="Card dummy ${level}">
            <h3><i class="${status.icon}"></i> Ecosystem Health</h3>
            <p class="status">${status.title}</p>
            <p class="desc">${status.desc}</p>

            <div class="health-details">
                ${details.map(line => `<p>${line}</p>`).join("")}
            </div>
        </div>
    `;
}