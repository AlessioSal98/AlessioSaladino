// Shared behaviour: mobile menu, active nav link, footer year.
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
        toggle.addEventListener("click", () => {
            const open = links.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open);
        });
    }

    const page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(a => {
        if (a.getAttribute("href") === page) a.classList.add("active");
    });

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
});
