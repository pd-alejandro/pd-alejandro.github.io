// THEME
let currentTheme = (localStorage?.getItem('theme')) ? localStorage.getItem('theme') : (window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
document.body.classList.add(currentTheme)

const themeBtn = document.getElementById('toggle-theme_btn')

themeBtn.onclick = () => {
    currentTheme = (currentTheme === 'dark') ? 'light' : 'dark'
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(currentTheme)
    localStorage.setItem('theme', currentTheme)
}