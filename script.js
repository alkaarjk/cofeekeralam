
// Mobile Navigation
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");

});

// Close menu after clicking a navigation link
document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});

// Contact Form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    alert("Thank you! Your message has been received.");

    contactForm.reset();

});
