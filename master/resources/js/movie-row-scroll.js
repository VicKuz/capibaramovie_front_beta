document.addEventListener('DOMContentLoaded', () => {


    if (document.querySelector('.movie-cards-row')) {

        // Slider dragging
        const slider = document.querySelector('.movie-cards-row');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            beginMomentumTracking();
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX); //scroll-fast
            var prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
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
            slider.scrollLeft += velX * 2;
            velX *= 0.85;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }


        /*Scrollable left and right detection for server + vignette */
        slider.onscroll = function () {rowVignette()};

        function rowVignette() {
            var rowViewportLeft = slider.scrollLeft;
            var rowViewportRight = slider.scrollLeft + slider.clientWidth;
            var rowWidth = slider.scrollWidth;

            /*
            console.log(rowViewportRight);
            console.log(rowWidth);
             */

            if (rowViewportRight < rowWidth) {
                document.getElementById("vignette-right").classList.add("visible");
            } else if (rowViewportRight >= rowWidth) {
                document.getElementById("vignette-right").classList.remove("visible");
            }

            if (rowViewportLeft > 0) {
                document.getElementById("vignette-left").classList.add("visible");
            } else if (rowViewportLeft === 0) {
                document.getElementById("vignette-left").classList.remove("visible");
            }


        }

        rowVignette();

    }


});

/* https://dev.to/wolffe/i-created-a-draggable-carousel-with-momentum-scrolling-and-mobile-support-using-vanilla-javascript-17he */