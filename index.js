window.onload = function() {
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollEvent, false);
        document.addEventListener('mousewheel', scrollEvent, false);
    } else if (document.attachEvent) {
        document.attachEvent('mousewheel', scrollEvent);
    } else {
        document.onmousewheel = scrollEvent;
    }

    var startTime = 0;
    var curPage = 1;
    function scrollEvent(event) {
        event.preventDefault();

        if (Date.now() - startTime <= 1000) {
            return;
        }
        event = event || window.event;
        var delta = event.wheelDelta || -event.detial;
        if (delta > 0) {
            if (curPage > 1) {
                startTime = new Date();
                scrollToPage(curPage - 1);
                curPage -= 1;
            }
        } else {
            if (curPage < 4) {
                startTime = new Date();
                scrollToPage(curPage + 1);
                curPage += 1;
            }
        }
    }

    var speed = 10;
    var timer = null;
    function scrollToPage(page) {
        var pageElem = document.getElementById('page' + page);
        if (!pageElem) {
            return;
        }
        var helper = document.body || document.documentElement;
        var startY = helper.scrollTop;
        var diff = (pageElem.offsetTop - startY) / speed;

        if (Math.abs(diff) >= 1) {
            helper.scrollTop = startY + diff;
            timer = setTimeout(function() {
                scrollToPage(page)
            }, 10);
        } else {
            helper.scrollTop = pageElem.offsetTop;
            clearTimeout(timer);
            timer = null;
        }

    }
};
