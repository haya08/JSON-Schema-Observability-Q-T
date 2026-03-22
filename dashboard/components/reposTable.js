let allRepos = [];

export function initReposTable(data) {
    allRepos = data.allRepos;

    render(allRepos);

    setupControls();
}

function setupControls() {
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");

    searchInput.addEventListener("input", () => {
        updateTable();
    });

    sortSelect.addEventListener("change", () => {
        updateTable();
    });
}

function updateTable() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const sortValue = document.getElementById("sortSelect").value;

    let filtered = allRepos.filter(repo =>
        repo.name.toLowerCase().includes(searchValue)
    );

    filtered.sort((a, b) => b[sortValue] - a[sortValue]);

    render(filtered.slice(0, 20));
}

function render(repos) {
    const tbody = document.getElementById("reposTableBody");
    tbody.innerHTML = "";

    repos.forEach((repo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="https://github.com/${repo.name}" target="_blank">${repo.name}</a></td>
            <td>${formatNumber(repo.stars)}</td>
            <td>${formatNumber(repo.forks)}</td>
            <td>${formatNumber(repo.score)}</td>
            <td>${renderHealth(repo.health)}</td>
            <td>${renderActivity(repo.activityStatus)}</td>
        `;

        tbody.appendChild(row);
    });
}

// helpers
function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
}

function renderHealth(health) {
    if (health === "high") return `<span class="badge high"><i class="fas fa-heart-circle-check"></i> High</span>`;
    if (health === "medium") return `<span class="badge medium"><i class="fas fa-heart-circle-exclamation"></i> Medium</span>`;
    return `<span class="badge low"><i class="fas fa-heart-circle-xmark"></i> Low</span>`;
}

function renderActivity(status) {
    if (status === "active") {
        return `<span class="badge active"><i class="fa-solid fa-circle-check"></i> Active</span>`;
    }
    if (status === "inactive") {
        return `<span class="badge inactive"><i class="fa-solid fa-triangle-exclamation"></i> Inactive</span>`;
    }
    return `<span class="badge stale"><i class="fa-solid fa-circle-xmark"></i> Stale</span>`;
}