function isOverflown(element) {
    return element.scrollWidth > element.clientWidth;
}

document.addEventListener('DOMContentLoaded', (FindCarousels()))
onresize = (event) => FindCarousels()

function FindCarousels() {
    const carousels = document.getElementsByClassName('carousel');
    /*!!!!!!!!!!!!!!відібрати в масив тільки ті що шириною більше вюпорта, якщо менше - додаєм клас few (або стиль по центру)!!!!!!!!!!!!!!!!!!!!!!!!!*/
    if (carousels) {
    var array = Array.from(carousels);
    array.forEach(CarouselFunction);
    }
}

    function CarouselFunction(item) {

        const carousel = item;

        if (isOverflown(item)) {
        // carousel dragging
        var isDown = false;
        var startX;
        var scrollLeft;

        carousel.classList.add("scrollable")
        carousel.classList.remove("few")

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            cancelMomentumTracking();
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
            beginMomentumTracking();
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX); //scroll-fast
            var prevScrollLeft = carousel.scrollLeft;
            carousel.scrollLeft = scrollLeft - walk;
            velX = carousel.scrollLeft - prevScrollLeft;
        });

        // Momentum
        var velX = 0;
        var momentumID;

        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }

        function cancelMomentumTracking() {
            cancelAnimationFrame(momentumID);
        }

        function momentumLoop() {
            carousel.scrollLeft += velX * 2;
            velX *= 0.85;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }

        const carouselObserver1 = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carousel.classList.add("fog-right")
                    carousel.classList.remove("fog-left")
                    carousel.classList.remove("fog-both")
                } else {
                    carousel.classList.remove("fog-right")
                    carousel.classList.add("fog-both")
                }
            })
        }, options = {root: carousel, rootMargin: '10px', threshold: 1});

        const carouselObserver2 = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carousel.classList.add("fog-left")
                    carousel.classList.remove("fog-right")
                    carousel.classList.remove("fog-both")
                } else {
                    carousel.classList.remove("fog-left")
                    carousel.classList.add("fog-both")
                }
            })
        }, options = {root: carousel, rootMargin: '10px', threshold: 1});

        carouselObserver1.observe(carousel.querySelector('.carousel > :first-child'))
        carouselObserver2.observe(carousel.querySelector('.carousel > :last-child'))

    } else {
            carousel.classList.remove("scrollable")
            carousel.classList.add("few")
        }
}

/* https://dev.to/wolffe/i-created-a-draggable-carousel-with-momentum-scrolling-and-mobile-support-using-vanilla-javascript-17he */