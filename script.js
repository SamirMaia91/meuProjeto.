const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const header = document.querySelector(".header");

function closeMenu() {
    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function toggleMenu() {
    if (!navLinks || !menuBtn) return;

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
}

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedOnButton = menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedOnButton && navLinks.classList.contains("active")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navLinks.classList.contains("active")) {
            closeMenu();
        }
    });
}

const updateHeaderState = () => {
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

window.addEventListener("scroll", updateHeaderState);
updateHeaderState();

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = document.querySelectorAll(
    ".section-title, .about-text, .process-card, .skill-card, .project-card, .service-card, .highlight"
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -32px 0px" }
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
        revealObserver.observe(element);
    });
}