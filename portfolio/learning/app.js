// vocabulary.close action
$('.fa-times').on('click', function() {
    $(this).parent().removeClass('open');
});

// vocabulary.open action
$('.content').on('click', 'span', function(event) {
    // targetText is a word or words in a paragraph
    // which meaning you want to know
    var targetText;
    targetText = $(event.target).text();
    console.log(targetText);
    // find vocabulary card from hidden list and display it
    $('.vocabulary').each(function() {
        // text is a title of each vocabulary card
        var text;
        text = $(this).children().first().text();
        // if text is the one you want, display the card
        if (targetText === text) {
            $(this).addClass('open');
        }
    });
})
