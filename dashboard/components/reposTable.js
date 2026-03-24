let currentPage = 1;
const rowsPerPage = 10;
let allRepos = [];
let displayedRepos = [];

export function initReposTable(data) {
    allRepos = data.allRepos;
    displayedRepos = allRepos;

    renderPage();

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

    displayedRepos = filtered;

    currentPage = 1;

    renderPage();
}

function getPaginatedData() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return displayedRepos.slice(start, end);
}

function renderPagination() {
    const container = document.getElementById("pagination");
    const totalPages = Math.ceil(displayedRepos.length / rowsPerPage);

    let buttons = "";

    for (let i = 1; i <= totalPages; i++) {
        buttons += `
            <button class="${i === currentPage ? 'active' : ''}" 
                    onclick="goToPage(${i})">
                ${i}
            </button>

        `;
    }

    buttons = `
        <button onclick="goToPage(${currentPage - 1})" 
            ${currentPage === 1 ? "disabled" : ""}>Prev</button>
        ` + buttons + `
        <button onclick="goToPage(${currentPage + 1})" 
            ${currentPage === totalPages ? "disabled" : ""}>Next</button>
        `;

    container.innerHTML = buttons;
}

window.goToPage = function(page) {
    const totalPages = Math.ceil(displayedRepos.length / rowsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderPage();
};

function renderPage() {
    const paginated = getPaginatedData();
    render(paginated);
    renderPagination();
}

function render(repos) {
    const tbody = document.getElementById("reposTableBody");
    tbody.innerHTML = "";

    repos.forEach((repo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${(currentPage - 1) * rowsPerPage + index + 1}</td>
            <td>${repo.name}</a></td>
            <td>${formatNumber(repo.stars)}</td>
            <td>${formatNumber(repo.forks)}</td>
            <td>${formatNumber(repo.score)}</td>
            <td>${renderHealth(repo.health)}</td>
            <td>${renderActivity(repo.activityStatus)}</td>
        `;

        row.onclick = () => openRepoPanel(repo);   
        
        
        tbody.appendChild(row);
    });

    document.getElementById("overlay").onclick = () => {
        document.getElementById("repoPanel").classList.remove("open");
        document.getElementById("overlay").classList.add("hidden");
    };
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

function openRepoPanel(repo) {

    document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("repoPanel").classList.add("open");

  const panel = document.getElementById("repoPanel");

  document.getElementById("repoName").textContent = repo.name;

  document.getElementById("panelBody").innerHTML = `
    <div class="repo-header">
      <p class="repo-sub">${repo.language}</p>
    </div>

    <div class="repo-stats">
      <span><i class="fa-solid fa-star" style="color: gold"></i> ${repo.stars}</span>
      <span><i class="fa-solid fa-code-branch" style="color: black"></i> ${repo.forks}</span>
      <span><i class="fa-solid fa-eye" style="color: black"></i> ${repo.watchers}</span>
    </div>

    <div class="repo-badges">
      <span class="badge ${repo.activityStatus}">
        ${repo.activityStatus}
      </span>

      <span class="badge ${repo.health}">
        ${repo.health} health
      </span>
    </div>

    <hr/>

    <div class="repo-grid">
      <div><label>Language</label><p>${repo.language}</p></div>
      <div><label>Issues</label><p>${repo.issues}</p></div>
      <div><label>PRs</label><p>${repo.pullRequests}</p></div>
      <div><label>Last Push</label><p>${repo.pushed_at}</p></div>
    </div>

    <div class="repo-actions">
      <a href="${repo.url}" target="_blank">View on GitHub</a>
    </div>
  `;

  panel.classList.add("open");
}

document.getElementById("closePanel").onclick = () => {
  document.getElementById("repoPanel").classList.remove("open");
  document.getElementById("repoPanel").classList.remove("open");
  document.getElementById("overlay").classList.add("hidden");
};