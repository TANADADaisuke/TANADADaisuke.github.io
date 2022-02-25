/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
const navbar = document.querySelector('.navbar__menu');
// store setTimeout ID for scrollNavbarListener
let scrollNavbarTimer = null

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isInView(element) {
    // get element position
    const top = element.getBoundingClientRect().top;
    const height = element.getBoundingClientRect().height;

    // check whether the element is in view window
    if (-height + 50 < top && top < 50) {
        return true;
    } else {
        return false;
    }
}

function activateSection(element) {
    // give active state on the section
    element.classList.add('your-active-class');

    // give active state on navbar
    const navbarLiList = navbarList.querySelectorAll('li');
    for (let i = 0; i < navbarLiList.length; i++) {
        if (element.dataset['nav'] === navbarLiList[i].dataset['nav']) {
            navbarLiList[i].classList.add('your-active-class');
        }
    }
}

function deactivateSection(element) {
    // remove active status from the section
    element.classList.remove('your-active-class');

    // remove active status from navbar
    const navbarLiList = navbarList.querySelectorAll('li');
    for (let i = 0; i < navbarLiList.length; i++) {
        if (element.dataset['nav'] === navbarLiList[i].dataset['nav']) {
            navbarLiList[i].classList.remove('your-active-class');
        }
    }
}

function activeViewChecker() {
    // loop over each sections and check if the section is in view
    for (let i = 0; i < sections.length; i++) {
        if (isInView(sections[i])) {
            // activate section
            activateSection(sections[i]);
        } else {
            // deactivate section
            deactivateSection(sections[i]);
        }
    }
}

function scrollStatusCheckListener() {
    // remove scroll listener
    document.removeEventListener('scroll', scrollStatusCheckListener);
    // invode activeViewChecker after 100ms
    setTimeout(activeViewChecker(), 100);
    // reassign scroll listener after 100ms
    setTimeout(function () {
        document.addEventListener('scroll', scrollStatusCheckListener)
    }, 100);
}

function scrollNavbarListener () {
    if (scrollNavbarTimer !== null) {
        // clear timeout of hideNavber
        clearTimeout(scrollNavbarTimer);
    }
    // show navbar
    showNavbar();
    // hide navbar after 1000ms
    scrollNavbarTimer = setTimeout(hideNavbar, 2000);
}

function showNavbar () {
    navbar.classList.remove('hidden');
}

function hideNavbar () {
    navbar.classList.add('hidden');
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
for (let i = 0; i < sections.length; i++) {
    // create new li element
    const newList = document.createElement('li');
    newList.setAttribute('data-nav', sections[i].dataset['nav']);
    // create new anchor element
    const newLink = document.createElement('a');
    newLink.classList.add('menu__link');
    newLink.setAttribute('href', '#' + sections[i].id);
    newLink.textContent = sections[i].dataset['nav'];
    newList.appendChild(newLink);
    navbarList.appendChild(newList);
}

// Add class 'active' to section when near top of viewport
// To avoid many scroll listener call, set time out for 100ms
document.addEventListener('scroll', scrollStatusCheckListener);

// navbar is in view only when users are scrolling (present on page load)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function () {
        navbar.classList.add('hidden');
    }, 2000);
});
document.addEventListener('scroll', scrollNavbarListener);

// Scroll to anchor ID using scrollTO event
// Add evnet listner on navbar list
navbarList.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A') {
        // prevent default
        event.preventDefault();
        // remove scroll listenr
        document.removeEventListener('scroll', scrollStatusCheckListener);
        // se assign scroll lister after 1000ms
        setTimeout(function () {
            document.addEventListener('scroll', scrollStatusCheckListener);
        }, 1000);
        // scroll to linked view
        document.querySelector(event.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        // update active status
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].dataset['nav'] === event.target.parentNode.dataset['nav']) {
                activateSection(sections[i]);
            } else {
                deactivateSection(sections[i]);
            }
        }
    }
})

// scroll to top button
document.querySelector('.scroll__top').addEventListener('click', function () {
    document.body.scrollIntoView({ behavior: 'smooth' });
})
/**
 * End Main Functions
 * 
*/

