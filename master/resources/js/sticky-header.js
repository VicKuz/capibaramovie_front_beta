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
const herocontent = document.querySelector(".hero-content");
const header = document.querySelector("header");

document.addEventListener('DOMContentLoaded', () => {

    if (Hero) {
        header.classList.add("hero-header");
    } else {
        header.classList.remove("hero-header");
    }
})


const headerObserverOptions = {
    rootMargin: '0px',
    threshold: 1
}


const headerexposed = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.remove("exposed")
        } else {
            header.classList.add("exposed")
        }
    });
}

const observer = new IntersectionObserver(headerexposed, headerObserverOptions)

observer.observe(herocontent);
