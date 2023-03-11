let root = document.documentElement;

function changeValue(id, value) {
    root.style.setProperty(`--${id}`, value);
}


function vh(percent) {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function vw(percent) {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function vmin(percent) {
    return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
    return Math.max(vh(percent), vw(percent));
}

const Hero = document.querySelector(".Hero");

let herocontent = document.querySelector(".hero-content");
if (!herocontent) {
    herocontent = document.querySelector(".Hero *");
}

const header = document.querySelector("header");

/*const nextSection = header.nextElementSibling;*/
const detector = document.querySelector(".intersection-observer-detector");

document.addEventListener('DOMContentLoaded', () => {

    if (Hero && herocontent) {
        header.classList.add("hero-header");
    } else if (Hero) {
        header.classList.remove("hero-header");
        Hero.classList.add("alone");
    } else {
        header.classList.remove("hero-header");
    }
})

const semiexposedheader = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.remove("slightly-exposed")
        } else {
            header.classList.add("slightly-exposed")
        }
    })
}, options = {rootMargin: '-60px', threshold: 0.99});



const exposedheader = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.add("exposed")
            header.classList.remove("slightly-exposed")
        } else {
            header.classList.remove("exposed")
            header.classList.add("slightly-exposed")
        }
    })
}, options = {rootMargin: '60px', threshold: 0.99});




function getHeroPosition() {
    if (Hero) {
        return window.getComputedStyle(Hero).gridRowStart
    }
}
let heroposition = getHeroPosition()

function setHeaderObserver() {
    heroposition = getHeroPosition()

    header.classList.remove("exposed")
    header.classList.remove("slightly-exposed")
    semiexposedheader.disconnect();
    exposedheader.disconnect();

    if (Hero && heroposition === '1') {
        semiexposedheader.observe(herocontent);
    } else if (!Hero || heroposition === '3') {
        exposedheader.observe(detector);
    }
}

setHeaderObserver()
window.addEventListener("resize", setHeaderObserver);




const toggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector("header");
/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");

        // adds the menu (hamburger) icon
        toggle.querySelector("a").innerHTML = "<i class=’fas fa-bars’></i>";
    } else {
        menu.classList.add("active");

        // adds the close (x) icon
        toggle.querySelector("a").innerHTML = "<i class=’fas fa-times’></i>";
    }
}
/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);