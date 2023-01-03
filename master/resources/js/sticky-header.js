let root = document.documentElement;

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function vmin(percent) {
    return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
    return Math.max(vh(percent), vw(percent));
}




window.onscroll = function() {headerScroll()};

function headerScroll() {

    let header = document.getElementById("header");

    if (document.body.scrollTop > vw(2.5) || document.documentElement.scrollTop > vw(2.5)) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

    var header_opacity = (1 - window.pageYOffset/vw(1.5)) * 0.3 + 0.7;

    if (header_opacity < '0.7') {
        header.style.opacity = '0.7';
    } else if (header_opacity >= '0.7') {
        header.style.opacity = header_opacity;
    }

    /* Переробити vw(4) в івент sticked і записування значення скролу для розрахунку) */
    var bg_opacity = ((1 - (vh(100) - (window.pageYOffset - vw(4))) / vh(100)));
    root.style.setProperty('--header-background', 'rgba(0, 0, 0, ' + bg_opacity + ')');
    if (bg_opacity > '1') {
        root.style.setProperty('--header-background', 'rgba(0, 0, 0, 1)');
    } else if (bg_opacity < '0') {
        root.style.setProperty('--header-background', 'rgba(0, 0, 0, 0)');
    }

}