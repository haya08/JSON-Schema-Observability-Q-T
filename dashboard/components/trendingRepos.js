// export function renderTrendingRepos(data) {
//     const container = document.getElementById("trendingList");

//     const repos = data.trendingRepos;

//     container.innerHTML = "";

//     repos.forEach((repo, i) => {
//         const item = document.createElement("div");
//         item.className = `trending-item top-${i + 1}`;

//         item.innerHTML = `  
//             <span>
//             ${i + 1}. 
//             <a href="https://github.com/${repo.name}" target="_blank">
//                 ${repo.name}
//             </a>
//             </span>

//             🔥 +${repo.growth}
//             <span class="velocity">⚡ ${repo.velocity}/day</span>
//         `;

//         container.appendChild(item);
//     });
// }

export function renderTrendingRepos(data) {
    const container = document.getElementById("trendingList");

    const repos = data.trendingRepos;

    container.innerHTML = "";

    repos.forEach((repo, i) => {
        const item = document.createElement("div");
        item.className = "trending-item";

        item.onclick = () => openRepoPanel(repo);

        item.innerHTML = `  
            <div class="trend-left">
                <span class="rank">#${i + 1}</span>

                <div class="repo-info">
                    <a href="https://github.com/${repo.name}" target="_blank">
                        ${repo.name}
                    </a>

                    <span class="badge trend">
                        ${getTrendBadge(repo)}
                    </span>
                </div>
            </div>

            <div class="trend-right">
                <span class="growth">🔥 +${repo.growth}</span>
                <span class="velocity">⚡ ${repo.velocity}/day</span>
            </div>
        `;

        container.appendChild(item);
    });
}

function getTrendBadge(repo) {
    if (repo.velocity > 20) return "🚀 Exploding";
    if (repo.velocity > 10) return "🔥 Hot";
    if (repo.velocity > 3) return "📈 Rising";
    return "🧊 Stable";
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