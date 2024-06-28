// Carousel js that changes the carousel items to active and hides the inactive items. Fix the js so it hides the other carousels
let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');
        const itemCount = items.length;

        function showNextItem() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % itemCount;
            items[currentIndex].classList.add('active');
        }

        setInterval(showNextItem, 3000); // Change slide every 3 seconds


