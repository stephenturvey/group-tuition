// SCRIPT DISABLED (LINE 11) FOR MOCKUP WORK

$('document').ready(function () {

    // Get query string values of page location
    var code = getParameterByName('code', location.search);
    var pres = getParameterByName('pres', location.search);
    var alloc = getParameterByName('alloc', location.search);

    // Iterate through anchor elements
    $('XXXul.codes li a').each(function () {

        // Extract query string values from anchor
        var link = $(this).attr('href');
        var lcode = getParameterByName('code', link);
        var lpres = getParameterByName('pres', link);
        var lalloc = getParameterByName('alloc', link);

        // If matches with pages query string values select element
        if (lcode == code && lpres == pres && lalloc == alloc) {

            var selected = $(this).text();
            var href;

            $('#ou-site-header ul.ou-sections > li:nth-child(2) ul li a').each(function () {
                var mlink = $(this).attr('href');
                var mcode = getParameterByName('code', mlink);
                var mpres = getParameterByName('pres', mlink);
                var malloc = getParameterByName('alloc', mlink);

                if (mcode == code && mpres == pres && malloc == alloc) {

                    href = $(this).attr('href');
                    return false;
                }
            });

            $(this).replaceWith('<strong>' + selected + '</strong>');

            $('ul.codes strong').click(function () {
                window.location = href;
            });

            return false;
        }
    });

});

