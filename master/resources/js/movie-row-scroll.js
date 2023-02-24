document.addEventListener('DOMContentLoaded', () => {

    const carousels = document.getElementsByClassName('carousel');

    /*!!!!!!!!!!!!!!відібрати в масив тільки ті що шириною більше вюпорта, якщо менше - додаєм клас few (або стиль по центру)!!!!!!!!!!!!!!!!!!!!!!!!!*/

    if (carousels) {
    var arr = Array.from(carousels);
    arr.forEach(CarouselFunction);
    }

    function CarouselFunction(item) {

        // carousel dragging
        const carousel = item;
        var isDown = false;
        var startX;
        var scrollLeft;

        rowVignette(carousel);

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

        /*Scrollable left and right detection for server + vignette */

        carousel.onscroll = function(e) {
            rowVignette(carousel);
        };


        /*зробити ширину димки-градієнту залежно від того скільки лишилось скролити */

        function rowVignette(row) {
            var rowViewportLeft = Math.round(row.scrollLeft);
            var rowViewportRight = Math.round(row.scrollLeft + row.clientWidth);
            var rowWidth = Math.round(row.scrollWidth);

            if (rowViewportRight < rowWidth && rowViewportLeft <= vw(5)) {
                row.classList.remove("vignette-left");
                row.classList.remove("vignette-right-left");
                row.classList.add("vignette-right");
            } else if (rowViewportRight+vw(5) >= rowWidth && rowViewportLeft > 0) {
                row.classList.remove("vignette-right");
                row.classList.remove("vignette-right-left");
                row.classList.add("vignette-left");
            } else if (rowViewportLeft > 0 && rowViewportRight < rowWidth) {
                row.classList.remove("vignette-left");
                row.classList.remove("vignette-right");
                row.classList.add("vignette-right-left");
            }

            /*
            if (rowViewportRight < rowWidth) {
                row.classList.add("vignette-right");
            } else if (rowViewportRight >= rowWidth) {
                row.classList.remove("vignette-right");
            }

            if (rowViewportLeft > 0) {
                row.classList.add("vignette-left");
            } else if (rowViewportLeft === 0) {
                row.classList.remove("vignette-left");
            }
            */


        }

    }

});

/* https://dev.to/wolffe/i-created-a-draggable-carousel-with-momentum-scrolling-and-mobile-support-using-vanilla-javascript-17he */