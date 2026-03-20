import { fetchEcosystemData } from "./api.js";
import { renderOverview } from "../components/overview.js";
import { renderGrowthChart } from "../components/growthChart.js";
import { renderActivityChart } from "../components/activityChart.js";   
import { fetchReposData } from "./api.js";
import { initReposTable } from "../components/reposTable.js";
import { initTheme } from "./theme.js";
import { renderHealthBadge } from "../components/health.js";

async function init() {
    // initTheme();

    const EcosystemData = await fetchEcosystemData();

    renderOverview(EcosystemData);
    renderGrowthChart(EcosystemData);
    renderActivityChart(EcosystemData);
    renderHealthBadge(EcosystemData);

    const reposData = await fetchReposData();

    initReposTable(reposData);

}

init();