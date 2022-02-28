// show navigation menu with click on humberger menu
const menu = document.getElementById('menu-button');
const navigation = document.querySelector('.nav-list');

menu.addEventListener('click', function () {
    navigation.classList.toggle('sr-only');
})
// remove sr-only class with wide screen
if (window.innerWidth > 900) {
    navigation.classList.remove('sr-only');
}
window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
        navigation.classList.remove('sr-only');
    } else {
        navigation.classList.add('sr-only');
    }
})
