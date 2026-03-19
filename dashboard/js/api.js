export async function fetchEcosystemData() {
    const res = await fetch("../../data/ecosystem/latest.json");
    return res.json();
}