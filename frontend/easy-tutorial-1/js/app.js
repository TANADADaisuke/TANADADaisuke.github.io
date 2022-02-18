// set menu button click action
const menuBtn = document.getElementById('menu-btn');
const sideNav = document.getElementById('sidenav');

// add click event listener
menuBtn.addEventListener('click', function () {
    sideNav.classList.toggle('hide-right');
})