// DOM Ready
$(function () {

    var $el, $ps, $up, totalHeight, initialHeight;

    $(".sidebar-box .button").click(function () {

        totalHeight = 0

        $el = $(this);
        $p = $el.parent();
        $up = $p.parent();
        $ps = $up.find("p:not('.read-more')");

        // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
        $ps.each(function () {
            totalHeight += $(this).outerHeight();
        });

        console.warn('totalHeight:', totalHeight);

        initialHeight = $up[0]['initialHeight'];

        if(!initialHeight) {
            initialHeight = $up.height();
            $up[0]['initialHeight'] = initialHeight;
        }

        console.warn('initialHeight:', initialHeight);

        $up
            .css({
                // Set height to prevent instant jumpdown when max height is removed
                "height": initialHeight,
                "max-height": 9999
            })
            .animate({
                "height": totalHeight
            });

        // fade out read-more
        $p.fadeOut();

        $el.toggleClass('open');

        // prevent jump-down
        return false;

    });

});