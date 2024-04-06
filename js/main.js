window.onload = () => {
    document.body.classList.remove('loading');
    setTimeout(() => {
        document.body.classList.remove('no-scroll');
    }, 1000)
    setTimeout(() => {
        logoWave.style.display = 'none';
        sections.forEach(el => sectionsObserver.observe(el));
        content.forEach(el => contentObserver.observe(el));
        setTimeout(() => {
            logoContainer.appendChild(logoWrapper);
            loader.style.display = 'none';
        }, 500)
    }, 1500);
}

const logoContainer = document.getElementById('logo');
const logoWrapper = document.querySelector('.loader .logo-wrapper');
const logoWave = document.querySelector('.wave');
const loader = document.querySelector('.loader');

// SECTIONS OBSERVER
const sections = [...document.getElementsByClassName('ob-section')];
const menuAsideTabs = [...document.querySelectorAll('aside li')];
const menuNavTabs = [...document.querySelectorAll('nav li')];

let currentTab = 0;

const sectionsCallback = (entries, observer) => {
    entries.forEach(entry => {
        const { target } = entry;
        if (entry.intersectionRatio > sectionOptions.threshold) {
            let tab = target.getAttribute('data-number');

            if (entry.intersectionRatio > 0.5) {
                menuAsideTabs[currentTab].classList.remove('current');
                menuNavTabs[currentTab].classList.remove('current');

                menuAsideTabs[tab].classList.add('current');
                menuNavTabs[tab].classList.add('current');

                currentTab = tab;

            }
        }
    });
}

const sectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
}

const sectionsObserver = new IntersectionObserver(sectionsCallback, sectionOptions);


// OBSERVER
const content = [...document.getElementsByClassName('content')]

const contentOptions = {
    root: null,
    rootMargin: '56px 0px 0px 0px',
    threshold: [0.01, 0.25],
}
const contentCallback = (entries, observer) => {
    entries.forEach((entry) => {
        const { target } = entry;


        observer.thresholds.forEach(point => {
            if (point === 0.25) {
                if (entry.intersectionRatio >= point)
                    target.classList.add('visible');
            } else {
                target.classList.remove('visible');
            }
        });

    });
}

const contentObserver = new IntersectionObserver(contentCallback, contentOptions);

// contact card - bg
const card = document.getElementById('card-3d');

card.addEventListener('mousemove', (e) => {
    const { top, left } = card.getBoundingClientRect();

    let x = e.clientX - left;
    let y = e.clientY - top;


    card.style.cssText = `--x: ${x}px; --y: ${y}px`;
});


// menu
const menuSwitcher = document.getElementById('menu__switcher');
const nav = document.getElementById('menu');
const backdrop = document.getElementById('backdrop');
const menuTabs = [...document.querySelectorAll('#menu li a')];

menuSwitcher.addEventListener('click', () => {
    nav.classList.toggle('menu--active');
});

backdrop.addEventListener('click', () => {
    nav.classList.remove('menu--active');
});

menuTabs.forEach(el => {
    el.addEventListener('click', () => {
        nav.classList.remove('menu--active');
    });
});