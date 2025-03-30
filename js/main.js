// load
window.addEventListener('load', () => {
    document.querySelector('body').classList.remove('loading')
})

window.addEventListener('scroll', () => {
    const logo = document.querySelector('header .logo')
    const scrollThreshold = window.innerHeight * 0.5

    if (window.scrollY >= scrollThreshold) {
        logo.style.transform = 'translateY(0)'
    } else {
        logo.style.transform = 'translateY(-200%)'
    }
})

// tooltip
let interactiveItems = document.querySelectorAll('[class*="tooltip"]')
let longClick = false

interactiveItems.forEach((item) => {
    let elapsedTime = 0
    let timer = null
    item.addEventListener('mousedown', () => {
        elapsedTime = 0
        timer = setInterval(() => {
            elapsedTime += 100
        }, 100)
        longClick = false
    })
    item.addEventListener('mouseup', () => {
        clearInterval(timer)
    })
    item.addEventListener('mouseleave', () => {
        clearInterval(timer)
    })
    item.addEventListener('click', (e) => {
        if (elapsedTime >= 500) {
            e.preventDefault()
            e.stopPropagation()
            if ('vibrate' in navigator) {
                navigator.vibrate(50)
            }
            longClick = true
        } else {
            elapsedTime = 0
            longClick = false
        }
    })
})

// THEME
let currentTheme = (localStorage?.getItem('theme')) ? localStorage.getItem('theme') : (window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
document.body.classList.add(currentTheme)
document.querySelector('meta[name="theme-color"]').setAttribute('content', (currentTheme === 'light') ? '#0000c8' : '#00e9ff')

const themeBtn = document.getElementById('toggle-theme_btn')

themeBtn.onclick = (e) => {
    if (longClick) {
        longClick = false
        return
    }

    currentTheme = (currentTheme === 'dark') ? 'light' : 'dark'
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(currentTheme)
    localStorage.setItem('theme', currentTheme)

    if (currentTheme === 'light') {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0000c8')
    } else {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#00e9ff')
    }
}