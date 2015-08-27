$('document').ready(function () {

    $('#select').click(function () { checkall(true); return false; });

    $('#deselect').click(function () { checkall(false); return false; });

    $('#upload').click(function () { uploadnewdocument(); });

    $('#about').click(function () { aboutthis(); });

});

function aboutthis() {
    window.open("http://www.open.ac.uk/tutorpages/group_email.htm", "aboutthis", "scrollbars=yes,resizable=yes,width=600,height=400,menubar=no,toolbar=no");
}

function checkall(x) {
    $('ul.recipients li input[type="checkbox"]').each(function () {
        $(this).prop("checked", x);
    });
}