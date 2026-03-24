export function switchTabs(){
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.onclick = () => {
            document.querySelector(".nav-link.active")?.classList.remove("active");
            link.classList.add("active");

            const text = link.textContent;

            // if (text.includes("overview")) showSection("overview");
            // if (text.includes("topTab")) showSection("repos");
            // if (text.includes("trendingTab")) showSection("trending");
        };
    });
}

// function showSection(section) {
//   document.getElementById("overviewSection").classList.add("hidden");
//   document.getElementById("reposSection").classList.add("hidden");
//   document.getElementById("trendingSection").classList.add("hidden");

//   document.getElementById(section + "Section").classList.remove("hidden");
// }