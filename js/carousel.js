const carousel_max = document.querySelectorAll('.carousel__item').length - 1
const carousel_wrap = document.querySelector('.carousel__wrap')
const carousel_tabs = document.querySelectorAll('.carousel__tab')

let carousel_width = document.getElementById('carousel').offsetWidth

let carousel_counter = 0

// slide function
const carousel_slide = function (slideTo) {
    carousel_tabs[carousel_counter].classList.remove('current')

    carousel_counter = (function () {
        if (!isNaN(slideTo)) {
            return slideTo
        } else {
            if (slideTo === 'prev') {
                return (carousel_counter === 0) ? (carousel_max) : (--carousel_counter)
            } else {
                return (carousel_counter === carousel_max) ? (0) : (++carousel_counter)
            }
        }
    })()

    carousel_wrap.style.left = `${-carousel_width * carousel_counter}px`

    carousel_tabs[carousel_counter].classList.add('current')
}

// resize when using relative units for width
window.addEventListener('resize', function () {
    carousel_width = carousel.offsetWidth
    carousel_wrap.classList.add('no-transition')
    carousel_wrap.style.left = `${-carousel_width * carousel_counter}px`
    setTimeout(() => {
        carousel_wrap.classList.remove('no-transition')
    }, 0)
})

// Add touch functionality
let touchStartX = 0
let touchEndX = 0

carousel_wrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX
})

carousel_wrap.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX
})

carousel_wrap.addEventListener('touchend', () => {
    const touchDiff = touchStartX - touchEndX

    if (touchDiff > 50) {
        // Swipe left (next item)
        carousel_slide('next')
    } else if (touchDiff < -50) {
        // Swipe right (previous item)
        carousel_slide('prev')
    }
})