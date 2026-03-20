export function initTheme() {
    const btn = document.getElementById("themeToggle");

    // Check if the user has a saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        btn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        btn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i> Light Mode'
            : '<i class="fa-solid fa-moon"></i> Dark Mode';

        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}