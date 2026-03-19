import { fetchEcosystemData } from "./api.js";
import { renderOverview } from "../components/overview.js";
import { renderGrowthChart } from "../components/growthChart.js";
import { renderActivityChart } from "../components/activityChart.js";   

async function init() {
    const data = await fetchEcosystemData();

    renderOverview(data);
    renderGrowthChart(data);
    renderActivityChart(data);
}

init();