export function renderTrendingRepos(data) {
    const container = document.getElementById("trendingList");

    const repos = data.trendingRepos;

    container.innerHTML = "";

    repos.forEach((repo, i) => {
        const item = document.createElement("div");
        item.className = `trending-item top-${i + 1}`;

        item.innerHTML = `
            <i class="fa-solid fa-arrow-trend-up"></i>
            <span>
            ${i + 1}. 
            <a href="https://github.com/${repo.name}" target="_blank">
                ${repo.name}
            </a>
            </span>
            <span class="growth">+${repo.growth}</span>
        `;

        container.appendChild(item);
    });
}