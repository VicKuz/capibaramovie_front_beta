/* !!!!!!!!!!!!!!!!!!!!! ПЕРЕВІРЯТИ ЧИ Є HERO, якщо ні - то одразу sticky !!!!!!!!!!!!!!!!! */

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
const nextSection = header.nextElementSibling;

document.addEventListener('DOMContentLoaded', () => {

    if ((Hero && herocontent)) {
        header.classList.add("hero-header");
    } else if (Hero) {
        header.classList.remove("hero-header");
        Hero.classList.add("alone");
    } else {
        header.classList.remove("hero-header");
    }
})

const slightlyexposedheader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.remove("slightly-exposed")
        } else {
            header.classList.add("slightly-exposed")
        }
    });
}, options = {rootMargin: '-40px', threshold: 1});

const exposedheader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.add("exposed")
        } else {
            header.classList.remove("exposed")
        }
    });
}, options = {rootMargin: '40px', threshold: 1});


if (!Hero) {
    console.log('nema')
    exposedheader.observe(nextSection);
} else if (Hero) {
    slightlyexposedheader.observe(herocontent)
}