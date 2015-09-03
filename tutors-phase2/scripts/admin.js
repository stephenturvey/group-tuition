/* File Created: February 27, 2014 */
var returned = "";
$('document').ready(function () {
    document.getElementById('tbCommand').focus()
    $('#btExecute').click(main.Execute);

    // Execute when pressing enter after typing a command
    $("#tbCommand").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btExecute").click();
        }
    });

    $('#btLoad').click(function () {
        var fileName = $('input[name=file]:checked').parent().text();
        var path = $('#directories > p:first').text().substring(6) + fileName;

        $.ajax({
            url: "adminHandler.ashx?open=" + path,
            success: function (result) {

                $('#taView').val('');

                returned = result;
                $('#taView').text(result);

                // To handle IE11 viewing only one character
                if ($('#taView').val().length <= 1) {
                    $('#taView').val('');
                    for (var i in returned) {
                        var taVal = $('#taView').text();
                        $('#taView').val(taVal + returned[i]);
                    }
                }
            }
        });
    });
});

var name = "#ControlBox";
var menuYloc = null;

$(document).ready(function () {
    menuYloc = parseInt($(name).css("top").substring(0, $(name).css("top").indexOf("px")))
    $(window).scroll(function () {
        var offset = menuYloc + $(document).scrollTop() + "px";
        $(name).animate({ top: offset }, { duration: 500, queue: false });
    });
});

var main = ({
    Execute: function () {
        var answer = confirm("Are you sure?");

        if (answer) {
            var feed = {};

            feed["command"] = $('#tbCommand').val();
            feed["encoded"] = window.location.href.split("?")[1];
            feed["url"] = document.URL;
            feed["text"] = $('textarea').val();
            post_to_url("adminHandler.ashx", feed, "post");
        }
    }
});


function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}