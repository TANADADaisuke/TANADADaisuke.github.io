// scroll right scroll area to the bottom on page load
const headerContainer = document.querySelector('.header-container');
const scrollAreaRight = document.querySelector('.scroll-area-right');
const scrollAreaRightContent = scrollAreaRight.firstElementChild;

// set container element scrollTop property
scrollAreaRight.scrollTop = scrollAreaRightContent.getBoundingClientRect().height;


// prevent touch swipe action on header container
// global variable
let ongoingTouches = [];

// functions
function handleTouchStart(event) {
    // prevent default
    event.preventDefault();
    console.log("touch start");
    const touches = event.changedTouches;

    alert(touches);
    // add touchmove and touchend event listener
    headerContainer.addEventListener('touchmove', handleTouchMove, {passive: false});
    headerContainer.addEventListener('touchend', handleTouchEnd, {passive: false});
}

function handleTouchMove(event) {
    console.log('touch move');
}

function handleTouchEnd(event) {
    // remove touchmove and touchend listener
    headerContainer.removeEventListener('touchmove', handleTouchMove, {passive: false});
    headerContainer.removeEventListener('touchend', handleTouchEnd, {passive: false});
}

headerContainer.addEventListener('touchstart', handleTouchStart, {passive: false});