export function initTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        html.classList.add("dark");
    } else {
        html.classList.remove("dark");
    }

    themeToggle.addEventListener("click", () => {
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}