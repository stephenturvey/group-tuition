$('document').ready(function () {

    // Get query string values of page location
    var pi = getParameterByName('pi', location.search);

    // Iterate through anchor elements
    $('ul.ou-subnav > li > a').each(function () {

        // Extract query string values from anchor
        var link = $(this).attr('href');
        var lpi = getParameterByName('pi', link);

        // If matches with pages query string values select element
        if (pi == lpi) {

            var selected = $(this).text();

            $(this).replaceWith('<strong>' + selected + '</strong>');
            return false;
        }

    });
});