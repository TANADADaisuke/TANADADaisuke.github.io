var menu = $('#menu');
var navItems = $('.nav-item');

menu.on('click', function() {
    navItems.toggleClass('open');
});
