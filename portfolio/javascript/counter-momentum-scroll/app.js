// scroll right scroll area to the bottom on page load
const headerContainer = document.querySelector('.header-container');
const scrollArealeft = document.querySelector('.scroll-area-left');
const scrollAreaRight = document.querySelector('.scroll-area-right');
const scrollAreaRightContent = scrollAreaRight.firstElementChild;

// set container element scrollTop property
scrollAreaRight.scrollTop = scrollAreaRightContent.getBoundingClientRect().height;


// prevent touch swipe action on header container
// global variable
let accumulateDeltaY = [];
let ongoingTouches = [];

// functions
function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
        const id = ongoingTouches[i].identifier;
        if (id === idToFind) {
            return i;
        }
    }
    // not found
    return -1;
}

function handleTouchStart(event) {
    // prevent default
    event.preventDefault();
    // add touchmove and touchend event listener
    headerContainer.addEventListener('touchmove', handleTouchMove, {passive: false});
    headerContainer.addEventListener('touchend', handleTouchEnd, {passive: false});

    console.log("touch start...");
    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        accumulateDeltaY.push([0]);


        // invoke scroll animation
        window.requestAnimationFrame(function renderScrollAction(timestamp) {
            // get index in ongoingTouches Array
            const idx = ongoingTouchIndexById(touches[i].identifier)
            
            if (idx >= 0) {
                const currentDeltaY = accumulateDeltaY[idx][accumulateDeltaY[idx].length - 1];
                // if (!start) start = timestamp;
                // const progress = timestamp - start;
                // alert(progress);
                // // scrollTop overwrite
                // scrollArealeft.firstElementChild.style.transform = 'translateY(-' + Math.min(progress, 2000) + 'px)';
                // scrollAreaRight.firstElementChild.style.transform = 'translateY(' + Math.min(progress, 2000) + 'px)';
                scrollArealeft.scrollTop = scrollArealeft.scrollTop + currentDeltaY;
                scrollAreaRight.scrollTop = scrollAreaRight.scrollTop - currentDeltaY;
    
                // re-invoke momentum scroll
                window.requestAnimationFrame(renderScrollAction);
            } else {
                console.log('scroll animation vanished');
            }
        });
    }
}

function handleTouchMove(event) {
    // prevent default
    event.preventDefault();

    console.log("touch move...");
    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            console.log('continuing touch ' + idx);
            const previousY = ongoingTouches[idx].pageY;
            const newY = touches[i].pageY;
            const deltaY = previousY - newY;
            accumulateDeltaY[idx].push(deltaY);

            // // // scrollTop overwrite
            // scrollArealeft.scrollTop = scrollArealeft.scrollTop + currentDeltaY;
            // scrollAreaRight.scrollTop = scrollAreaRight.scrollTop - currentDeltaY;

            // swap in a new touch record
            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
        } else {
            console.log('cannot figure out what touch to continue');
            alert('cannot figure out what touch to continue');
        }
    }
}

function handleTouchEnd(event) {
    // prevent default
    event.preventDefault();
    // remove touchmove and touchend listener
    headerContainer.removeEventListener('touchmove', handleTouchMove, {passive: false});
    headerContainer.removeEventListener('touchend', handleTouchEnd, {passive: false});

    console.log('touch end...');
    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {    
            // remove that touch from ongoing touch list
            ongoingTouches.splice(idx, 1);
            accumulateDeltaY.splice(idx, 1);
            // // reset currentDeltaY
            // currentDeltaY = 0;
        } else {
            console.log('cannot figure out what touch to continue');
            alert('cannot figure out what touch to continue');
        }
    }
}

let start = null;
let scrollDistance = 2;
// let currentDeltaY = 0;



headerContainer.addEventListener('touchstart', handleTouchStart, {passive: false});