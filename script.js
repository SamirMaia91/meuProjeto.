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

const elements = document.querySelectorAll(".skill-card, .project-card, .service-card, .highlight");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1 }
);

elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "0.6s ease";
    observer.observe(element);
});