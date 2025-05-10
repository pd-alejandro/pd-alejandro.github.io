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

// add touch functionality
let touchStartX = 0
let touchStartY = 0
let touchEndX = 0
let touchEndY = 0
const swipeThreshold = 24
let isMoving = false
let moveDirection = null

carousel_wrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    isMoving = false
    moveDirection = null
    carousel_wrap.classList.add('no-transition')
})

carousel_wrap.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX
    touchEndY = e.touches[0].clientY

    const deltaX = touchEndX - touchStartX
    const deltaY = touchEndY - touchStartY

    if (!isMoving) {
        isMoving = true
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            moveDirection = "x"
        } else {
            moveDirection = "y"
        }
    }

    if (moveDirection === "x") {
        e.preventDefault()
        carousel_wrap.style.left = `${-carousel_width * carousel_counter + deltaX}px`
    } else {
        return
    }
})

carousel_wrap.addEventListener('touchend', () => {
    const deltaX = touchEndX - touchStartX

    carousel_wrap.classList.remove('no-transition')

    if (moveDirection === "x") {
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0) {
                carousel_slide('next')
            } else {
                carousel_slide('prev')
            }
        } else {
            carousel_wrap.style.left = `${-carousel_width * carousel_counter}px`
        }
    }
})