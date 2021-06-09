// remove whitespaces around in pre code elements
// remove former and following whitespaces around code element
const preList = document.querySelectorAll('pre');
for (i = 0; i < preList.length; i++) {
    let preCodeChecker = false;
    for (j = 0; j < preList[i].childNodes.length; j++) {
        if (preList[i].childNodes[j].tagName === 'CODE') {
            preCodeChecker = true
        }
    }
    if (preCodeChecker) {
        for (j = 0; j < preList[i].childNodes.length; j++) {
            if (preList[i].childNodes[j].tagName !== 'CODE') {
                preList[i].childNodes[j].remove();
            }
        }            
    }
}

// three steps for remove all whitespaces in code element
// pattern 1 (-4 spaces) to remove the last spaces
const preCode = document.querySelectorAll('pre code');
preCode.forEach( (element) =>
    {
        let outerHtml = element.outerHTML;
        let pattern = outerHtml.match(/\s*\n[\t\s]*/);
        element.outerHTML = outerHtml.replace(new RegExp(pattern[0].slice(0, -4), 'g'), '\n');
})
// pattern 2 to remove forwarding spaces
const preCodeTwo = document.querySelectorAll('pre code');
preCodeTwo.forEach( (element) =>
    {
        let outerHtml = element.outerHTML;
        let pattern = outerHtml.match(/\s*\n[\t\s]*/);
        element.outerHTML = outerHtml.replace(new RegExp(pattern[0], 'g'), '\n');
})
// pattern 3 to remove the first \n
const preCodeThree = document.querySelectorAll('pre code');
preCodeThree.forEach( (element) =>
    {
        let outerHtml = element.outerHTML;
        let pattern = outerHtml.match(/\n/);

        element.outerHTML = outerHtml.replace(/\n/, '');
})
