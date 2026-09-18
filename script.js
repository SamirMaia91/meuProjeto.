const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const header = document.querySelector(".header");


// MENU MOBILE

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuBtn.setAttribute("aria-expanded", isOpen);
    });


    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

        });

    });

}


// HEADER COM SCROLL

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


// ANO AUTOMÁTICO NO FOOTER

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// ANIMAÇÃO DOS CARDS AO ENTRAR NA TELA

const elements = document.querySelectorAll(
    ".skill-card, .project-card, .service-card, .highlight"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


elements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "0.6s ease";

    observer.observe(element);

});