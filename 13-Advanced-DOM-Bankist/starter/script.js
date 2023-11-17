'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// cookie popup
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'This website uses cookies to ensure you get the best experience on our website. <button class="btn btn--close-cookie">Got it!</button>';
message.style.backgroundColor = '#37383d';
message.style.width = '100vw';
document.querySelector(".header").append(message)
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.remove();
});


// smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
    // const s1coords = section1.getBoundingClientRect();
    //
    // window.scrollTo({
    //     left: 0,
    //     top: s1coords.top + window.scrollY,
    //     behavior: 'smooth'
    // })

    section1.scrollIntoView({behavior: 'smooth'})
})

// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault()
//         const id = this.getAttribute('href')
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//     })
// })

// event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    tabsContent.forEach(content => content.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

// menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelectorAll('img')

        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = this
            }
        })
        logo.forEach(el => {
            el.style.opacity = this
        })
    }
}
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect().top
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCoords) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky')
//     }
// })

const stickyNav = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        nav.classList.remove('sticky')
    } else {
        nav.classList.add('sticky')
    }
}

const header = document.querySelector('.header');
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`
})
headerObserver.observe(header)

// reveal section
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})
allSections.forEach(function (section) {
    section.classList.add('section--hidden')
    sectionObserver.observe(section)
})

// image lazy loading
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImage = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})

imgTargets.forEach(img => imageObserver.observe(img))

// slider
let currentSlide = 0
const slides = document.querySelectorAll('.slide');
const lastSlide = slides.length - 1;
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);

}
const nextSlide = function () {
    if (currentSlide === lastSlide) {
        currentSlide = 0
    } else {
        currentSlide++;
    }
    goToSlide(currentSlide)
}

const previousSlide = function () {
    if (currentSlide === 0) {
        currentSlide = lastSlide
    } else {
        currentSlide--;
    }
    goToSlide(currentSlide)
}

goToSlide(0)
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', previousSlide)

