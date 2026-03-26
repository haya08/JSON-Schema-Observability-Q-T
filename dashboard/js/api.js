export async function fetchEcosystemData() {
    const res = await fetch("../../data/ecosystem/latest.json");
    console.log(res);
    return res.json();
}

export async function fetchReposData() {
    const res = await fetch("../../data/repos/latest.json");
    return res.json();
}