// scroll right scroll area to the bottom on page load
const scrollAreaRight = document.querySelector('.scroll-area-right');
const scrollAreaRightContent = scrollAreaRight.firstElementChild;

// set container element scrollTop property
scrollAreaRight.scrollTop = scrollAreaRightContent.getBoundingClientRect().height;


// prevent touch swipe action
// functions
function handleTouchStart(event) {
    // prevent default
    event.preventDefault();
    // add touchmove and touchend event listener
    window.addEventListener('touchmove', handleTouchMove, {passive: false});
    window.addEventListener('touchend', handleTouchEnd, {passive: false});
}

function handleTouchMove(event) {
    console.log(event.target)
}

function handleTouchEnd(event) {
    // remove touchmove and touchend listener
    window.removeEventListener('touchmove', handleTouchMove, {passive: false});
    window.removeEventListener('touchend', handleTouchEnd, {passive: false});
}

window.addEventListener('touchstart', handleTouchStart, {passive: false});