export function initTabs() {
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // remove active
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content")
                .forEach(c => c.classList.remove("active"));

            // activate
            tab.classList.add("active");

            const target = tab.dataset.tab;
            document.getElementById(target + "Tab")
                .classList.add("active");
        });
    });
}